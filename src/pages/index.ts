import Home from "./home";
import Rank from "./rank";

import Claim from "./claim";


export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/rank",
    exact: true,
    component: Rank,
  },
  {
    path: "/claim",
    exact: true,
    component: Claim,
  },
];
