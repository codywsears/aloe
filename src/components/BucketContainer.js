import React, { Component } from 'react';
import { getBucketsAction } from '../redux/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { reorder, move } from '../utils/dragAndDropUtils';
import Bucket from './Bucket';
import Resource from './Resource';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        name: `item ${k + offset}`
    }));

class BucketContainer extends Component {
    state = {
        bucket1: getItems(10),
        bucket2: getItems(5, 10)
    };

    // /**
    //  * A semi-generic way to handle multiple lists. Matches
    //  * the IDs of the droppable container to the names of the
    //  * source arrays stored in the state.
    //  */
    // id2List = {
    //     droppable: 'items',
    //     droppable2: 'selected'
    // };

    // getList = id => this.state[this.id2List[id]];

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
            const items = reorder(
                this.state[source.droppableId],
                source.index,
                destination.index
            );

            let state = { bucket1: items };

            if (source.droppableId === 'bucket2') {
                state = { bucket2: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.state[source.droppableId],
                this.state[destination.droppableId],
                source,
                destination
            );

            this.setState({
                bucket1: result.bucket1,
                bucket2: result.bucket2
            });
        }
    };

    render() { 
        return (
            <div className="bucket__container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.props.buckets.map((bucket, idx) => 
                        <Bucket key={idx} name={bucket.name} color={idx}>
                            {
                                this.state[bucket.name].map((resource, index) => 
                                    <Resource key={index} name={resource.name} index={index} id={resource.id}/>
                                )
                            }
                        </Bucket>
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
        getBuckets: () => {dispatch(getBucketsAction())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketContainer);