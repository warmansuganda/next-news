import { useEffect, useMemo } from 'react';
import Link from 'next/link';

import Grid from '@mui/material/Grid';
import UserCard from '@components/UserCard';
import { User } from '@services/users/types';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { fetchFollowing } from '@stores/user';

interface DetailFollowingProps {
  data: User;
}

function DetailFollowing({ data }: DetailFollowingProps) {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const following = useMemo(() => user.following, [user.following]);

  useEffect(() => {
    dispatch(fetchFollowing(data.login));
  }, []);

  return (
    <Grid container spacing={2} columns={16}>
      {following.items.map((item) => (
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
  );
}

export default DetailFollowing;
