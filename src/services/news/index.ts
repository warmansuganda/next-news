import client from '@services/client';
// import axios, { AxiosRequestConfig } from 'axios';
// import { User } from './types';

// https://docs.github.com/en/rest/search#constructing-a-search-query
// const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
export const fetchNews = (query?: string, page?: number) =>
  client.get('/svc/search/v2/articlesearch.json', {
    params: { q: query, page },
  });
