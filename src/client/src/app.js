// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import Alert from "./component/Alert";
import Article from "./component/Article";
import Home from "./component/Home";
import NavigationBar from "./component/NavigationBar";
import registerServiceWorker from "./registerServiceWorker";

const root = document.getElementById('root');
if (root) {
    ReactDOM.render(
        <HashRouter>
            <div>
                <Alert />
                <NavigationBar brand="React Example" links={[{to: '/articles', text: 'Article'}]} />
                <Route exact path="/" component={Home} />
                <Route path="/articles" component={Article} />
            </div>
        </HashRouter>,
        root
    );
}
registerServiceWorker();
