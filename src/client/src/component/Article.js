// @flow

import * as React from "react";
import {Route} from 'react-router-dom';

import Alert from "./Alert";
import Card from "./Card";
import Table from "./Table";
import NewArticle from "./NewArticle";
import ArticleDetails from "./ArticleDetails";
import ArticleService from "../service/ArticleService";

class Article extends React.Component<{}> {
    table: Table;
    newArticle: NewArticle;

    render() {
        return (
            <div>
                <Card title="Articles">
                    <Table ref={e => (this.table = (e) ? e : this.table)} header={['Title', 'Abstract']} />
                </Card>
                <Route exact path="/articles/:id" component={ArticleDetails} />
                <NewArticle ref={e => (this.newArticle = (e) ? e : this.newArticle)} />
            </div>
        );
    }

    // Helper function to update component
    update() {
        ArticleService.getArticles()
            .then(articles => {
                if (this.table) this.table.setRows(articles.map(article => ({id: article.id, cells: [article.title, article.abstract]})));
            })
            .catch((error: Error) => {
                Alert.danger('Error getting articles: ' + error.message);
            });
    }

    componentDidMount() {
        if (this.table) {
            this.table.onRowClick.add(rowId => {
                history.push('/articles/' + rowId);
            });
        }
        if (this.newArticle) {
            this.newArticle.onAdd.add(() => {
                this.update();
            });
        }
        this.update();
    }
}

export default Article;