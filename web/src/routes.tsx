import * as React from "react";
// import { Store } from "redux";
import { Shell } from "./views/shell";
import { HomeView } from "./views/home/home";
import { Route, IndexRoute } from "react-router";

// export interface IRenderStore<TState> {
//   store: Store<TState>
//   waitForRender?: boolean
// }

export function routesFactory() {
  return (
    <Route path="/">
      <Route component={Shell}>
        <IndexRoute component={HomeView} />
      </Route>
    </Route>
  )
}