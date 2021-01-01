import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";

interface InfiniteScrollListProps {
  refreshTime: string;
  searchText: string;
  itemTemplate: (data: any) => any;
  loadMoreFunc: (
    searchText: string,
    from: number,
    take: number
  ) => Promise<any>;
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  refreshTime,
  searchText,
  itemTemplate,
  loadMoreFunc,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [paging, setPaging] = useState({ from: 0, size: 10 });
  console.log("InfiniteScrollList init", { searchText, refreshTime });

  const getData = (currentData: any[] = []): Promise<any[]> => {
    console.log("InfiniteScrollList getData", {
      searchText,
      from: paging.from,
      dataLength: currentData.length,
    });
    let from = currentData.length === 0 ? 0 : paging.from;
    let take = currentData.length === 0 ? paging.size * 2 : paging.size;
    return loadMoreFunc(searchText, from, take).then((items: any[]) => {
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
  }, [searchText, refreshTime]);
  let onIonInfinite = (event: any) => {
    getData(data).then((items: any[]) => {
      event.target.complete();
      if (items.length === 0) {
        event.target.disabled = true;
      }
    });
  };

  return (
    <IonContent>
      <IonList>{data.map((item: any) => itemTemplate(item))}</IonList>
      <IonInfiniteScroll onIonInfinite={onIonInfinite}>
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
};
export default InfiniteScrollList;
