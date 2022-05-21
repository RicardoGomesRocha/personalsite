export interface Search {
  title: string;
  text: string[];
  image: string;
  link: string;
  categories: string[];
}

export enum SearchTheme {
  Light,
  Dark,
}
