// @flow
"use strict";

import Article from '../models/Article';

class ArticleDAO {
    static getArticle(id: number):Promise<Article> {
        return Article.query().findById(id).eager('[category, comments]').modifyEager('comments', builder => {
            builder.orderBy('comments.votes', 'DESC');
        });
    }

    static getArticles(query: string | void):Promise<Article[]> {
        if (query && typeof query === 'string') {
            query = query.trim();
            return Article.query().select(
                'articles.id', 'articles.title',
                'articles.abstract', 'articles.author',
                'articles.votes',
                Article.relatedQuery('comments').count().as('numberOfComments'),
                'articles.createdAt', 'articles.updatedAt'
                ).where('articles.title', 'like', '%' + query + '%').eager('[category]').orderByRaw('articles.createdAt, articles.votes DESC');
        }
        return Article.query().select(
            'articles.id', 'articles.title',
            'articles.abstract', 'articles.author',
            'articles.votes',
            Article.relatedQuery('comments').count().as('numberOfComments'),
            'articles.createdAt', 'articles.updatedAt'
        ).eager('[category]').orderByRaw('articles.createdAt, articles.votes DESC');
    }

    static createArticle(article: Object):Promise<Article> {
        return Article.query().insertAndFetch(article);
    }

    static updateArticle(article: Object):Promise<Article> {
        return Article.query().updateAndFetchById(article.id, article);
    }

    static deleteArticle(id: number):Promise<number> {
        return Article.query().deleteById(id);
    }
}

export default ArticleDAO;