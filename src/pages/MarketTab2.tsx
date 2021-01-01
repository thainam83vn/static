import { IonSearchbar, IonItem, IonLabel, IonAlert } from "@ionic/react";
import React, { useState, useEffect, ReactNode } from "react";
import InfiniteScrollList from "../components/InfiniteScrollList";
import { AppGeneralService } from "../services/AppPageService";
import { App } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const MarketTab: React.FC = () => {
  console.log("MarketTab init");
  const [searchText, setSearchText] = useState("");
  const [showAlertAdd, setShowAlertAdd] = useState(false);
  const [appName, setAppName] = useState("");
  const [refreshTime, setRefreshTime] = useState(new Date().toISOString());

  const title = (
    <IonSearchbar
      value={searchText}
      onIonChange={(e) => {
        setSearchText(e.detail.value!);
        console.log("searchText changed", { searchText: e.detail.value! });
      }}
      debounce={1000}
    ></IonSearchbar>
  );
  let content = (
    <>
      <InfiniteScrollList
        refreshTime={refreshTime}
        searchText={searchText}
        loadMoreFunc={(searchText: string, from: number, take: number) => {
          return AppGeneralService.GetPages(searchText, from, take);
        }}
        itemTemplate={(item: App) => (
          <IonItem
            key={item.name}
            detail
            onClick={() => {
              setAppName(item.name);
              setShowAlertAdd(true);
            }}
          >
            <IonLabel>{item.title}</IonLabel>
          </IonItem>
        )}
      ></InfiniteScrollList>
      <IonAlert
        isOpen={showAlertAdd}
        onDidDismiss={() => setShowAlertAdd(false)}
        cssClass="my-custom-class"
        header={"Alert"}
        subHeader={"Subtitle"}
        message={`Do you want to install app ${appName}`}
        buttons={[
          {
            text: "OK",
            handler: () => {
              console.log("Add app", appName);
              AppGeneralService.AddApp(appName).then(() => {
                setRefreshTime(new Date().toISOString());
                // setSearchText(searchText);
              });
            },
          },
          {
            text: "Cancel",
          },
        ]}
      />
    </>
  );
  return <PageTemplate title={title} content={content}></PageTemplate>;
};
export default MarketTab;
