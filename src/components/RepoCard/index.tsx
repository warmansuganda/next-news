import Typography from '@mui/material/Typography';
import { Repo } from '@services/users/types';
import numeral from 'numeral';

import { Wrapper, Content, CounterWrapper } from './styles';

interface RepoCardProps {
  data: Repo;
}

function RepoCard({ data }: RepoCardProps) {
  return (
    <Wrapper>
      <Content>
        <Typography noWrap sx={{ fontWeight: 'medium' }}>
          {data?.name}
        </Typography>
        <CounterWrapper>
          {data?.stargazers_count > 0 && (
            <div>{numeral(data?.stargazers_count).format('0,0a')} stars</div>
          )}
          {data?.forks_count > 0 && (
            <div>{numeral(data?.forks_count).format('0,0a')} forks</div>
          )}
        </CounterWrapper>
      </Content>
    </Wrapper>
  );
}

export default RepoCard;
