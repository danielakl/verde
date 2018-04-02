// @flow
"use strict";

import Category from '../models/Category';
import CategoryDAO from '../DAO/CategoryDAO';

class CategoryService {
    static getCategory(id: string | number):Promise<Category> {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if (id < 0) {
                return reject({
                    code: 400,
                    message: "Given ID must be a positive integer."
                });
            }
            CategoryDAO.getCategory(id)
                .then(resolve)
                .catch(reject);
        });
    }

    static getCategories():Promise<Category[]> {
        return new Promise((resolve, reject) => {
            CategoryDAO.getCategories()
                .then(resolve)
                .catch(reject);
        });
    }
}

export default CategoryService;