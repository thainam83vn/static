import React, { useEffect, useState } from "react";
import "./Menu.css";
import { AppPage } from "../services/IAppPageService";
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { title } from "process";
import PageTemplate from "../pages/PageTemplate";
import { AppPageGeneralService } from "../services/AppPageService";

interface InfiniteScrollListProps {
  searchText: string;
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  searchText,
}) => {
  const [data, setData] = useState<AppPage[]>([]);
  const [paging, setPaging] = useState({ from: 0, size: 10 });
  console.log("InfiniteScrollList init", { searchText });

  const getData = (currentData: AppPage[] = []): Promise<AppPage[]> => {
    console.log("InfiniteScrollList getData", {
      searchText,
      from: paging.from,
      dataLength: currentData.length,
    });
    let from = currentData.length === 0 ? 0 : paging.from;
    return AppPageGeneralService.GetPages(
      searchText,
      from,
      currentData.length === 0 ? paging.size * 2 : paging.size
    ).then((items: AppPage[]) => {
      console.log("InfiniteScrollList getData", items);
      if (items.length > 0) {
        setData([...currentData, ...items]);
        setPaging({
          ...paging,
          from: from + items.length,
        });
      }
      return Promise.resolve(items);
    });
  };

  useEffect(() => {
    console.log("InfiniteScrollList useEffect", { searchText });
    getData([]);
  }, [searchText]);
  let onIonInfinite = (event: any) => {
    getData(data).then((items: AppPage[]) => {
      event.target.complete();
      if (items.length === 0) {
        event.target.disabled = true;
      }
    });
  };

  return (
    <IonContent>
      <IonList>
        {data.map((item: AppPage) => (
          <IonItem key={item.name}>
            <IonLabel>{item.title}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll onIonInfinite={onIonInfinite}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
};
export default InfiniteScrollList;
