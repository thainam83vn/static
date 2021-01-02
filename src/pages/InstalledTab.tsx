import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from "@ionic/react";
import { archive } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RefreshMyApps, UninstallApp } from "../example/reducer/actions";
import { useStore } from "../react-store/GlobalStore";
import { App } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const InstalledTab: React.FC = () => {
  const { state, dispatch } = useStore();
  let { myApps } = state || { myApps: [] };
  console.log("InstalledTab init", myApps);
  useEffect(() => {
    console.log("InstalledTab useEffect");
    RefreshMyApps(dispatch);
  }, []);
  const content = (
    <IonList>
      {myApps.map((page: App) => (
        // <IonItem key={page.name} href={`pages/${page.name}`}>
        //   <IonLabel>{page.title}</IonLabel>
        // </IonItem>
        <IonItemSliding key={page.name}>
          <IonItem href={`pages/${page.name}`}>
            <IonLabel>{page.title}</IonLabel>
          </IonItem>
          <IonItemOptions>
            <IonItemOption
              color="secondary"
              onClick={() => UninstallApp(dispatch, { name: page.name })}
            >
              <IonIcon slot="top" icon={archive} />
              Uninstall
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
  return <PageTemplate title="Installed" content={content}></PageTemplate>;
};

export default InstalledTab;
