// @flow
'use strict';

import React, {Component} from "react";
import ArticleList from "./ArticleList";
import Alert from "./Alert";
import ArticleService from "../service/ArticleService";

class Home extends Component<{}> {
    constructor(props: {}) {
        super(props);
        this.state = {articles: []};
    }

    componentDidMount() {
        ArticleService.getArticles().then(articles => {
            this.setState(prevState => ({...prevState, articles}));
        }).catch(error => {
            Alert.danger('Error retrieving articles: ' + error.message);
        });
    }

    render() {
        return <ArticleList articles={this.state.articles}/>;
    }
}

export default Home;