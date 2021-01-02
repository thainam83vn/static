import {
  IonSearchbar,
  IonItem,
  IonLabel,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from "@ionic/react";
import React, { useEffect } from "react";
import { InstallApp, RefreshAllApps } from "../example/reducer/actions";
import { useStore } from "../react-store";
import { App } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const MarketTab: React.FC = () => {
  const { state, dispatch } = useStore();
  let { allApps, market } = state;
  let { searchText, from, size } = market;
  console.log("MarketTab init", { searchText, from, size, allApps });

  let search = (
    searchText: string,
    from: number,
    size: number,
    isAppend: boolean
  ): Promise<App[]> => {
    return RefreshAllApps(dispatch, {
      searchText,
      from,
      size,
      isAppend,
    });
  };

  const itemTemplate = (item: App) => (
    <IonItem
      key={item.name}
      detail
      onClick={() => {
        console.log("Add app", { item });
        InstallApp(dispatch, { name: item.name }).then(() =>
          search(searchText, 0, size * 2, false)
        );
        // setAppName(item.name);
        // setShowAlertAdd(true);
      }}
    >
      <IonLabel>{item.title}</IonLabel>
    </IonItem>
  );

  useEffect(() => {
    search(searchText, 0, size * 2, false);
  }, []);

  let onIonInfinite = (event: any) => {
    search(searchText, from, size, true).then((items: any[]) => {
      event.target.complete();
      if (items.length === 0) {
        event.target.disabled = true;
      }
    });
  };

  const title = (
    <IonSearchbar
      value={searchText}
      onIonChange={(e) => {
        console.log("searchText changed", { searchText: e.detail.value! });
        search(e.detail.value!, 0, size * 2, false);
      }}
      debounce={1000}
    ></IonSearchbar>
  );
  let content = (
    <IonContent>
      <IonList>{allApps.map((item: any) => itemTemplate(item))}</IonList>
      <IonInfiniteScroll onIonInfinite={onIonInfinite}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
  return <PageTemplate title={title} content={content}></PageTemplate>;
};
export default MarketTab;
