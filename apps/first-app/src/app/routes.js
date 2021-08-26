import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import People from "./pages/People";
import Pets from "./pages/Pets";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/people" component={People} />
            <Route exact path="/people/:id" component={Pets} />
        </Switch>
    </BrowserRouter>
);

export default Routes;