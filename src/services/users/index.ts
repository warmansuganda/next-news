import client from '@services/client';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from './types';

// https://docs.github.com/en/rest/search#constructing-a-search-query
// const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');

// https://api.github.com/search/users?q=warman&per_page=2&page=2
export const fetchUsers = (query?: string, page?: number) =>
  client.get('/search/users', { params: { q: query, page } });

export const findUser = (username: string, config?: AxiosRequestConfig) =>
  client.get(`/users/${username}`, config);

export const findConcurrentUser = (users: User[]) =>
  axios.all(users.map((item) => findUser(item.login)));

// https://api.github.com/users/warmansuganda/repos?per_page=2&page=2
export const fetchUserRepositories = (username: string) =>
  client.get(`/users/${username}/repos`);

// https://api.github.com/users/warmansuganda/followers?per_page=2&page=2
export const fetchUserFollowers = (username: string) =>
  client.get(`/users/${username}/followers`);

// https://api.github.com/users/warmansuganda/following?per_page=2&page=1
export const fetchUserFollowings = (username: string) =>
  client.get(`/users/${username}/following`);
