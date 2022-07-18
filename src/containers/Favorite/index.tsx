import { useMemo, useState, useCallback, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GroupIcon from '@mui/icons-material/Group';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import DefaultLayout from '@layouts/DefaultLayout';
import UserCard from '@components/UserCard';
import Empty from '@components/Empty';
import Pagination from '@components/Pagination';

import { useAppSelector } from '@hooks/index';

const PAGE_SIZE = 30;

interface FavoritePorps {
  defaultPage: number;
}

function Favorite({ defaultPage }: FavoritePorps) {
  const { user } = useAppSelector((state) => state);
  const [page, setPage] = useState(defaultPage);
  const router = useRouter();

  const liked = useMemo(() => {
    const data = [...user.liked];
    return data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [user.liked, page]);

  const handleChangePage = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
      router.push({
        query: {
          page: newPage,
        },
      });
    },
    []
  );

  return (
    <DefaultLayout title="Favorites">
      {user.liked.length ? (
        <>
          {liked.length ? (
            <Box sx={{ marginTop: '32px' }}>
              <Grid container spacing={2} columns={16}>
                {liked.map((item) => (
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
              page={page}
              total={user.liked.length}
              onChange={handleChangePage}
            />
          </Box>
        </>
      ) : (
        <Empty
          icon={<GroupIcon color="action" sx={{ fontSize: 36 }} />}
          message="Once you like people, you'll see them here."
        />
      )}
    </DefaultLayout>
  );
}

Favorite.getInitialProps = ({ query }: NextPageContext) => ({
  defaultPage: query.page ? Number(query.page) : 1,
});

export default Favorite;
