// @flow
'use strict';

import Article from "../DTO/Article";

class ArticleService {
    static getArticles(query?: string = "", category?: string = ""): Promise<Article[]> {
        return fetch(`/api/article?query=${query}&category=${category}`).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }

    static getArticle(id: number): Promise<Article> {
        return fetch('/api/article/' + id).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }

    static addArticle(title: string, abstract: string, text: string, categoryId: ?number, author: ?string): Promise<number> {
        let body = JSON.stringify({title, abstract, text, categoryId, author});
        return fetch('/api/article', {method: 'POST', headers: new Headers({'Content-Type': 'application/json'}), body}).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }
}

export default ArticleService;
