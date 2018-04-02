// @flow
"use strict";

import express from 'express';

import ArticleService from '../database/service/ArticleService';

const router = express.Router();

/**
 * Get all articles, or filtered by a query.
 */
router.get("/", (req: express$Request, res: express$Response) => {
    const query: string | void = req.query.query ? req.query.query.toString() : undefined;
    const category: string | void = req.query.category ? req.query.category.toString() : undefined;
    ArticleService.getArticles(query, category).then(articles => {
        res.json(articles);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

/**
 * Get the article with the given id.
 */
router.get("/:id", (req: express$Request, res: express$Response) => {
    ArticleService.getArticle(req.params.id).then(article => {
        res.json(article);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

/**
 * Create a new article.
 */
router.post("/", (req: express$Request, res: express$Response) => {
    ArticleService.createArticle(req.body).then(article => {
        res.status(201).json(article);
    }).catch(error => {
        console.error(error);
        res.status(error.code | 500).json(error);
    });
});

/**
 * Fully update an article, required fields must be provided.
 */
router.put("/:id", (req: express$Request, res: express$Response) => {
    let id = parseInt(req.params.id);
    id = isNaN(id) ? parseInt(req.body.id) : id;
    req.body.id = id;
    ArticleService.updateArticle(req.body).then(article => {
        res.json(article);
    }).catch(error => {
        console.error(error);
        res.status(error.code | 500).json(error);
    });
});

/**
 * Delete an article with the given id.
 */
router.delete("/:id", (req: express$Request, res: express$Response) => {
    let id = parseInt(req.params.id);
    id = isNaN(id) ? parseInt(req.body.id) : id;
    ArticleService.deleteArticle(id).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error(error);
        res.status(error.code | 500).json(error);
    });
});

export default router;