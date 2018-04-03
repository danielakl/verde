// @flow
"use strict";

import express from 'express';

import CommentService from '../database/service/CommentService';

const router = express.Router();

/**
 * Get all articles, or filtered by a query.
 */
router.get("/", (req: express$Request, res: express$Response) => {
    CommentService.getComments().then(comments => {
        res.json(comments);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

/**
 * Get the article with the given id.
 */
router.get("/:id", (req: express$Request, res: express$Response) => {
    CommentService.getComment(req.params.id).then(comment => {
        res.json(comment);
    }).catch(error => {
        console.error(error);
        res.status(error.status | 500).json(error);
    });
});

/**
 * Create a new article.
 */
router.post("/", (req: express$Request, res: express$Response) => {
    CommentService.createComment(req.body).then(comment => {
        res.status(201).json(comment);
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
    CommentService.updateComment(req.body).then(comment => {
        res.json(comment);
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
    CommentService.deleteComment(id).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error(error);
        res.status(error.code | 500).json(error);
    });
});

export default router;