import { bookmarkOutline, mailOutline, mailSharp } from "ionicons/icons";
import { App, IAppService } from "./IAppPageService";
import _, { indexOf } from "lodash";

class AppMockService implements IAppService {
  static instance: AppMockService;
  public static Instance(): AppMockService {
    if (!AppMockService.instance) {
      AppMockService.instance = new AppMockService();
    }
    return AppMockService.instance;
  }

  simulatorDelayDuration: number = 500;
  allPages: any = {
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
  constructor() {
    for (let i = 1; i < 1000000; i++) {
      const name = `App${i}`;
      this.allPages[name] = {
        name,
        title: `App ${i}`,
        url: `/pages/app${i}`,
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        type: "normal",
      };
    }
  }

  GetMyPageNamesSync(): string[] {
    if (localStorage.getItem("myapps")) {
      return (localStorage.getItem("myapps") || "").split(";");
    }
    return [];
  }

  GetMyPagesSync(): App[] {
    return this.GetMyPageNamesSync()
      .map((name) => this.allPages[name])
      .filter((app) => !!app);
  }

  GetPageSync(name: string): App {
    return this.allPages[name];
  }

  response(data: any): Promise<any> {
    return new Promise((resolve, _) => {
      setTimeout(() => resolve(data), this.simulatorDelayDuration);
    });
  }

  GetMyPages(): Promise<App[]> {
    console.log(`GetMyPages `);
    return this.response(this.GetMyPagesSync());
  }

  GetPages(searchText: string, from: number, take: number): Promise<App[]> {
    searchText = searchText.toLocaleLowerCase();
    const myAppNames = this.GetMyPageNamesSync();
    console.log(`GetPages ${searchText}-${from}-${take}`, { myAppNames });
    return this.response(
      _.chain(this.allPages)
        .filter(
          (item) =>
            item.title.toLocaleLowerCase().includes(searchText) &&
            !myAppNames.includes(item.name)
        )
        .drop(from)
        .take(take)
        .value()
    );
  }

  GetPage(name: string): Promise<App> {
    console.log(`GetPage ${name}`);
    return this.response(this.GetPageSync(name));
  }

  AddApp(name: string): Promise<App> {
    if (!localStorage.getItem("myapps")) {
      localStorage.setItem("myapps", name);
    } else {
      localStorage.setItem(
        "myapps",
        `${localStorage.getItem("myapps")};${name}`
      );
    }
    console.log("AddApp-", localStorage.getItem("myapps"));
    return this.response(this.allPages[name]);
  }

  RemoveApp(name: string): Promise<App> {
    const myAddNames = this.GetMyPageNamesSync();
    if (myAddNames.length > 0) {
      localStorage.setItem(
        "myapps",
        myAddNames.filter((myName) => myName !== name).join(";")
      );
    }
    console.log("RemoveApp-", localStorage.getItem("myapps"));
    return this.response(this.GetPageSync(name));
  }
}

export const AppGeneralService = AppMockService.Instance();
