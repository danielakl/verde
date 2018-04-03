// @flow
"use strict";

import Article from '../models/Article';

class ArticleDAO {
    static getArticle(id: number):Promise<Article> {
        return Article.query().findById(id).select(
            'articles.id', 'articles.title',
            'articles.abstract', 'articles.text',
            'articles.author', 'articles.votes',
            'articles.createdAt', 'articles.updatedAt')
            .eager('[category, comments]').modifyEager('comments', builder => {
            builder.orderBy('comments.votes', 'DESC');
        });
    }

    static getArticles(query?: string = "", category?: string = ""):Promise<Article[]> {
        if (query && category) {
            query = query.trim();
            category = category.trim();
            return Article.query().select(
                'articles.id', 'articles.title',
                'articles.abstract', 'articles.author',
                'articles.votes', Article.relatedQuery('comments').count().as('numberOfComments'),
                'articles.createdAt', 'articles.updatedAt').join('categories', 'categories.id', '=', 'articles.categoryId').eager('[category]')
                .where('articles.title', 'like', `%${query}%`).andWhere('categories.category', category);
        }
        if (category) {
            category = category.trim();
            return Article.query().select(
                'articles.id', 'articles.title',
                'articles.abstract', 'articles.author',
                'articles.votes', Article.relatedQuery('comments').count().as('numberOfComments'),
                'articles.createdAt', 'articles.updatedAt').join('categories', 'categories.id', '=', 'articles.categoryId').eager('[category]')
                .where('categories.category', category);
        } else if (query) {
            query = query.trim();
            return Article.query().select(
                'articles.id', 'articles.title',
                'articles.abstract', 'articles.author',
                'articles.votes',
                Article.relatedQuery('comments').count().as('numberOfComments'),
                'articles.createdAt', 'articles.updatedAt'
                ).where('articles.title', 'like', `%${query}%`).eager('[category]')
                .orderBy('articles.votes', 'DESC');
        }
        return Article.query().select(
            'articles.id', 'articles.title',
            'articles.abstract', 'articles.author',
            'articles.votes',
            Article.relatedQuery('comments').count().as('numberOfComments'),
            'articles.createdAt', 'articles.updatedAt'
        ).eager('[category]').orderBy('articles.votes', 'DESC');
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