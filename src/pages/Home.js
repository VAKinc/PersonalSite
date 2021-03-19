import React from 'react';

import Background from '../widgets/Background';

export default class Home extends React.Component {
    componentDidMount(){
        //TODO: Animation for when page mounts
    }
    
    render() {
        return (
            <React.Fragment>
                <Background />
                {/* <div id="contentArea">
                </div> */}
            </React.Fragment>
        );
    }
}
