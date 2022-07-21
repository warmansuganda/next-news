import { AxiosError } from 'axios';

export interface QueryParams {
  query: string;
  page?: number;
  period?: number;
  filter?: string;
  sort?: string;
  begin_date?: string;
  end_date?: string;
}

export interface ErrorMessage {
  message: string;
}

export type ErrorResponse = AxiosError<ErrorMessage>;
