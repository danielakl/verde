// @flow
"use strict";

import Article from '../models/Article';

class ArticleDAO {
    static getArticle(id: number) {
        return Article.query().where('id', id).eager('[category, comments]').modifyEager('comments', builder => {
            builder.orderBy('comments.votes', 'comments.createdAt');
        });
    }
}

export default ArticleDAO;