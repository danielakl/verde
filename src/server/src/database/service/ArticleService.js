// @flow
"use strict";

import Article from '../models/Article';
import ArticleDAO from '../DAO/ArticleDAO';

class ArticleService {
    static getArticle(id: string | number):Promise<Article> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if (id < 0) {
                return reject({
                    code: 400,
                    message: "Given ID must be a positive integer."
                });
            }
            ArticleDAO.getArticle(id)
                .then(resolve)
                .catch(reject);
        });
    }

    static getArticles(query?: string = "", category?: string = ""):Promise<Article[]> {
        return new Promise((resolve, reject) => {
            ArticleDAO.getArticles(query, category)
                .then(resolve)
                .catch(reject);
        });
    }

    static createArticle(article: mixed):Promise<Article> {
        return new Promise((resolve, reject) => {
            if (!article) {
                return reject({
                    code: 400,
                    message: "No data given to create article."
                });
            }
            const {categoryId, title, abstract, text, author, votes} = article;
            article = {
                categoryId: isNaN(parseInt(categoryId)) ? null : parseInt(categoryId),
                title: (title && typeof title === 'string') ? title : "",
                abstract: (abstract && typeof abstract === 'string') ? abstract : "",
                text: (text && typeof text === 'string') ? text : "",
                author: (author && typeof author === 'string' && author.trim().length >= 3) ? author.trim() : "Anonymous",
                votes: isNaN(parseInt(votes)) ? 0 : parseInt(votes)
            };
            ArticleDAO.createArticle(article)
                .then(resolve)
                .catch(reject);
        });
    }

    static updateArticle(article: mixed):Promise<Article> {
        return new Promise((resolve, reject) => {
            if (!article) {
                return reject({
                    code: 400,
                    message: "No data given to update article."
                });
            }
            const {id, categoryId, title, abstract, text, author, votes} = article;
            if (!id || !title || !abstract || !text) {
                return reject({
                    code: 400,
                    message: "The article can not be updated without required information like id, title, abstract and text."
                });
            }
            article = {
                id,
                categoryId: isNaN(parseInt(categoryId)) ? null : parseInt(categoryId),
                title: (title && typeof title === 'string') ? title.trim() : "",
                abstract: (abstract && typeof abstract === 'string') ? abstract.trim() : "",
                text: (text && typeof text === 'string') ? text.trim() : "",
                author: (author && typeof author === 'string' && author.trim().length >= 3) ? author.trim() : "Anonymous",
                votes: parseInt(votes)
            };
            ArticleDAO.updateArticle(article)
                .then(resolve)
                .catch(reject);
        })
    }

    static deleteArticle(id: number):Promise<number> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            ArticleDAO.deleteArticle(id)
                .then(resolve)
                .catch(reject);
        });
    }
}

export default ArticleService;