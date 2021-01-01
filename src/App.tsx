import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import InstalledTab from "./pages/InstalledTab";
import MarketTab from "./pages/MarketTab";
import AccountTab from "./pages/AccountTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Page from "./pages/Page";
import { useStore } from "./react-store/GlobalStore";
import { RefreshMyApps } from "./example/reducer/actions";

const App: React.FC = () => {
  console.log("App init");
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/myapps" component={InstalledTab} exact={true} />
            <Route path="/market" component={MarketTab} exact={true} />
            <Route path="/pages/:name" component={Page} />
            <Route path="/account" component={AccountTab} />
            <Route
              path="/"
              render={() => <Redirect to="/myapps" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="myapps" href="/myapps">
              <IonIcon icon={triangle} />
              <IonLabel>Installed</IonLabel>
            </IonTabButton>
            <IonTabButton tab="market" href="/market">
              <IonIcon icon={ellipse} />
              <IonLabel>Market</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={square} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
