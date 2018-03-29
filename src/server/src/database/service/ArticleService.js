// @flow
"use strict";

import ArticleDAO from '../DAO/ArticleDAO';

type JSONObject = { $call?: empty }

class ArticleService {
    static getArticle(id: string | number):Promise<JSONObject> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if (id < 0) {
                return reject(JSON.stringify({
                    code: 400,
                    message: "Given ID must be a positive integer."
                }));
            }
            ArticleDAO.getArticle(id).then(article => {
                resolve(article);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

export default ArticleService;