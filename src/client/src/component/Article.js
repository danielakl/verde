// @flow
'use strict';

import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Moment from 'moment';
import ArticleService from "../service/ArticleService";
import Alert from "./Alert";
import CommentService from "../service/CommentService";

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
            commentText: '',
            data: article
        };

        this.handleArticleLike = this.handleArticleLike.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmitComment(event) {
        event.preventDefault();
        CommentService.addComment(this.state.data.id, this.state.commentText, 'Anonymous')
            .then(comment => {
                this.setState(prevState => {
                    const comments = [{text: comment.text, author: comment.author, createdAt: comment.createdAt, votes: comment.votes}];
                    prevState.data.comments.forEach(comment => comments.push(comment));
                    return {...prevState, data: {...prevState.data, comments: comments}}
                });
            })
            .catch(error => {
                Alert.danger("Error submitting comment. " + error.message);
            });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
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
                        <form onSubmit={this.handleSubmitComment}>
                            <div className="form-group">
                                <textarea onChange={this.handleChange} name="commentText" className="form-control" rows="3">{this.state.commentText}</textarea>
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