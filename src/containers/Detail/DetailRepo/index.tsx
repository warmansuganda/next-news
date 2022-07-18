import { useEffect, useMemo } from 'react';

import Grid from '@mui/material/Grid';
import RepoCard from '@components/RepoCard';
import { User } from '@services/users/types';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { fetchRepo } from '@stores/user';

interface DetailRepoProps {
  data: User;
}

function DetailRepo({ data }: DetailRepoProps) {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const repo = useMemo(() => user.repo, [user.repo]);

  useEffect(() => {
    dispatch(fetchRepo(data.login));
  }, []);

  return (
    <Grid container spacing={2} columns={16}>
      {repo.items.map((item) => (
        <Grid key={item.id} item xs={8}>
          <a
            href={item.svn_url}
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
          >
            <RepoCard data={item} />
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

export default DetailRepo;
