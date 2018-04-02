// @flow
'use strict';

import * as React from 'react';
import {NavLink} from 'react-router-dom';

/**
 * Renders a navigation bar using Bootstrap classes
 */
const NavBar = (props: {brand?: React.Node, links: {to: string, text: React.Node}[]}) => {
    let {brand, links} = props;
    if (brand) {
        brand = <NavLink className="navbar-brand" activeClassName="active" to="/">{brand}</NavLink>
    }
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            {brand}
            <ul className="navbar-nav">
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink className="nav-link" activeClassName="active" to={link.to} exact>
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;