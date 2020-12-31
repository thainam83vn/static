import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonContent,
} from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useState, useEffect, ReactNode } from "react";
import InfiniteScrollList from "../components/InfiniteScrollList";
import { AppPageGeneralService } from "../services/AppPageService";
import { AppPage } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const MarketTab: React.FC = () => {
  console.log("MarketTab init");
  const [searchText, setSearchText] = useState("");

  const title = (
    <>
      <IonLabel>Market</IonLabel>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => {
          setSearchText(e.detail.value!);
          console.log("searchText changed", { searchText: e.detail.value! });
        }}
        debounce={1000}
      ></IonSearchbar>
    </>
  );
  return (
    <PageTemplate
      title={title}
      content={
        <InfiniteScrollList searchText={searchText}></InfiniteScrollList>
      }
    ></PageTemplate>
  );
};
export default MarketTab;

// const MarketTab: React.FC = () => {
//   const [data, setData] = useState<AppPage[]>([]);
//   const [paging, setPaging] = useState({ searchText: "", from: 0, size: 10 });
//   console.log("MarketTab init");

//   const getData = (): Promise<AppPage[]> => {
//     return AppPageGeneralService.GetPages(
//       paging.searchText,
//       paging.from,
//       data.length === 0 ? paging.size * 2 : paging.size
//     ).then((items: AppPage[]) => {
//       if (items.length > 0) {
//         setData([...data, ...items]);
//         setPaging({
//           ...paging,
//           from: paging.from + items.length,
//         });
//       }
//       return Promise.resolve(items);
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   let onIonInfinite = (event: any) => {
//     getData().then((items: AppPage[]) => {
//       event.target.complete();
//       if (items.length === 0) {
//         event.target.disabled = true;
//       }
//     });
//   };
//   const title = (
//     <>
//       <IonLabel>Market</IonLabel>
//       <IonSearchbar
//         value={paging.searchText}
//         onIonChange={(e) => {
//           setPaging({
//             ...paging,
//             from: 0,
//             searchText: e.detail.value!,
//           });
//           getData();
//         }}
//         debounce={1000}
//       ></IonSearchbar>
//     </>
//   );
//   const content = (
//     <>
//       <IonContent>
//         <IonList>
//           {data.map((item: AppPage) => (
//             <IonItem key={item.name}>
//               <IonLabel>{item.title}</IonLabel>
//             </IonItem>
//           ))}
//         </IonList>
//         <IonInfiniteScroll onIonInfinite={onIonInfinite}>
//           <IonInfiniteScrollContent></IonInfiniteScrollContent>
//         </IonInfiniteScroll>
//       </IonContent>
//     </>
//   );
//   return <PageTemplate title={title} content={content}></PageTemplate>;
// };
// export default MarketTab;
