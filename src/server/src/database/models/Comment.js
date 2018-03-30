// @flow
"use strict";

import Objection from 'objection';
import {Model} from 'objection';
import path from 'path';

import BaseModel from './BaseModel';

class Comment extends BaseModel {
    id: number;
    articleId: number;
    text: string;
    author: string;
    votes: number;

    constructor(id: number, articleId: number, text: string, author: string, votes: number) {
        super();
        this.id = id;
        this.articleId = articleId;
        this.text = text;
        this.author = (author) ? author : "Anonymous";
        votes = parseInt(votes);
        this.votes = isNaN(votes) ? 0 : votes;
    }

    static get tableName():string {
        return 'comments';
    }

    static get jsonSchema():Objection.JsonSchema {
        return {
            type: 'object',
            required: ['articleId', 'text'],
            properties: {
                id: {type: 'integer'},
                articleId: {type: 'integer'},
                text: {type: 'string', minLength: 1, maxLength: 255},
                author: {type: 'string', minLength: 3, maxLength: 255, default: "Anonymous"},
                votes: {type: 'integer', default: 0},
                createdAt: {type: 'timestamp'},
                updatedAt: {type: ['timestamp', 'null']}
            }
        }
    }

    static relationMappings = {
        article: {
            relation: Model.BelongsToOneRelation,
            modelClass: path.join(__dirname, "Article"),
            join: {
                from: "comments.articleId",
                to: "articles.id"
            }
        }
    };
}

export default Comment;