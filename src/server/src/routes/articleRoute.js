// @flow
"use strict";

import express from 'express';
import Article from "../database/models/Article";

const router = express.Router();

// The data is currently stored in memory
let articles = [new Article(0, 'title1', 'abstract1', 'text1'), new Article(1, 'title2', 'abstract2', 'text2'), new Article(2, 'title3', 'abstract3', 'text3')];

router.get("/", (req: express$Request, res: express$Response) => {
    res.json(articles);
});

router.get("/:id", (req: express$Request, res: express$Response) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.json(article);
        return;
    }
    res.sendStatus(404);
});

router.post("/", (req: express$Request, res: express$Response) => {
    if (req.body) {
        const {title, abstract, text} = req.body;
        if (title && abstract && text) {
            if (typeof title === 'string' && typeof abstract === 'string' && typeof text === 'string') {
                articles.push(new Article(4, title, abstract, text));
                res.sendStatus(201);
                return;
            }
        }
    }
    res.sendStatus(400);
});

router.put("/:id", (req: express$Request, res: express$Response) => {
    articles = articles.map(article => {
        if (article.id === Number(req.params.id)) {
            const {title, abstract, text} = req.body;
            return new Article(article.id, title, abstract, text);
        }
        return article;
    });
    res.sendStatus(204);
});

router.delete("/:id", (req: express$Request, res: express$Response) => {
    articles = articles.filter(article => !(article.id === req.params.id));
    res.sendStatus(204);
});

export default router;