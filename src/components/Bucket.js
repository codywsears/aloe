import React, { Component } from 'react';

class Bucket extends Component {
    render() {
        let { color, name } = this.props;
        
        let css = `bucket__name--container bucket__backgroundcolor--${color}`;

        return (
            <div className={css}>
                <div className="bucket__name">{name}</div>
                {this.children}
            </div>
          );
    }
}
 
export default Bucket;