import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import NewsCard from 'src/features/NewsCard';
import Empty from '@components/Empty';

import { useAppSelector } from '@hooks/index';
import { Library as LibaryType } from '@stores/user';

import { ARTICLE_DETAIL } from '@constants/path';
import { base64Ecode } from '@utils/base64';

import { ToolBox, SearchBox, ListWrapper, FilterBox } from './styles';
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
  const [library, setLibrary] = useState<LibaryType[]>([]);

  const data = useMemo(() => {
    const result = [...library];
    return result
      .filter((item) => {
        let queryStatus = true;
        let filterStatus = true;

        if (query) {
          queryStatus =
            item.news.headline.main
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            item.news.abstract.toLowerCase().includes(query.toLowerCase());
        }

        if (filter && filter !== 'all') {
          if (filter === 'premium') {
            filterStatus = item.price > 0;
          } else if (filter === 'free') {
            filterStatus = item.price === 0;
          }
        }

        return queryStatus && filterStatus;
      })
      .slice(0, page * PAGE_SIZE);
  }, [library, query, page, filter]);

  useEffect(() => {
    setLibrary(user.library);
    setLoading(false);
  }, [user.library]);

  const handleLoadMore = useDebouncedCallback(
    useCallback(() => {
      const maxPage = Math.ceil(library.length / PAGE_SIZE);
      const newPage = page + 1;
      if (newPage <= maxPage) {
        setPage(newPage);
      }
    }, [page, library]),
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
        <Link
          key={item.news.uri}
          href={{
            pathname: ARTICLE_DETAIL,
            query: {
              id: base64Ecode(item.news.web_url),
            },
          }}
        >
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <NewsCard data={item.news} />
          </a>
        </Link>
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
            placeholder={t('Search transaction')}
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
      <ListWrapper spacing={2}>
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
