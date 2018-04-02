// @flow
'use strict';

import Category from './Category';
import Comment from './Comment';

export default class Article {
    id: number;
    title: string;
    abstract: string;
    text: string;
    categoryId: number;
    category: Category;
    author: string;
    numberOfComments: number;
    comments: Comment[];
    votes: number;
    createdAt: Date;
    updatedAt: Date;
}