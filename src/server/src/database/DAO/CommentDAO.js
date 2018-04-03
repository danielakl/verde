// @flow
"use strict";

import Comment from '../models/Comment';

class CommentDAO {
    static getComment(id: number):Promise<Comment> {
        return Comment.query().findById(id);
    }

    static getComments():Promise<Comment[]> {
        return Comment.query().orderBy('comments.createdAt', 'ASC');
    }

    static createComment(comment: {}):Promise<Comment> {
        return Comment.query().insertAndFetch(comment);
    }
}

export default CommentDAO;