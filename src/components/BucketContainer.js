import React, { Component } from 'react';
import { getBucketsAction, reorderBucketAction, moveResourceAction, getResourcesAction } from '../redux/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { move, reorder } from '../utils/dragAndDropUtils';
import Bucket from './Bucket';
import Resource from './Resource';

class BucketContainer extends Component {
    state = {
        resourcesInitialized: false
    }

    componentDidMount() {
        this.props.getBuckets(this.props.tripId);
    }

    componentDidUpdate() {
        let { buckets } = this.props;
        if (!this.state.resourcesInitialized && buckets && Object.keys(buckets).length > 0) {
            Object.keys(buckets).forEach((bucketId) => {
                this.props.getResources(bucketId);
            });
            this.setState({resourcesInitialized: true})
        }
    }

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let reorderResult = reorder(this.props.resources[source.droppableId], source.index, destination.index);
            this.props.reorderBucket(source.droppableId, reorderResult);
        } else {
            let sourceId = source.droppableId;
            let destId = destination.droppableId;
            let moveResult = move(this.props.resources[source.droppableId], this.props.resources[destination.droppableId], 
                sourceId, destId, source.index, destination.index);
            this.props.moveResource(moveResult, sourceId, destId);
        }
    };

    render() {
        let { buckets, resources } = this.props; 
        return (
            <div className="bucket__container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(buckets).map((bucketKey, idx) => {
                        let bucket = buckets[bucketKey];
                        return (
                            <Bucket key={idx} id={bucket.id} name={bucket.name} color={idx}>
                                {
                                    resources && resources[bucket.id] && Object.keys(resources[bucket.id]).map((resourceKey, index) => {
                                        let resource = resources[bucket.id][resourceKey];
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
        buckets: state.buckets,
        resources: state.resources
    }
}

const mapDispatchToProps = {
    getBuckets: getBucketsAction,
    reorderBucket: reorderBucketAction,
    moveResource: moveResourceAction,
    getResources: getResourcesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer);