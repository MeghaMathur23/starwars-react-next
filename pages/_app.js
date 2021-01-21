import '../static/styles/bootstrap.css'

import '../styles/globals.css'
import { Provider } from "mobx-react";
import authStore from "../stores/AuthStore";
import planetStore from "../stores/PlanetStore"
import routingStore from "../stores/RoutingStore"
const stores = {
  planetStore,
  routingStore,
  authStore,
  routingStore
};


function MyApp({ Component, pageProps }) {
  return  <Provider {...stores} >
            <Component {...pageProps} />
          </Provider>
  
  
  
}

export default MyApp


