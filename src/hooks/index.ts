import React from "react";
import { StoreContext } from "../store";

export const useStores = () => React.useContext(StoreContext);
