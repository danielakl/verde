// @flow
"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./component/Home";
import Alert from "./component/Alert";
import NavBar from "./component/NavBar";
import EditArticle from "./component/EditArticle";
import NewArticle from "./component/NewArticle";
import registerServiceWorker from "./registerServiceWorker";

const root = document.getElementById('root');
if (root) {
    ReactDOM.render(
        <Router>
            <div className="container">
                <Alert/>
                <NavBar brand="The Verde" links={[{to: '/new', text: 'Create Article'}]}/>
                <Switch>
                    <Route path="/new" component={NewArticle}/>
                    <Route path="/article/:id/edit" component={EditArticle}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </Router>,
        root
    )
} else {
    throw new Error("Missing root element.");
}
registerServiceWorker();
