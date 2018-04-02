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
    author: string;
    votes: number;

    constructor() {
        super();
    }

    static get tableName():string {
        return 'articles';
    }

    static get jsonSchema():Objection.JsonSchema {
        return {
            type: 'object',
            required: ['title', 'abstract', 'text'],
            properties: {
                id: {type: 'integer'},                                      // Generated
                categoryId: {type: ['integer', 'null']},                    // Nullable
                title: {type: 'string', minLength: 1, maxLength: 255},      // Required
                abstract: {type: 'string', minLength: 1, maxLength: 255},   // Required
                text: {type: 'string', minLength: 1, maxLength: 16777215},  // Required
                author: {type: 'string', minLength: 3, maxLength: 255},     // Defaults to 'Anonymous'
                votes: {type: 'integer', default: 0},                       // Defaults to '0'
                createdAt: {type: 'timestamp'},                             // Generated
                updatedAt: {type: ['timestamp', 'null']}                    // Null at creation
            }
        }
    }

    static relationMappings = {
        category: {
            relation: Model.HasOneRelation,
            modelClass: path.join(__dirname, "Category"),
            filter: query => query.select('id', 'category'),
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