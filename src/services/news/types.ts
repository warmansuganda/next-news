export interface Author {
  firstname: string;
  middlename: string;
  lastname: string;
}

export interface News {
  uri: string;
  pub_date: Date;
  headline: {
    main: string;
  };
  news_desk: string;
  byline: {
    person: Author[];
  };
  multimedia: Array<{
    subtype: string;
    url: string;
  }>;
}
