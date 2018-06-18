import React, { Component } from 'react';
import { getBucketsAction } from '../redux/actions';
import { connect } from 'react-redux';
import Bucket from './Bucket';

class BucketContainer extends Component {
    componentDidMount() {
        this.props.getBuckets();
    }

    render() { 
        return (
            <div className="bucket__container">
                {this.props.buckets.map((bucket, idx) => 
                    <Bucket key={idx} name={bucket.name} color={idx}/>
                )}
            </div>
          );
    }
}
 
const mapStateToProps = state => {
    return {
        buckets: state.buckets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBuckets: () => {dispatch(getBucketsAction())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer);