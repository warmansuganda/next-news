import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import VerifiedIcon from '@mui/icons-material/Verified';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import NewsCard from 'src/features/NewsCard';
import Empty from '@components/Empty';

import { useAppSelector } from '@hooks/index';
import { Coupon } from '@stores/user';
import dateAdapter from '@utils/dateAdapter';

import {
  ToolBox,
  SearchBox,
  ListWrapper,
  FilterBox,
  ListItemText,
} from './styles';
import filters from './filters.json';

interface LibraryPorps {
  defaultQuery: string;
  defaultFilter: string;
}

const PAGE_SIZE = 3;

function Library({ defaultQuery, defaultFilter }: LibraryPorps) {
  const { user } = useAppSelector((state) => state);
  const router = useRouter();
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(defaultQuery);
  const [filter, setFilter] = useState(defaultFilter);
  const [coupon, setCoupon] = useState<Coupon[]>([]);

  const data = useMemo(() => {
    const result = [...coupon];
    return result
      .filter((item) => {
        let queryStatus = true;
        let filterStatus = true;

        if (query) {
          queryStatus = item.note.toLowerCase().includes(query.toLowerCase());
        }

        if (filter && filter !== 'all') {
          if (filter === 'new') {
            filterStatus = item.chance > 0;
          } else if (filter === 'claimed') {
            filterStatus = item.chance === 0;
          }
        }

        return queryStatus && filterStatus;
      })
      .slice(0, page * PAGE_SIZE);
  }, [coupon, query, page, filter]);

  useEffect(() => {
    setCoupon(user.coupon);
    setLoading(false);
  }, [user.coupon]);

  const handleLoadMore = useDebouncedCallback(
    useCallback(() => {
      const maxPage = Math.ceil(coupon.length / PAGE_SIZE);
      const newPage = page + 1;
      if (newPage <= maxPage) {
        setPage(newPage);
      }
    }, [page, coupon]),
    500
  );

  useEffect(() => {
    window.document.body.onscroll = () => {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
        Math.ceil(document.documentElement.offsetHeight)
      ) {
        handleLoadMore();
      }
    };

    return () => {
      window.document.body.onscroll = null;
    };
  }, []);

  const handleChange = useCallback((keyword: string) => {
    setPage(1);
    setQuery(keyword);
    router.push({
      query: {
        ...(keyword ? { query: keyword } : {}),
      },
    });
  }, []);

  const debounced = useDebouncedCallback(handleChange, 500);

  const handleFilter = useCallback(
    (keyword: string) => {
      if (keyword !== filter) {
        setPage(1);
        setFilter(keyword);

        router.push({
          query: {
            ...(query ? { query } : {}),
            ...(keyword && keyword !== 'all' ? { filter: keyword } : {}),
          },
        });
      }
    },
    [query, filter]
  );

  const renderList = () => {
    if (data.length > 0) {
      return data.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <VerifiedIcon
              color={item.chance === 0 ? 'disabled' : 'success'}
              sx={{ fontSize: 35 }}
            />
          </ListItemAvatar>
          <ListItemText>
            <Typography component="div" variant="body2" noWrap>
              {item.note}
            </Typography>
            <Typography component="div" variant="caption" color="GrayText">
              {dateAdapter.format(
                typeof item.date === 'string' ? new Date(item.date) : item.date,
                'fullDateTime'
              )}
            </Typography>
            <Chip
              avatar={<Avatar>{item.chance}</Avatar>}
              label={t('Redeem')}
              size="small"
              color="success"
              variant="outlined"
              clickable
              disabled={item.chance === 0}
            />
          </ListItemText>
        </ListItem>
      ));
    }

    if (!loading && !data.length) {
      return (
        <Empty
          message={
            query ? t('No search result found for') : t('No result found')
          }
        >
          {query && <Typography variant="subtitle2">{`"${query}"`}</Typography>}
        </Empty>
      );
    }

    return null;
  };

  return (
    <DefaultLayout>
      <ToolBox>
        <SearchBox>
          <Input
            placeholder={t('Search coupon')}
            defaultValue={query}
            onChange={(e) => debounced(e.target.value)}
          />
        </SearchBox>
        <FilterBox direction="row" spacing={1}>
          {filters.map((item) => (
            <Chip
              component="a"
              key={item.key}
              label={t(item.label)}
              color="primary"
              variant={filter === item.key ? 'filled' : 'outlined'}
              onClick={() => handleFilter(item.key)}
              clickable
            />
          ))}
        </FilterBox>
      </ToolBox>
      <ListWrapper>
        {renderList()}
        {loading &&
          Array(2)
            .fill(null)
            .map((_, index) => <NewsCard.Placeholder key={index} />)}
      </ListWrapper>
    </DefaultLayout>
  );
}

Library.getInitialProps = ({ query }: NextPageContext) => ({
  defaultQuery: query.query,
  defaultFilter: query.filter || 'all',
});

export default Library;
