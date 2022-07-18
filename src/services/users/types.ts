export interface User {
  id: number;
  login: string;
  name: string;
  company: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Repo {
  id: number;
  name: string;
  svn_url: string;
  forks_count: number;
  stargazers_count: number;
}
