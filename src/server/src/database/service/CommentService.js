// @flow
"use strict";

import Comment from '../models/Comment';
import CommentDAO from '../DAO/CommentDAO';

class CommentService {
    static getComment(id: string | number):Promise<Comment> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if (id < 0) {
                return reject({
                    code: 400,
                    message: "Given ID must be a positive integer."
                });
            }
            CommentDAO.getComment(id)
                .then(resolve)
                .catch(reject);
        });
    }

    static getComments():Promise<Comment[]> {
        return new Promise((resolve, reject) => {
            CommentDAO.getComments()
                .then(resolve)
                .catch(reject);
        });
    }

    static createComment(comment: mixed):Promise<Comment> {
        return new Promise((resolve, reject) => {
            if (!comment) {
                return reject({
                    code: 400,
                    message: "No data given to create comment."
                });
            }
            const {articleId, text, author, votes} = comment;
            comment = {
                articleId: isNaN(parseInt(articleId)) ? null : parseInt(articleId),
                text: (text && typeof text === 'string') ? text : "",
                author: (author && typeof author === 'string' && author.trim().length >= 3) ? author.trim() : "Anonymous",
                votes: isNaN(parseInt(votes)) ? 0 : parseInt(votes)
            };
            CommentDAO.createComment(comment)
                .then(resolve)
                .catch(reject);
        });
    }

    static updateComment(comment: mixed):Promise<Comment> {
        return new Promise((resolve, reject) => {
            if (!comment) {
                return reject({
                    code: 400,
                    message: "No data given to update article."
                });
            }
            const {id, articleId, text, author, votes} = comment;
            if (!id || !articleId || !text) {
                return reject({
                    code: 400,
                    message: "The comment can not be updated without required information like id, articleId, and text."
                });
            }
            comment = {
                id,
                articleId: isNaN(parseInt(articleId)) ? null : parseInt(articleId),
                text: (text && typeof text === 'string') ? text.trim() : "",
                author: (author && typeof author === 'string' && author.trim().length >= 3) ? author.trim() : "Anonymous",
                votes: parseInt(votes)
            };
            CommentDAO.updateComment(comment)
                .then(resolve)
                .catch(reject);
        })
    }

    static deleteComment(id: number):Promise<number> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            CommentDAO.deleteComment(id)
                .then(resolve)
                .catch(reject);
        });
    }
}

export default CommentService;