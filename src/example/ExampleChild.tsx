import React, { useEffect } from "react";
import { useStore } from "../react-store";
import { AppGeneralService } from "../services/AppPageService";
import { AppState } from "./reducer/Reducer";

const ExampleChild = () => {
  const { state, dispatch } = useStore() as any;
  let st = state as AppState;
  useEffect(() => {
    AppGeneralService.GetMyPages().then((items) =>
      dispatch({ type: "REFRESH_MYAPPS", payload: items })
    );
  }, []);
  console.log(st.myApps);
  return (
    <div>
      {st.myApps.map((app) => (
        <div key={app.name}>{app.name}</div>
      ))}
    </div>
  );
};

export default ExampleChild;
