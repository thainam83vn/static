import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import { AppPage, IAppPageService } from "./IAppPageService";
import _ from "lodash";

const dicPages: any = {
  Youtube: {
    name: "Youtube",
    title: "Youtube",
    url: "/pages/Youtube",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    type: "url",
    options: {
      targetUrl: "https://www.youtube.com/embed/eo_JVyY1Ra4",
    },
  },
  Calculator: {
    name: "Calculator",
    title: "Calculator",
    url: "/pages/Calculator",
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline,
    type: "normal",
  },
};

const myPages = Object.keys(dicPages).map((key: string) => dicPages[key]);
const simulatorDelayDuration: number = 1000;
const allPages: AppPage[] = [];
for (let i = 1; i < 1000000; i++) {
  allPages.push({
    name: `App ${i}`,
    title: `App ${i}`,
    url: `/pages/app${i}`,
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline,
    type: "normal",
  });
}

function GetMyPagesSync(): AppPage[] {
  return myPages;
}

function GetPageSync(name: string): AppPage {
  return dicPages[name];
}

class AppPageMockService implements IAppPageService {
  GetMyPages(): Promise<AppPage[]> {
    console.log(`GetMyPages `);
    return new Promise((resolve, _) => {
      setTimeout(() => resolve(GetMyPagesSync()), simulatorDelayDuration);
    });
  }

  GetPages(from: number, take: number): Promise<AppPage[]> {
    console.log(`GetPages ${from}-${take}`);
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(_.chain(allPages).drop(from).take(take).value()),
        simulatorDelayDuration
      );
    });
  }

  SearchPages(keyword: string): Promise<AppPage[]> {
    keyword = keyword.toLocaleLowerCase();
    console.log(`SearchPages ${keyword}`);
    return new Promise((resolve, _) => {
      // setTimeout(
      //   () =>
      //     resolve(
      //       allPages.filter(
      //         (page: AppPage) =>
      //           page.title.toLocaleLowerCase().indexOf(keyword) >= 0
      //       )
      //     ),
      //   simulatorDelayDuration
      // );
      setTimeout(() => resolve(GetMyPagesSync()), simulatorDelayDuration);
    });
  }

  GetPage(name: string): Promise<AppPage> {
    console.log(`GetPage ${name}`);
    return new Promise((resolve, _) => {
      setTimeout(() => resolve(GetPageSync(name)), simulatorDelayDuration);
    });
  }
}

export const AppPageGeneralService = new AppPageMockService();
