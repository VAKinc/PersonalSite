import React from 'react';

import * as trans from '../utils/TranslationFunctions';

export default class Skills extends React.Component {
    render() {
        return (
            <h1>{trans.getTranslation('skills')}</h1>
        );
    }
}
