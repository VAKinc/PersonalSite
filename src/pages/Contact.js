import React from 'react';

import * as trans from '../utils/TranslationFunctions';

export default class Contact extends React.Component {
    render() {
        return (
            <h1>{trans.getTranslation('contact')}</h1>
        );
    }
}
