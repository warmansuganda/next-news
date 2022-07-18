import { useState, SyntheticEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next';
import numeral from 'numeral';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { DefaultLayout, PageNotFound } from '@layouts/index';
import Image from '@components/Image';
import { TabPanel, TabLabel } from '@components/Tab';

import { User } from '@services/users/types';
import { findUser } from '@services/users';

import DetailFollower from './DetailFollower';
import DetailFollowing from './DetailFollowing';
import DetailRepo from './DetailRepo';
import {
  Avatar,
  ProfileCard,
  TabWrapper,
  TabHeader,
  CompanyWrapper,
} from './styles';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface DetailProps {
  data: User;
  defaultTab: number;
}

function Detail({ data, defaultTab }: DetailProps) {
  if (!data) return <PageNotFound />;

  const { login: username } = data;

  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(Number(router.query.tab || 0));
  }, [router.query]);

  const handleChange = (event: SyntheticEvent, newTab: number) => {
    router.push({
      pathname: '/users/[username]',
      query: {
        username,
        tab: newTab,
      },
    });
    setActiveTab(newTab);
  };

  return (
    <DefaultLayout
      accessoryLeft={
        <Link href="/">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
        </Link>
      }
    >
      <ProfileCard>
        <Avatar>
          <Image
            src={data?.avatar_url || '/static/default-image.png'}
            alt={data?.login}
          />
        </Avatar>
        <Box>
          <Typography variant="h6">{data.name}</Typography>
        </Box>
        <Box>{data.login}</Box>
        <CompanyWrapper>
          <ApartmentIcon color="action" fontSize="small" />{' '}
          {data.company || '-'}
        </CompanyWrapper>
      </ProfileCard>
      <TabWrapper>
        <TabHeader>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label={
                <TabLabel
                  title="Repositories"
                  subtitle={`(${numeral(data.public_repos).format('0,0a')})`}
                />
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <TabLabel
                  title="Followers"
                  subtitle={`(${numeral(data.followers).format('0,0a')})`}
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <TabLabel
                  title="Followings"
                  subtitle={`(${numeral(data.following).format('0,0a')})`}
                />
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </TabHeader>
        <TabPanel value={activeTab} index={0}>
          <DetailRepo data={data} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DetailFollower data={data} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <DetailFollowing data={data} />
        </TabPanel>
      </TabWrapper>
    </DefaultLayout>
  );
}

Detail.getInitialProps = async ({ query }: NextPageContext) => {
  let data = null;

  try {
    const user = await findUser(query.username as string);
    data = user.data;
  } catch (error) {
    data = null;
  }

  return {
    data,
    defaultTab: Number(query.tab || 0),
    hideFooter: true,
  };
};

export default Detail;
