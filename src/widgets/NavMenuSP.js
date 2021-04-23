import React from 'react';
import { withRouter } from "react-router";
import {
    Link,
    useRouteMatch,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

import { PAGES } from '../utils/constants/pages.js';
import '../scss/navmenu-sp.scss';

class NavMenuSP extends React.Component {
    constructor(props) {
        super(props);

        this.handleNavMenuButtonClick = this.handleNavMenuButtonClick.bind(this);
        this.handleEscKey = this.handleEscKey.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            isOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscKey, false);
    }

    handleNavMenuButtonClick() {
        const open = this.state.isOpen;

        if (open) {
            this.setState({
                isOpen: false
            });
        }
        else {
            this.setState({
                isOpen: true
            });
        }
    }

    handleEscKey() {
        const open = this.state.isOpen;

        if (open) {
            this.setState({
                isOpen: false
            });
        }
    }

    handleLinkClick() {
        const open = this.state.isOpen;

        if (open) {
            this.setState({
                isOpen: false
            });
        }
    }

    render() {
        const isTopPage = this.props.location.pathname != "/" ? true : false;
        let returnButton;
        if (isTopPage) {
            returnButton =
                <li>
                    <NavMenuLink to="/" label={'hold'} activeOnlyWhenExact={true} handler={this.handleLinkClick} />
                </li>;
        } else {
            returnButton = null;
        }
        return (
            <React.Fragment>
                <nav id="navMenuSP" className={this.state.isOpen ? "active" : ""}>
                    <div id="navMenuScreenWipe" className={this.state.isOpen ? "active" : ""}></div>
                    <NavMenuButtonClose className={this.state.isOpen ? "active" : ""} handler={this.handleNavMenuButtonClick} />
                    <ul>
                        {Object.keys(PAGES).map(el => {
                            return (
                                <li>
                                    <NavMenuLink to={"/" + el} label={'hold'} handler={this.handleLinkClick} />
                                </li>
                            );
                        })}
                        {returnButton}
                    </ul>
                </nav>
                <NavMenuButton className={this.state.isOpen ? "active" : ""} handler={this.handleNavMenuButtonClick} />
            </React.Fragment>
        );
    }
}

export default withRouter(NavMenuSP);



class NavMenuButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            handler: this.props.handler,
        };
    }

    render() {
        return (
            <div id="navMenuButton" className={this.props.className} onClick={this.state.handler}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        );
    }
}

class NavMenuButtonClose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            handler: this.props.handler,
        };
    }

    render() {
        return (
            <div id="navMenuButtonClose" className={this.props.className} onClick={this.state.handler}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        );
    }
}

function NavMenuLink({ label, to, activeOnlyWhenExact, handler }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    const { t, i18n } = useTranslation();

    return (
        <div className={match ? "nav-link active" : "nav-link"} onClick={handler}>
            <Link to={to}>{t(label)}</Link>
        </div>
    );
}