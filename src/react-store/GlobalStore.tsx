import React, { createContext, useContext, useReducer } from "react";
import { AppState } from "../example/reducer/Reducer";
interface StoreInfo {
  state: AppState;
  dispatch: any;
}
const StoreContext = createContext(undefined);
const GlobalStore = (props: any) => {
  if (props === undefined)
    throw new Error(
      "Props Undefined. You probably mixed up betweenn default/named import"
    );
  const { load, ...rest } = props;
  const [state, dispatch] = useReducer(load.reducer, load.initialState);
  return <StoreContext.Provider value={{ state, dispatch }} {...rest} />;
};

export function useStore(): StoreInfo {
  return useContext(StoreContext) as any;
}
export default GlobalStore;
