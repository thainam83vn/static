import { AppGeneralService } from "../../services/AppPageService";
import { App } from "../../services/IAppPageService";
import { ActionNames } from "./Reducer";

export function RefreshMyApps(dispatch: any): Promise<App[]> {
  return AppGeneralService.GetMyPages().then((items) => {
    dispatch({ type: ActionNames.REFRESH_MYAPPS, payload: items });
    return Promise.resolve(items);
  });
}

export function RefreshAllApps(
  dispatch: any,
  options: { searchText: string; from: number; size: number; isAppend: boolean }
): Promise<App[]> {
  return AppGeneralService.GetPages(
    options.searchText,
    options.from,
    options.size
  ).then((items) => {
    if (options.isAppend) {
      dispatch({ type: ActionNames.APPEND_ALLAPPS, payload: { apps: items } });
    } else {
      dispatch({
        type: ActionNames.REFRESH_ALLAPPS,
        payload: { apps: items, searchText: options.searchText },
      });
    }
    return Promise.resolve(items);
  });
}

export function InstallApp(
  dispatch: any,
  options: { name: string }
): Promise<App> {
  return AppGeneralService.AddApp(options.name).then((app) => {
    dispatch({ type: ActionNames.ADD, payload: app });
    return Promise.resolve(app);
  });
}

export function UninstallApp(
  dispatch: any,
  options: { name: string }
): Promise<App> {
  return AppGeneralService.RemoveApp(options.name).then((app) => {
    dispatch({ type: ActionNames.REMOVE, payload: app });
    return Promise.resolve(app);
  });
}
