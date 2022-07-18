import { useEffect, useMemo } from 'react';
import Link from 'next/link';

import Grid from '@mui/material/Grid';
import UserCard from '@components/UserCard';
import { User } from '@services/users/types';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { fetchFollower } from '@stores/user';

interface DetailFollowerProps {
  data: User;
}

function DetailFollower({ data }: DetailFollowerProps) {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const followers = useMemo(() => user.followers, [user.followers]);

  useEffect(() => {
    dispatch(fetchFollower(data.login));
  }, []);

  return (
    <Grid container spacing={2} columns={16}>
      {followers.items.map((item) => (
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

export default DetailFollower;
