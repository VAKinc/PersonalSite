import React from 'react';
import { withRouter } from "react-router";
import {
    Link,
    useRouteMatch,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { PAGES } from '../utils/constants/pages.js';
import './navmenu-pc.module.scss';

class NavMenuPC extends React.Component {
    render() {
        // const isTopPage = this.props.location.pathname != "/" ? true : false;
        let returnButton;

        returnButton = <li><NavMenuLink to="/" label={'nav.home'} activeOnlyWhenExact={true} handler={this.handleLinkClick} /></li>;

        return (
            <React.Fragment>
                <nav id="navMenuPC" className="">
                    <LanguageSelector />
                    <ul>
                        {returnButton}
                        {Object.keys(PAGES).map((el, i) => {
                            return (
                                <li key={i}>
                                    <NavMenuLink to={"/" + el} label={`nav.${el}`} handler={this.handleLinkClick} />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default withRouter(NavMenuPC);

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

function LanguageSelector(){

    const { t, i18n } = useTranslation();
    const cur_lang = i18n.language;
    const langHandler = (lang) => { i18n.changeLanguage(lang) };
    
    return (
        <div id="languageSelector">
            <button className={ cur_lang === 'jp' ? "lang-button active" : "lang-button" } onClick={ () => langHandler('jp') }>JP</button>|
            <button className={ cur_lang === 'en' ? "lang-button active" : "lang-button" } onClick={ () => langHandler('en') }>EN</button>
        </div>
    );
}