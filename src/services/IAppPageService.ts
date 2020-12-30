export interface AppPage {
  name: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  type: string;
  options?: any;
}

export interface IAppPageService {
  GetMyPages(): Promise<AppPage[]>;
  SearchPages(keyword: string): Promise<AppPage[]>;
  GetPage(name: string): Promise<AppPage>;
}
