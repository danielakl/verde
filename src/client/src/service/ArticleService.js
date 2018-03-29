// @flow

import Article from "../DTO/Article";

class ArticleService {
    static getArticles(): Promise<Article[]> {
        return fetch('/api/article').then(response => {
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

    static addArticle(title: string, abstract: string, text: string): Promise<number> {
        let body = JSON.stringify({title: title, abstract: abstract, text: text});
        return fetch('/api/article', {method: 'POST', headers: new Headers({'Content-Type': 'application/json'}), body: body}).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }
}

export default ArticleService;
