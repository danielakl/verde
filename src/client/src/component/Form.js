// @flow

import Signal from "signals";
import * as React from "react";

/**
 * Renders a form using Bootstrap classes.
 */
class Form extends React.Component<
    {
        submitLabel: React.Node,
        cancelLabel?: React.Node,
        groups: {
            label?: React.Node,
            input?: React.Element<'input' | 'select' | 'textarea'>,
            checkInputs?: {label?: React.Node, input: React.Element<'input'>}[]
        }[]
    },
    {form_key: number}
    > {
    state = {form_key: 0};

    _form: ?HTMLFormElement;
    submitButton: ?HTMLButtonElement;

    onSubmit: Signal<> = new Signal();
    onCancel: Signal<> = new Signal();

    updateSubmitButton = () => {
        if (this.submitButton) this.submitButton.disabled = !(this._form && this._form.checkValidity());
    };

    render() {
        return (
            <form key={this.state.form_key} ref={e => (this._form = e)}>
                {this.props.groups.map((group, i) => {
                    let checkInputElements;
                    if (group.checkInputs) {
                        checkInputElements = group.checkInputs.map((checkInput, i) => (
                            <div key={i} className="form-check col-sm-10">
                                {React.cloneElement(checkInput.input, {
                                    className: 'form-check-input',
                                    onChange: this.updateSubmitButton
                                })}
                                <label className="form-check-label">{checkInput.label}</label>
                            </div>
                        ));
                    }
                    return (
                        <div key={i} className="form-group row">
                            {group.label ? <label className="col-form-label col-sm-2">{group.label}</label> : null}
                            {group.input ? (
                                <div className="col-sm-10">
                                    {React.cloneElement(group.input, {
                                        className: 'form-control',
                                        onChange: this.updateSubmitButton
                                    })}
                                    {checkInputElements}
                                </div>
                            ) : (
                                checkInputElements
                            )}
                        </div>
                    );
                })}
                <button
                    type="submit"
                    ref={e => (this.submitButton = e)}
                    className="btn btn-primary"
                    onClick={(e: Event) => {
                        e.preventDefault();
                        this.onSubmit.dispatch();
                    }}
                >
                    {this.props.submitLabel}
                </button>
                {this.props.cancelLabel ? (
                    <button
                        className="btn btn-secondary"
                        onClick={(e: Event) => {
                            e.preventDefault();
                            this.onCancel.dispatch();
                        }}
                    >
                        {this.props.cancelLabel}
                    </button>
                ) : null}
            </form>
        );
    }

    componentDidMount() {
        this.updateSubmitButton();
    }

    reset() {
        this.setState({form_key: ++this.state.form_key}); // Reset this._form
        this.componentDidMount();
    }
}

export default Form;