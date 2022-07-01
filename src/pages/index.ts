import Home from "./home";
import Rank from "./rank";

import Claim from "./claim";
import Invitees from "./invitees";

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
  {
    path: "/invitees",
    exact: true,
    component: Invitees,
  },
];
