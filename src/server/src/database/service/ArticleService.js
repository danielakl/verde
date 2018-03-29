// @flow
"use strict";

import ArticleDAO from '../DAO/ArticleDAO';

type ObjectLitteral = { $call?: empty }

class ArticleService {
    static getArticle(id: string | number):Promise<ObjectLitteral> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if (id < 0) {
                return reject({
                    code: 400,
                    message: "Given ID must be a positive integer."
                });
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