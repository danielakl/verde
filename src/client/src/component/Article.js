// @flow
'use strict';

import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Moment from 'moment';
import ArticleService from "../service/ArticleService";
import Alert from "./Alert";

class Article extends Component<{}> {
    constructor(props: {}) {
        super(props);
        const article = (props.match)
            ? {
                id: props.match.params.id,
                title: '',
                abstract: '',
                text: '',
                author: '',
                votes: 0,
                comments: []
            }
            : {
                id: props.data.id,
                title: props.data.title,
                abstract: props.data.abstract,
                text: props.data.text,
                author: props.data.author,
                votes: props.data.votes,
                comments: props.data.comments
            };
        this.state = {
            renderType: props.renderType ? props.renderType : 'article',
            data: article
        };

        this.handleArticleLike = this.handleArticleLike.bind(this);
    }

    componentDidMount() {
        if (this.props.match) {
            ArticleService.getArticle(this.state.data.id).then(article => {
                this.setState(prevState => (
                    {...prevState, data: {...article}}
                ));
            }).catch(error => {
                Alert.danger("Error getting article data. " + error.message)
            });
        }
    }

    handleArticleLike(event) {
        event.preventDefault();
        ArticleService.getArticle(parseInt(this.state.data.id)).then(article => {
            article.votes = article.votes + 1;
            ArticleService.putArticle(article).then(article => {
                this.setState(prevState => ({...prevState, data: {...prevState.data, votes: article.votes}}))
            }).catch(error => {
                Alert.danger("Error updating votes. " + error.message)
            });
        }).catch(error => {
            Alert.danger("Error getting article. " + error.message)
        });

    }

    render() {
        const {renderType} = this.state;
        const {id, title, abstract, text, author, votes} = this.state.data;
        let comments = [];
        if (this.state.data.comments) {
            comments = this.state.data.comments.map(comment => ({
                ...comment,
                createdAt: Moment(comment.createdAt).fromNow()
            }));
        }
        const createdAt = Moment(this.state.data.createdAt).fromNow();
        if (renderType === 'card') {
            return (<Link to={`/article/${id}`} className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="float-right"><small>Votes: {votes}</small></span></h5>
                        <h7 className="card-subtitle">{abstract}</h7>
                        <p className="card-text"><small className="text-muted">
                            By {author}
                            <span className="float-right">Written {createdAt}</span>
                        </small></p>
                    </div>
                </div>
            </Link>);
        }
        return (
            <article className="card">
                <div className="card-body">
                    <h2>{title}</h2>
                    <p className="lead">{abstract}</p>
                    <hr/>
                    <p>By {author} - Written {createdAt} - Votes: {votes} - Comments: {comments.length}</p>
                    <hr/>
                    <p>{text}</p>
                    <hr/>
                    <div className="well">
                        <h4>Leave a Comment:</h4>
                        <form>
                            <div className="form-group">
                                <textarea className="form-control" rows="3"/>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit Comment</button>
                            <button className="btn btn-primary" onClick={this.handleArticleLike} type="button">Like this article</button>
                        </form>
                    </div>
                    <hr/>
                    {comments.map(comment => (<div className="card">
                        <div className="card-body">
                            <p className="card-text">{comment.text}</p>
                            <p className="card-text"><small className="text-muted">By {comment.author} - {comment.createdAt} - Votes: {comment.votes}</small></p>
                        </div>
                    </div>))}
                </div>
            </article>);
    }
}

export default Article;