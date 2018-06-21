import React, { Component } from 'react';
import { getBucketsAction, reorderBucketAction, deleteTempResourceAction, 
    moveResourceAction, getResourcesAction, toggleAddResourceModal, createResourceAction } from '../redux/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { move, reorder } from '../utils/dragAndDropUtils';
import Bucket from './Bucket';
import Resource from './Resource';
import AddResourceModal from './AddResourceModal';
import TempResource from './TempResource';

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

    createResourceWrapper = (bucketId, values) => {
        let { createResource } = this.props;

        //Needed as workaround to return promise in redux-forms
        return new Promise((resolve, reject) => {
            createResource(bucketId, values.resourceName, resolve, reject);
        })
        // .then(() => {this.props.toggleModal(bucketId)});
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
        let { buckets, resources, deleteTempResource, colorObjs } = this.props; 
        return (
            <div className="bucket__container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(buckets).map((bucketKey, idx) => {
                        let bucket = buckets[bucketKey];
                        return (
                            <Bucket key={idx} id={bucket.id} name={bucket.name} color={bucket.color}>
                                {
                                    resources && resources[bucket.id] && Object.keys(resources[bucket.id]).map((resourceKey, index) => {
                                        let resource = resources[bucket.id][resourceKey];
                                        let resourceOrigBucket = buckets[resource.originalBucketId];
                                        return (
                                            resourceKey === 'temp' ?
                                            <TempResource key={index} bucketId={bucket.id} 
                                                onSubmit={(values) => {return this.createResourceWrapper(bucket.id, values)}}
                                                deleteTempResource={() => {deleteTempResource(bucket.id)}}
                                                colorObj={colorObjs[bucket.color]}
                                            />
                                            :
                                            <Resource key={index} name={resource.name} index={index} id={resource.id} 
                                                colorObj={colorObjs[resourceOrigBucket.color]}/>
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
        resources: state.resources,
        colorObjs: state.ui.bucketColorPool
    }
}

const mapDispatchToProps = {
    getBuckets: getBucketsAction,
    reorderBucket: reorderBucketAction,
    moveResource: moveResourceAction,
    getResources: getResourcesAction,
    createResource: createResourceAction,
    deleteTempResource: deleteTempResourceAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer);