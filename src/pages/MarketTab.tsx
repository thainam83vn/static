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
} from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import OnDemandPromiseContainer from "../components/OnDemandPromiseContainer";
import PromiseContainer from "../components/PromiseContainer";
import { AppPageGeneralService } from "../services/AppPageService";
import { AppPage } from "../services/IAppPageService";
import PageTemplate from "./PageTemplate";

const MarketTab: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<AppPage[]>([]);
  const [paging, setPaging] = useState({ from: 0, to: 0, size: 10 });
  console.log("MarketTab init");
  // const content = (
  //   <>
  //     <IonToolbar>
  //       <IonSearchbar
  //         value={keyword}
  //         onIonChange={(e) => {
  //           console.log("Searchbar changed", e);
  //           setKeyword(e.detail.value!);
  //         }}
  //       ></IonSearchbar>
  //     </IonToolbar>
  //     <OnDemandPromiseContainer
  //       requestDataFunc={AppPageGeneralService.SearchPages.bind(
  //         undefined,
  //         keyword
  //       )}
  //       generateComponentFunc={(appPages: AppPage[]) => (
  //         <IonList>
  //           {appPages.map((page) => (
  //             <IonItem key={page.name} href={`pages/${page.name}`}>
  //               <IonLabel>{page.title}</IonLabel>
  //             </IonItem>
  //           ))}
  //         </IonList>
  //       )}
  //     ></OnDemandPromiseContainer>
  //   </>
  // );
  useEffect(() => {});
  let onIonInfinite = (event: any) => {
    AppPageGeneralService.GetPages(paging.to, paging.size).then(
      (items: AppPage[]) => {
        data.push(...items);
        setData(data);
        setPaging({
          from: paging.to,
          to: paging.to + paging.size,
          size: paging.size,
        });
      }
    );
    console.log("Done");
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (data.length == 1000) {
      event.target.disabled = true;
    }
  };
  const content = (
    <>
      <IonInfiniteScroll onIonInfinite={onIonInfinite}>
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more..."
        >
          <IonList>
            {data.map((item: AppPage) => (
              <IonItem key={item.name}>
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
  return <PageTemplate title="Market" content={content}></PageTemplate>;
};

export default MarketTab;
