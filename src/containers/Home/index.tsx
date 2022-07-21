import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FilterListIcon from '@mui/icons-material/FilterList';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import NewsCard from 'src/features/NewsCard';
import Empty from '@components/Empty';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { fetchNews, fetchMoreNews } from '@stores/news';
import { ARTICLE_DETAIL } from '@constants/path';

import { ToolBox, SearchBox, ListWrapper, FilterBox } from './styles';
import filters from './filters.json';

interface HomePorps {
  defaultQuery: string;
  defaultFilter: string;
}

function Home({ defaultQuery, defaultFilter }: HomePorps) {
  const { news } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const data = useMemo(() => news.data, [news.data]);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(defaultQuery);
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    dispatch(fetchNews({ query: defaultQuery, page }));
  }, []);

  const handleLoadMore = useDebouncedCallback(
    useCallback(() => {
      if (!data.loading) {
        const newPage = page + 1;
        dispatch(fetchMoreNews({ query: defaultQuery, page: newPage }));
        setPage(newPage);
      }
    }, [page, data.loading]),
    500
  );

  useEffect(() => {
    window.document.body.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
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
    dispatch(fetchNews({ query: keyword, page: 1 }));

    router.push({
      query: {
        ...(keyword ? { query: keyword } : {}),
      },
    });
  }, []);

  const handleFilter = useCallback((keyword: string) => {
    setPage(1);
    setFilter(keyword);
    // if (keyword) dispatch(fetchNews({ query: keyword }));
    // else dispatch(resetUserData());

    // router.push({
    //   query: {
    //     ...(keyword ? { query: keyword } : {}),
    //   },
    // });
  }, []);

  const debounced = useDebouncedCallback(handleChange, 500);

  const renderList = () => {
    if (data.items.length > 0) {
      return data.items.map((item) => (
        <Link
          key={item.uri}
          href={{
            pathname: ARTICLE_DETAIL,
            query: { username: item.uri },
          }}
        >
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <NewsCard data={item} />
          </a>
        </Link>
      ));
    }

    if (!data.loading && !data.items.length) {
      return (
        <Empty
          message={
            news.search ? t('No search result found for') : t('No result found')
          }
        >
          <Typography variant="subtitle2">{news.search}</Typography>
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
            placeholder={t('Search news, i.e. election')}
            defaultValue={query}
            onChange={(e) => debounced(e.target.value)}
          />
          {/* <IconButton onClick={() => setShowDrawer(true)}>
            <FilterListIcon />
          </IconButton> */}
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
      <ListWrapper spacing={2}>
        {renderList()}
        {data.loading &&
          Array(2)
            .fill(null)
            .map((_, index) => <NewsCard.Placeholder key={index} />)}
      </ListWrapper>
    </DefaultLayout>
  );
}

Home.getInitialProps = ({ query }: NextPageContext) => ({
  defaultQuery: query.query,
  defaultFilter: query.filter || 'all',
});

export default Home;
