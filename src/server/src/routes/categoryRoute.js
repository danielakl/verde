// @flow
"use strict";

import express from 'express';

import CategoryService from '../database/service/CategoryService';

const router = express.Router();

/**
 * Get all articles, or filtered by a query.
 */
router.get("/", (req: express$Request, res: express$Response) => {
    CategoryService.getCategories().then(categories => {
        res.json(categories);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

/**
 * Get the article with the given id.
 */
router.get("/:id", (req: express$Request, res: express$Response) => {
    CategoryService.getCategory(req.params.id).then(category => {
        res.json(category);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

export default router;