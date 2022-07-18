import { AxiosError } from 'axios';

export interface QueryParams {
  query: string;
  page?: number;
}

export interface ErrorMessage {
  message: string;
}

export type ErrorResponse = AxiosError<ErrorMessage>;
