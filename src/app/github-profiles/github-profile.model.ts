export interface UserProperties {
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
}

export interface Repositories {
  name: string;
  html_url: string;
}
