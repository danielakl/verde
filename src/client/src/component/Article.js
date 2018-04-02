// @flow
'use strict';

import * as React from "react";
import {Link, Route} from 'react-router-dom';
import Moment from 'moment';

const Article = (props: {}) => {
    const {renderType} = props;
    const {id, title, abstract, text, author, votes, comments} = props.data;
    const createdAt = Moment(props.data.createdAt).fromNow();
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
                        <button className="btn btn-primary" type="submit">Submit</button>
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
};

export default Article;