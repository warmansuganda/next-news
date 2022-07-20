import { ChangeEvent, useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import numeral from 'numeral';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import NewsCard from 'src/features/NewsCard';
import Empty from '@components/Empty';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { fetchNews } from '@stores/news';

import { SearchBox, ListWrapper } from './styles';

interface HomePorps {
  defaultQuery: string;
  defaultPage: number;
}

function Home({ defaultQuery, defaultPage }: HomePorps) {
  const { news } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const data = useMemo(() => news.data, [news.data]);

  const [page, setPage] = useState(defaultPage);
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    dispatch(fetchNews({ query: defaultQuery, page: defaultPage }));
  }, []);

  const handleChange = useCallback((keyword: string) => {
    setPage(1);
    setQuery(keyword);
    if (keyword) dispatch(fetchNews({ query: keyword, page: 1 }));
    // else dispatch(resetUserData());

    router.push({
      query: {
        query: keyword,
        page: 1,
      },
    });
  }, []);

  const debounced = useDebouncedCallback(handleChange, 500);

  const handleChangePage = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
      dispatch(fetchNews({ query, page: newPage }));
      router.push({
        query: {
          query,
          page: newPage,
        },
      });
    },
    [query]
  );

  return (
    <DefaultLayout title={t('News')}>
      <SearchBox>
        <Input
          placeholder={t('Search news, i.e. election')}
          defaultValue={query}
          onChange={(e) => debounced(e.target.value)}
        />
      </SearchBox>
      {data.items.length ? (
        <ListWrapper spacing={2}>
          {data.items.map((item) => (
            <Link
              key={item.uri}
              href={{
                pathname: '/users/[username]',
                query: { username: item.uri },
              }}
            >
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <NewsCard data={item} />
              </a>
            </Link>
          ))}
        </ListWrapper>
      ) : (
        <Empty
          message={
            news.search ? t('No search result found for') : t('No result found')
          }
        >
          <Typography variant="subtitle2">{news.search}</Typography>
        </Empty>
      )}
    </DefaultLayout>
  );
}

Home.getInitialProps = ({ query }: NextPageContext) => ({
  defaultQuery: query.query,
  defaultPage: query.page ? Number(query.page) : 1,
});

export default Home;
