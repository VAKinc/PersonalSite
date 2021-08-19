import React from 'react';
import { useTranslation } from 'react-i18next';

import DotsBackground from './DotsBackground';

import '../../common/page.module.scss';

export default class About extends React.Component {
    render() {
        return (
            <React.Fragment>
                <DotsBackground />
                <AboutMe />
            </React.Fragment>
        );
    }
}

function AboutMe(){
    const { t } = useTranslation();

    return (
        <main id="contentArea">
            <div id="aboutContent">
                <div className="scroll-wrapper">
                    <p>{t('lorem')}</p>
                    <p>{t('lorem')}</p>
                    <p>{t('lorem')}</p>
                    <p>{t('lorem')}</p>
                </div>
            </div>
        </main>
    );
}
