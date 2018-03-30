// @flow
"use strict";

import Objection from 'objection';
import {Model} from 'objection';
import path from 'path';

import BaseModel from './BaseModel';

class Category extends BaseModel {
    id: number;
    category: string;

    constructor(id: number, category: string) {
        super();
        this.id = id;
        this.category = category;
    }

    static get tableName():string {
        return 'categories';
    }

    static get jsonSchema():Objection.JsonSchema {
        return {
            type: 'object',
            required: ['category'],
            properties: {
                id: {type: 'integer'},
                category: {type: 'string', minLength: 1, maxLength: 255},
                createdAt: {type: 'timestamp'},
                updatedAt: {type: ['timestamp', 'null']}
            }
        }
    }

    static relationMappings = {
        articles: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, "Article"),
            filter: query => query.select('id'),
            join: {
                from: "categories.id",
                to: "articles.categoryId"
            }
        },
    };
}

export default Category;