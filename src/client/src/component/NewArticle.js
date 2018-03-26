// @flow

import * as React from "react";
import Signal from "signals";

import Alert from "./Alert";
import Card from "./Card";
import Form from "./Form";
import ArticleService from "../service/ArticleService";

class NewArticle extends React.Component<{}> {
    form: Form;
    title: HTMLInputElement;
    abstract: HTMLTextAreaElement;
    text: HTMLTextAreaElement;

    onAdd: Signal<> = new Signal();

    render() {
        return (
            <Card title="New Article">
                <Form
                    ref={e => (this.form = (e) ? e : this.form)}
                    submitLabel="Add Article"
                    groups={[
                        {label: 'Title', input: <input ref={e => (this.title = (e) ? e : this.title)} type="text" required />},
                        {label: 'Abstract', input: <textarea ref={e => (this.abstract = (e) ? e : this.abstract)} rows="2" required />},
                        {label: 'Text', input: <textarea ref={e => (this.text = (e) ? e : this.text)} rows="3" required />},
                        {checkInputs: [{label: 'I have read, understand and accept the terms and ...', input: <input type="checkbox" required />}]}
                    ]}
                />
            </Card>
        );
    }

    componentDidMount() {
        if (this.form) {
            this.form.onSubmit.add(() => {
                if (!this.title || !this.abstract || !this.text) return;
                ArticleService.addArticle(this.title.value, this.abstract.value, this.text.value)
                    .then(id => {
                        if (this.form) this.form.reset();
                        this.onAdd.dispatch();
                        history.push('/articles/' + id);
                    })
                    .catch((error: Error) => {
                        Alert.danger('Error adding article: ' + error.message);
                    });
            });
        }
    }
}

export default NewArticle;