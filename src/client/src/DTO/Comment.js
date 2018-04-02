// @flow
'use strict';

export default class Comment {
    id: number;
    articleId: number;
    text: string;
    author: string;
    votes: number;
    createdAt: Date;
    updatedAt: Date;
}