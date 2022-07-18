import { ChangeEvent, useState, useMemo, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import numeral from 'numeral';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import DefaultLayout from '@layouts/DefaultLayout';
import Input from '@components/Input';
import UserCard from '@components/UserCard';
import Empty from '@components/Empty';
import Pagination from '@components/Pagination';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { searchUser, resetUserData } from '@stores/user';

import HomeWelcome from './HomeWelcome';
import { SearchBox } from './styles';

interface HomePorps {
  defaultQuery: string;
  defaultPage: number;
}

function Home({ defaultQuery, defaultPage }: HomePorps) {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const data = useMemo(() => user.data, [user.data]);

  const [page, setPage] = useState(defaultPage);
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    if (defaultQuery)
      dispatch(searchUser({ query: defaultQuery, page: defaultPage }));
  }, []);

  const handleChange = useCallback((keyword: string) => {
    setPage(1);
    setQuery(keyword);
    if (keyword) dispatch(searchUser({ query: keyword, page: 1 }));
    else dispatch(resetUserData());

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
      dispatch(searchUser({ query, page: newPage }));
      router.push({
        query: {
          query,
          page: newPage,
        },
      });
    },
    [query]
  );

  const renderList = () => {
    if (data.total) {
      return (
        <>
          {data.items.length ? (
            <Box sx={{ marginTop: '32px' }}>
              <Grid container spacing={2} columns={16}>
                {data.items.map((item) => (
                  <Grid key={item.id} item xs={8}>
                    <Link
                      href={{
                        pathname: '/users/[username]',
                        query: { username: item.login },
                      }}
                    >
                      <a style={{ textDecoration: 'none' }}>
                        <UserCard data={item} />
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Alert severity="error" sx={{ marginTop: '32px' }}>
              <AlertTitle>Warning</AlertTitle>
              Data not found on Page {page}
            </Alert>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '60px 0',
            }}
          >
            <Pagination
              total={data.total}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </>
      );
    }
    return (
      <Empty
        icon={<SearchIcon color="action" sx={{ fontSize: 36 }} />}
        message="No search result found for"
      >
        <Typography variant="subtitle2">{user.search}</Typography>
      </Empty>
    );
  };

  return (
    <DefaultLayout title="Search">
      <SearchBox>
        <Input
          placeholder="Enter GitHub username, i.e. gaearon"
          defaultValue={query}
          onChange={(e) => debounced(e.target.value)}
        />
        {!!data.total && (
          <Box sx={{ marginTop: '16px' }}>
            {`${numeral(data.total).format('0,0')} GitHub users found`}
          </Box>
        )}
      </SearchBox>
      {user?.search ? renderList() : <HomeWelcome />}
    </DefaultLayout>
  );
}

Home.getInitialProps = ({ query }: NextPageContext) => ({
  defaultQuery: query.query,
  defaultPage: query.page ? Number(query.page) : 1,
});

export default Home;
