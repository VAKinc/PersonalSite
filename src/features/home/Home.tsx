import React, { useEffect } from 'react';

import BarsBackground from './BarsBackground';
import NameCard from './NameCard';

import './home.module.scss';

const Home: React.FC = () => {
    useEffect(() => {
        //TODO: Page load animation
    }, [])

    return (
        <React.Fragment>
            <BarsBackground />
            <NameCard />
        </React.Fragment>
    );
}

export default Home