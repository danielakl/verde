// @flow

import * as React from "react";
import {NavLink} from 'react-router-dom';

/**
 * Renders a navigation bar using Bootstrap classes
 */
export class NavigationBar extends React.Component<{brand?: React.Node, links: {to: string, text: React.Node, exact?: boolean}[]}> {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                {this.props.brand ? (
                    <NavLink className="navbar-brand" activeClassName="active" to="/">
                        {this.props.brand}
                    </NavLink>
                ) : null}
                <ul className="navbar-nav">
                    {this.props.links.map((link, i) => (
                        <li key={i}>
                            <NavLink className="nav-link" activeClassName="active" exact={link.exact} to={link.to}>
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;