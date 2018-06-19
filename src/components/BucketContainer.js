import React, { Component } from 'react';
import { getBucketsAction, reorderBucketAction, moveResourceAction } from '../redux/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Bucket from './Bucket';
import Resource from './Resource';

class BucketContainer extends Component {
    componentDidMount() {
        this.props.getBuckets();
    }

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            this.props.reorderBucket(source.droppableId, source.index, destination.index);
        } else {
            this.props.moveResource(source.droppableId, destination.droppableId, source.index, destination.index);
        }
    };

    render() {
        let { buckets } = this.props; 
        return (
            <div className="bucket__container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(buckets).map((bucketKey, idx) => {
                        let bucket = buckets[bucketKey];
                        return (
                            <Bucket key={idx} id={bucket.id} name={bucket.name} color={idx}>
                                {
                                    Object.keys(bucket.resources).map((resourceKey, index) => {
                                        let resource = bucket.resources[resourceKey];
                                        return (
                                            <Resource key={index} name={resource.name} index={index} id={resource.id}/>
                                        );
                                    }
                                )}
                            </Bucket>
                        )}
                    )}
                </DragDropContext>
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
        getBuckets: () => {dispatch(getBucketsAction())},
        reorderBucket: (bucketId, sourceIdx, destIdx) => {dispatch(reorderBucketAction(bucketId, sourceIdx, destIdx))},
        moveResource: (srcBucketId, destBucketId, sourceIdx, destIdx) => 
            {dispatch(moveResourceAction(srcBucketId, destBucketId, sourceIdx, destIdx))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer);