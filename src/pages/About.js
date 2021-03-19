import React from 'react';

import * as trans from '../utils/TranslationFunctions';

import '../scss/page.scss';

export default class About extends React.Component {
    render() {
        return (
            <div id="contentArea">
                <h1>{trans.getTranslation('about')}</h1>
            </div>
        );
    }
}
