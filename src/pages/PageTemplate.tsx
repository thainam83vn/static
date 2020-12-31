import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./PageTemplate.css";

interface PageTemplateProps {
  title: any;
  content: any;
}

const PageTemplate: React.FC<PageTemplateProps> = (
  props: PageTemplateProps
) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{props.content}</IonContent>
    </IonPage>
  );
};

export default PageTemplate;
