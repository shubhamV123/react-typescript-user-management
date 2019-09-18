import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LayoutProvider from "./Provider/LayoutProvider";

const { lazy, Suspense } = React;

const Home = lazy(() => import("./Components/Home"));
const NoResult = lazy(() => import("./Components/NoResult"));
const LoginForm = lazy(() => import("./Components/LoginForm"));
const PrivateRoute = lazy(() => import("./Routes/PrivateRoute"));

function App() {
  return (
    <Router>
      <LayoutProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <PrivateRoute exact path="/" component={Home} />
            <Route component={NoResult} />
          </Switch>
        </Suspense>
      </LayoutProvider>
    </Router>
  );
}

export default App;
