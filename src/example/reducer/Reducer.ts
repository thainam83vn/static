import { App } from "../../services/IAppPageService";
export interface AppState {
  myApps: App[];
  allApps: App[];
  market: {
    searchText: string;
    from: number;
    size: number;
  };
}
export const initState: AppState = {
  myApps: [],
  allApps: [],
  market: {
    searchText: "",
    from: 0,
    size: 10,
  },
};
export const ActionNames = {
  REFRESH_ALLAPPS: "REFRESH_ALLAPPS",
  APPEND_ALLAPPS: "APPEND_ALLAPPS",
  REFRESH_MYAPPS: "REFRESH_MYAPPS",
  ADD: "ADD",
  REMOVE: "REMOVE",
};

const reducer = (state: AppState, action: { type: any; payload: any }) => {
  console.log("reducer", action);
  const { type, payload } = action;
  switch (type) {
    case ActionNames.REFRESH_ALLAPPS:
      state.allApps = payload.apps;
      state.market = {
        ...state.market,
        from: payload.apps.length,
        searchText: payload.searchText,
      };
      return { ...state };
    case ActionNames.APPEND_ALLAPPS:
      state.allApps = [...state.allApps, ...payload.apps];
      state.market = {
        ...state.market,
        from: state.market.from + payload.apps.length,
      };
      return { ...state };
    case ActionNames.REFRESH_MYAPPS:
      state.myApps = payload;
      return { ...state };
    case ActionNames.ADD:
      state.myApps = [...state.myApps, payload];
      return { ...state };
    case ActionNames.REMOVE:
      state.myApps = state.myApps.filter((app) => app !== payload);
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
