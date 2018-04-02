// @flow
'use strict';

import React, {Component} from 'react';

import Alert from "./Alert";
import Article from "./Article";
import ArticleService from "../service/ArticleService";
import CategoryService from "../service/CategoryService";

class ArticleList extends Component<{}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            articles: props.articles,
            categories: [],
            category: ''
        };

        this.handleCatChange = this.handleCatChange.bind(this);
    }

    componentDidMount() {
        CategoryService.getCategories().then(categories => {
            this.setState(prevState => (
                {...prevState, categories: categories.map(category => ({id: category.id, category: category.category}))}
            ));
        }).catch(error => {
            Alert.danger("Failed to retrieve categories. " + error.message);
        });
        ArticleService.getArticles("", this.state.category).then(articles => {
            this.setState(prevState => (
                {...prevState, articles: articles}
            ));
        }).catch(error => {
            Alert.danger("Failed to retrieve articles. " + error.message);
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-pills nav-fill">
                        <li onMouseDown={this.handleCatChange} className="nav-item">
                            <div className="nav-link active">All</div>
                        </li>
                        {this.state.categories.map(category => (
                            <li onMouseDown={this.handleCatChange} key={category.id} className="nav-item">
                                <div className="nav-link">{category.category}</div>
                            </li>))}
                    </ul>
                    <div className="container-fluid">
                        {this.state.articles.map(article => <Article key={article.id} renderType="card" data={article}/>)}
                    </div>
                </div>
            </div>);
    }

    handleCatChange(event) {
        console.dir(event.target);
        if (event.target) {
            this.setState(prevState => ({...prevState, category: (event.target.textContent === 'All') ? '' : event.target.textContent}));
        }
    }
}

export default ArticleList;