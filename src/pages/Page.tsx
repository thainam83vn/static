import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/containers/ExploreContainer";
import IFrameContainer from "../components/containers/IFrameContainer";
import PromiseContainer from "../components/PromiseContainer";
import { AppGeneralService } from "../services/AppPageService";
import { App } from "../services/IAppPageService";
import "./Page.css";

const getContainer = (name: string, page: App): any => {
  switch (page?.type?.toLowerCase()) {
    case "url":
      return <IFrameContainer name={name} options={page.options} />;
    default:
  }
  return <ExploreContainer name={name} />;
};

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [refreshTime, setRefreshTime] = useState(new Date().toISOString());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name={name} /> */}
        {/* <IFrameContainer name={name} /> */}
        <PromiseContainer
          refreshTime={refreshTime}
          requestDataFunc={() => AppGeneralService.GetPage(name)}
          generateComponentFunc={(page: App) => {
            return getContainer(name, page);
          }}
        ></PromiseContainer>
      </IonContent>
    </IonPage>
  );
};

export default Page;
