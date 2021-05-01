import React from 'react';
import { useTranslation } from 'react-i18next';

import DotsBackground from '../widgets/DotsBackground';

import '../scss/page.scss';

export default class About extends React.Component {
    render() {
        const { t } = this.props;
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
