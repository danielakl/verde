// @flow

import * as React from "react";

/**
 * Renders an information card using Bootstrap classes
 */
export class Card extends React.Component<{title: React.Node, children?: React.Node}> {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Card;