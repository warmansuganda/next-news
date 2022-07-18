import { useMemo, MouseEvent, useCallback } from 'react';
import numeral from 'numeral';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';

import Image from '@components/Image';
import { User } from '@services/users/types';
import { useAppSelector, useAppDispatch } from '@hooks/index';

import { likeUser, unLikeUser } from '@stores/user';
import { Wrapper, Avatar, Content, CounterWrapper } from './styles';

interface UserCardProps {
  data: User;
}

function UserCard({ data }: UserCardProps) {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const like: boolean = useMemo(() => {
    const index = user.liked.findIndex((item) => item.id === data?.id);
    return index !== -1;
  }, [user.liked]);

  const handleLike = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const liked = !like;
      if (liked) dispatch(likeUser(data));
      else dispatch(unLikeUser(data));
    },
    [like]
  );

  return (
    <Wrapper>
      <Avatar>
        <Image
          src={data?.avatar_url || '/static/default-image.png'}
          alt={data?.login}
        />
      </Avatar>
      <Content>
        <Typography noWrap>{data?.login}</Typography>
        <CounterWrapper>
          <div>{`${numeral(data.following).format('0,0a')} followings`}</div>
          <div>{`${numeral(data.followers).format('0,0a')} followers`}</div>
        </CounterWrapper>
      </Content>
      <div>
        <IconButton size="small" color="inherit" onClick={handleLike}>
          {like ? (
            <FavoriteIcon sx={{ color: pink[500], fontSize: 16 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: pink[500], fontSize: 16 }} />
          )}
        </IconButton>
      </div>
    </Wrapper>
  );
}

export default UserCard;
