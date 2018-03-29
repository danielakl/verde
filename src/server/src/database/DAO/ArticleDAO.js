// @flow
"use strict";

import Article from '../models/Article';

class ArticleDAO {
    static getArticle(id: number) {
        return Article.findById(id).eager('[category, comments]').modifyEager('comments', builder => {
            builder.orderBy('comments.votes', 'comments.createdAt');
        });
    }

    static getArticles(query: string) {
        query = query.trim();
        if (query) {
            return Article.query().where(raw('lower("title")'), 'like', '%' + query + '%').orderBy('votes');
        }
        return Article.query().orderBy('votes');
    }

    static createArticle(article) {
        return Article.insertAndFetch(article);
    }
}

export default ArticleDAO;