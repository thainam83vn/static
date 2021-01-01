import { IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import PromiseContainer from "../components/PromiseContainer";
import { AppGeneralService } from "../services/AppPageService";
import { App } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const InstalledTab: React.FC = () => {
  const [refreshTime, setRefreshTime] = useState(new Date().toISOString());
  console.log("InstalledTab", { refreshTime });
  useEffect(() => {
    setRefreshTime(new Date().toISOString());
    console.log("InstalledTab useEffect", { refreshTime });
  }, []);
  const content = (
    <PromiseContainer
      refreshTime={refreshTime}
      requestDataFunc={AppGeneralService.GetMyPages}
      generateComponentFunc={(appPages: App[]) => (
        <IonList>
          {appPages.map((page) => (
            <IonItem key={page.name} href={`pages/${page.name}`}>
              <IonLabel>{page.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    ></PromiseContainer>
  );
  return <PageTemplate title="Installed" content={content}></PageTemplate>;
};

export default InstalledTab;
