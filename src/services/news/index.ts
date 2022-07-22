import client from '@services/client';
// import axios, { AxiosRequestConfig } from 'axios';
import { MostPopularCategory } from './types';

// https://developer.nytimes.com/docs/articlesearch-product/1/overview
export const fetchNews = (query?: string, page?: number) =>
  client.get('/svc/search/v2/articlesearch.json', {
    params: { ...(query ? { q: query } : {}), page },
  });

export const findNews = (url: string) =>
  client.get('/svc/search/v2/articlesearch.json', {
    params: { fq: `web_url:("${url}")` },
  });

// https://developer.nytimes.com/docs/most-popular-product/1/overview
export const fetchMostPopularNews = (
  category: MostPopularCategory,
  period: number,
  query?: string,
  page?: number
) =>
  client.get(`/svc/mostpopular/v2/${category}/${period}.json`, {
    params: { ...(query ? { q: query } : {}), page },
  });
