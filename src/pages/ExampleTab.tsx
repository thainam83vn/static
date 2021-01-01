import { IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import PromiseContainer from "../components/PromiseContainer";
import Example from "../example/Example";
import { AppGeneralService } from "../services/AppPageService";
import { App } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const ExampleTab: React.FC = () => {
  const [refreshTime, setRefreshTime] = useState(new Date().toISOString());
  console.log("InstalledTab", { refreshTime });
  useEffect(() => {
    setRefreshTime(new Date().toISOString());
    console.log("InstalledTab useEffect", { refreshTime });
  }, []);
  const content = <Example></Example>;
  return <PageTemplate title="Installed" content={content}></PageTemplate>;
};

export default ExampleTab;
