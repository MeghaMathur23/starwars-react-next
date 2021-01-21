import { autorun, configure } from "mobx";
import { ExecutionEnv } from "lib/utils/executionEnv";
import AuthStore from "./AuthStore";
import RoutingStore from "./RoutingStore";
import PlanetStore from "./PlanetStore";

configure({ enforceActions: "observed" });

const authStore = new AuthStore();
const planetStore = new PlanetStore();
const routingStore = new RoutingStore();

autorun(() => {
  // Execute only in browser.
  if (ExecutionEnv.canUseDOM) {
    const { query } = routingStore;
    if (query && query.limit) {
      uiStore.setPageSize(parseInt(query.limit, 10));
    }

    if (query && query.sortby) {
      uiStore.setSortBy(query.sortby);
    }
  }
});

export default {
  authStore,
  planetStore,
  routingStore
  
};
