import React from 'react';

class Resource extends React.Component {
    render() { 
        let { name } = this.props;
        return (<div className="resource__name">
            <span>{name}</span>
        </div>);
    }
}
 
export default Resource;