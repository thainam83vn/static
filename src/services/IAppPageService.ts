export interface App {
  name: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  type: string;
  options?: any;
}

export interface IAppService {
  GetMyPages(): Promise<App[]>;
  GetPages(searchText: string, from: number, take: number): Promise<App[]>;
  GetPage(name: string): Promise<App>;
  AddApp(name: string): Promise<App>;
  RemoveApp(name: string): Promise<App>;
}
