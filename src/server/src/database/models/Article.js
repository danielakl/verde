// @flow
"use strict";

import Objection from 'objection';
import {Model} from 'objection';
import path from 'path';

import BaseModel from './BaseModel';

class Article extends BaseModel {
    id: number;
    title: string;
    abstract: string;
    text: string;
    votes: number;

    constructor(id: number, title: string, abstract: string, text: string, votes: number) {
        super();
        this.id = id;
        this.title = title;
        this.abstract = abstract;
        this.text = text;
        votes = parseInt(votes);
        this.votes = isNaN(votes) ? 0 : votes;
    }

    static get tableName():string {
        return 'articles';
    }

    static get jsonSchema():Objection.JsonSchema {
        return {
            type: 'object',
            required: ['title', 'abstract', 'text'],
            properties: {
                id: {type: 'integer'},
                categoryId: {type: 'integer'},
                title: {type: 'string', minLength: 1, maxLength: 255},
                abstract: {type: 'string', minLength: 1, maxLength: 255},
                text: {type: 'string', minLength: 1, maxLength: 16777215},
                votes: {type: 'integer', default: 0},
                createdAt: {type: 'string'},
                updatedAt: {type: ['string', 'null']}
            }
        }
    }

    static relationMappings = {
        category: {
            relation: Model.HasOneRelation,
            modelClass: path.join(__dirname, "Category"),
            join: {
                from: "articles.categoryId",
                to: "categories.id"
            }
        },

        comments: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, "Comment"),
            join: {
                from: "articles.id",
                to: "comments.articleId"
            }
        }
    };
}

export default Article;