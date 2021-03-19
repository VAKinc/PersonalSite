import React from 'react';

import BarsBackground from '../widgets/BarsBackground';

export default class Home extends React.Component {
    componentDidMount(){
        //TODO: Animation for when page mounts
    }
    
    render() {
        return (
            <React.Fragment>
                <BarsBackground />
                {/* <div id="contentArea">
                </div> */}
            </React.Fragment>
        );
    }
}
