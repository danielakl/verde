// @flow
'use strict';

import Comment from "../DTO/Comment";

class CommentService {
    static getComments(): Promise<Comment[]> {
        return fetch('/api/comment').then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }

    static getComment(id: number): Promise<Comment> {
        return fetch('/api/comment/' + id).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }

    static addComment(articleId: number | string, text: string, author: ?string): Promise<number> {
        let body = JSON.stringify({articleId, text, author});
        return fetch('/api/comment', {method: 'POST', headers: new Headers({'Content-Type': 'application/json'}), body}).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }
}

export default CommentService;
