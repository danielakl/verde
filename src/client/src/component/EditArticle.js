// @flow
'use strict';

import React, {Component} from 'react';

import Alert from "./Alert";
import ArticleService from "../service/ArticleService";
import CategoryService from '../service/CategoryService';

class EditArticle extends Component<{}> {
    constructor(props: {}) {
        super(props);
        this.state = {categories: [], category: '', title: '', abstract: '', text: '', author: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ArticleService.getArticle(this.props.match).then(article => {
            this.setState(prevState => {
                const {category, title, abstract, text, author} = article;
                return {
                    ...prevState,
                    category: {id: category.id, category: category.category},
                    title,
                    abstract,
                    text,
                    author
                };
            })
        }).catch(error => {
            Alert.danger('Error retrieving article data. ' + error.message);
        });
        CategoryService.getCategories().then(categories => {
            this.setState(prevState => {
                const cats = [{category: 'None'}];
                categories.forEach(category => {
                    cats.push({id: category.id, category: category.category});
                });
                return {...prevState, categories: cats};
            });
        }).catch(error => {
            Alert.danger('Error retrieving categories: ' + error.message);
        });
    }

    render() {
        const {categories, category, title, abstract, text, author} = this.state;
        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <span className="float-right"><small className="text-muted">Characters left: {255 - title.length}</small></span>
                            <label htmlFor="titleInput">Title</label>
                            <input className="form-control" name="title" id="titleInput" required
                                   value={title} autoFocus maxLength="255" onChange={this.handleChange}
                                   placeholder="Google Maps is adding Where’s Waldo"/>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="authorInput">Author</label>
                                    <input className="form-control" name="author" id="authorInput"
                                           value={author} maxLength="255" onChange={this.handleChange}
                                           placeholder="Waldo Welch"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="categoryInput">Category</label>
                                    <select className="form-control" name="category" id="categoryInput"
                                            onChange={this.handleChange}>
                                        {categories.map(c => (
                                            c.id === category
                                                ? <option value={c.id} selected>{c.category}</option>
                                                : <option value={c.id}>{c.category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <span className="float-right"><small className="text-muted">Characters left: {255 - abstract.length}</small></span>
                            <label htmlFor="abstractInput">Abstract</label>
                            <textarea className="form-control" name="abstract" id="abstractInput" required
                                      rows="5" minLength="1" maxLength="255"
                                      onChange={this.handleChange} placeholder="Starting today and continuing on for the next week, Google is bringing Where’s Waldo? to Google Maps.">
                                {abstract}
                            </textarea>
                        </div>
                        <div className="form-group">
                            <span className="float-right"><small className="text-muted">Characters left: {16777215 - text.length}</small></span>
                            <label htmlFor="textInput">Text</label>
                            <textarea className="form-control" name="text" id="textInput" required
                                      rows="10" minLength="1" maxLength="16777215"
                                      onChange={this.handleChange} placeholder="Aside from Waldo himself, you’ll also be on the lookout for his friends Wenda, Woof, Wizard Whitebeard, and also the villainous Odlaw. (If you’re like me, those faces probably won’t be quite as familiar to you when you start playing.)">
                                {text}
                            </textarea>
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const {category, title, abstract, text, author} = this.state;
        ArticleService.updateArticle(this.props.match, title, abstract, text, category, author).then(() => {
            Alert.success("Successfully updated " + title);
        }).catch(error => {
            Alert.danger("Failed to update article, " + error.message);
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
}

export default EditArticle;