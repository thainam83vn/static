import {
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonContent,
} from "@ionic/react";
import React from "react";
import PromiseContainer from "../components/PromiseContainer";
import { AppPageGeneralService } from "../services/AppPageService";
import { AppPage } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const InstalledTab: React.FC = () => {
  const content = (
    <PromiseContainer
      requestDataFunc={AppPageGeneralService.GetMyPages}
      generateComponentFunc={(appPages: AppPage[]) => (
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
