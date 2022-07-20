export interface News {
  uri: string;
  pub_date: Date;
  headline: {
    main: string;
  };
  author: {
    firstname: string;
    middlename: string;
    lastname: string;
  };
}
