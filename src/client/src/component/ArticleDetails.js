// @flow

import * as React from "react";

import Article from "../data-object/Article";
import Alert from "./Alert";
import Card from "./Card";
import ArticleService from "../service/ArticleService";

class ArticleDetails extends React.Component<{match: {params: {id: number}}}, {article: ?Article}> {
    state = {article: null};

    render() {
        if (!this.state.article) return null;
        return (
            <Card title={'Article: ' + this.state.article.title}>
                <div>
                    <div>
                        <strong>{this.state.article.abstract}</strong>
                    </div>
                    <div>{this.state.article.text}</div>
                </div>
            </Card>
        );
    }

    // Helper function to update component
    update() {
        ArticleService.getArticle(this.props.match.params.id)
            .then(article => {
                this.setState({article: article});
            })
            .catch((error: Error) => {
                Alert.danger('Error getting article ' + this.props.match.params.id + ': ' + error.message);
            });
    }

    componentDidMount() {
        this.update();
    }

    // Called when the this.props-object change while the component is mounted
    // For instance, when navigating from path /articles/1 to /articles/2
    componentWillReceiveProps() {
        setTimeout(() => {
            this.update();
        }, 0); // Enqueue this.update() after props has changed
    }
}

export default ArticleDetails;