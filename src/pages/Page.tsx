import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/containers/ExploreContainer";
import IFrameContainer from "../components/containers/IFrameContainer";
import PromiseContainer from "../components/PromiseContainer";
import { AppPageGeneralService } from "../services/AppPageService";
import { AppPage } from "../services/IAppPageService";
import "./Page.css";

const getContainer = (name: string, page: AppPage): any => {
  switch (page?.type?.toLowerCase()) {
    case "url":
      return <IFrameContainer name={name} options={page.options} />;
    default:
  }
  return <ExploreContainer name={name} />;
};

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

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
          requestDataFunc={AppPageGeneralService.GetPage.bind(undefined, name)}
          generateComponentFunc={(page: AppPage) => {
            return getContainer(name, page);
          }}
        ></PromiseContainer>
      </IonContent>
    </IonPage>
  );
};

export default Page;
