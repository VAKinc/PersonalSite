import React from 'react';
import { useTranslation } from 'react-i18next'

import BarsBackground from './BarsBackground';

import './home.module.scss';

export default class Home extends React.Component {
    componentDidMount() {
        //TODO: Animation for when page mounts
    }

    render() {
        return (
            <React.Fragment>
                <BarsBackground />
                <HelloMyNameIs />
            </React.Fragment>
        );
    }
}

function HelloMyNameIs() {

    const { t } = useTranslation();
    
    return (
       <div id="nameCard">
           <span>{t('namecard.greeting')}</span>
           <h1>{t('namecard.name')}</h1>
           <span className="subheader">{t('namecard.introduction')}</span>
       </div>
    );
}
