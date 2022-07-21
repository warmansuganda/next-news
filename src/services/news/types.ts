export type MostPopularCategory = 'emailed' | 'shared' | 'viewed';
export interface Author {
  firstname: string;
  middlename: string;
  lastname: string;
}

export interface News {
  uri: string;
  web_url: string;
  pub_date: Date;
  headline: {
    main: string;
  };
  section_name: string;
  byline: {
    original: string;
  };
  multimedia: Array<{
    subtype: string;
    url: string;
  }>;
}

export interface MostPopularNews {
  uri: string;
  url: string;
  published_date: Date;
  title: string;
  abstract: string;
  section: string;
  byline: string;
  media: Array<{ 'media-metadata': Array<{ format: string; url: string }> }>;
}
