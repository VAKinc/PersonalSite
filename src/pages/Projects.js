import React from 'react';

import * as trans from '../utils/TranslationFunctions';

export default class Projects extends React.Component {
    render() {
        return (
            <h1>{trans.getTranslation('projects')}</h1>
        );
    }
}
