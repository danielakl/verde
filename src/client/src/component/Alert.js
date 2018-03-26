// @flow

import * as React from "react";

/**
 * Renders alert messages using Bootstrap classes. Only one instance of this component is supported.
 */
export class Alert extends React.Component<{}, {alerts: {text: React.Node, type: string}[]}> {
    state = {alerts: []};

    static _instance: ?Alert;

    constructor() {
        super();
        Alert._instance = this;
    }

    render() {
        return this.state.alerts.map((alert, i) => (
            <div key={i} className={'alert alert-' + alert.type} role="alert">
                {alert.text}
                <button
                    className="close"
                    onClick={() => {
                        this.state.alerts.splice(i, 1);
                        this.setState({alerts: this.state.alerts});
                    }}
                >
                    &times;
                </button>
            </div>
        ));
    }

    componentWillUnmount() {
        Alert._instance = null;
    }

    static success(text: React.Node) {
        let instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({text: text, type: 'success'});
            instance.setState({alerts: instance.state.alerts});
        }
    }

    static info(text: React.Node) {
        let instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({text: text, type: 'info'});
            instance.setState({alerts: instance.state.alerts});
        }
    }

    static warning(text: React.Node) {
        let instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({text: text, type: 'warning'});
            instance.setState({alerts: instance.state.alerts});
        }
    }

    static danger(text: React.Node) {
        let instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({text: text, type: 'danger'});
            instance.setState({alerts: instance.state.alerts});
        }
    }
}

export default Alert;