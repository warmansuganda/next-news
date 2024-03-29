import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { red, green } from '@mui/material/colors';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import NewsCard from 'src/features/NewsCard';
import Empty from '@components/Empty';

import { useAppSelector } from '@hooks/index';
import { WalletLog } from '@stores/user';
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
  const [wallet, setWallet] = useState<WalletLog[]>([]);

  const data = useMemo(() => {
    const result = [...wallet];
    return result
      .filter((item) => {
        let queryStatus = true;
        let filterStatus = true;

        if (query) {
          queryStatus = item.note.toLowerCase().includes(query.toLowerCase());
        }

        if (filter && filter !== 'all') {
          filterStatus = filter === item.type;
        }

        return queryStatus && filterStatus;
      })
      .slice(0, page * PAGE_SIZE);
  }, [wallet, query, page, filter]);

  useEffect(() => {
    setWallet(user.wallet.logs);
    setLoading(false);
  }, [user.wallet]);

  const handleLoadMore = useDebouncedCallback(
    useCallback(() => {
      const maxPage = Math.ceil(wallet.length / PAGE_SIZE);
      const newPage = page + 1;
      if (newPage <= maxPage) {
        setPage(newPage);
      }
    }, [page, wallet]),
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
            <Avatar
              sx={
                item.type === 'income'
                  ? { background: green[500] }
                  : { background: red[500] }
              }
            >
              {item.type === 'income' ? (
                <CloudDownloadIcon />
              ) : (
                <CloudUploadIcon />
              )}
            </Avatar>
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
            <Typography
              variant="subtitle2"
              color={item.type === 'income' ? green[500] : red[500]}
            >
              {`${item.type === 'income' ? '+' : '-'} ${numeral(
                item.amount
              ).format('0,0')}`}
            </Typography>
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
            placeholder={t('Search wallet transaction logs')}
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
        <Typography variant="h6">{t('Recent Activity')}</Typography>
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
