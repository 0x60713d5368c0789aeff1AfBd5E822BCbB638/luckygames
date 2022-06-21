import React from "react";

import { FomoStore } from "./store";

export const StoreContext = React.createContext({
  fomo: new FomoStore(),
});
