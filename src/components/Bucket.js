import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { grid } from '../utils/reactStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import { CardActionWrapper } from './CardActionWrapper';
import { connect } from 'react-redux';
import { toggleAddResourceModal, createResourceAction, createTemporaryResourceAction, addBucketColor, deleteBucketAction } from '../redux/actions';
import { defaultColor } from '../utils/reactStyles';
import { getOtherResources } from '../utils/bucketsUtil';

const styles = theme => {
    let listStyle = {
        padding: grid,
        width: 250,
        height: "75%"
    };
    return {
        listStyle,
        cardStyle: {
            marginTop: "16px"
        }
    };
};

class Bucket extends Component {
    componentDidMount() {
        let { color } = this.props;

        if (color) {
            let colorObj = require(`@material-ui/core/colors/${color}`).default;
            this.props.addBucketColor(color, colorObj);
        }
    }

    createResourceWrapper = (values) => {
        let { createResource, id } = this.props;

        //Needed as workaround to return promise in redux-forms
        return new Promise((resolve, reject) => {
            createResource(id, values.resourceName, resolve, reject);
        }).then(() => {this.props.toggleModal(id)});
    }

    getResourcesToDel = () => {
        let { resources, id } = this.props;
        return getOtherResources(resources, id);
    }

    getBackgroundStyle = () => {
        let { colorObj } = this.props;

        //change to use buckets color
        return {
            backgroundColor: `${colorObj[500]}5a`
        }
    }

    getDroppableStyle = (isDraggingOver) => {
        let { colorObj } = this.props;
        let initStyle = {
            minHeight: '80px'
        }

        if (isDraggingOver) {
            initStyle.background = colorObj[900];
        }
        return initStyle;
    }

    render() {
        let { colorObj, name, id, classes, createTempResource, deleteBucket, tripId, includeActions } = this.props;

        return (
            <div>
                <Card className={classes.cardStyle} style={this.getBackgroundStyle()}>
                    <CardHeader title={name}
                    action={
                        includeActions ? 
                        <CardActionWrapper colorObj={colorObj} deleteBucket={deleteBucket} tripId={tripId} id={id}
                            createTempResource={createTempResource} getResourcesToDel={this.getResourcesToDel}/>
                        : null
                    }/>
                    <Droppable droppableId={id}>
                        {(provided, snapshot) => (
                            <div 
                                ref={provided.innerRef}
                                className={classes.listStyle}
                                style={this.getDroppableStyle(snapshot.isDraggingOver)}>
                                {this.props.children}
                            </div>
                            )}
                    </Droppable>
                </Card>
            </div>
          );
    }
}

const mapStateToProps = (state, ownProps) => {
    let colorObj = state.ui.bucketColorPool[ownProps.color];
    return {
        colorObj: colorObj ? colorObj : defaultColor,
        resources: state.resources
    }
}

const mapDispatchToProps = {
    toggleModal: toggleAddResourceModal,
    createResource: createResourceAction,
    createTempResource: createTemporaryResourceAction,
    addBucketColor: addBucketColor,
    deleteBucket: deleteBucketAction
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bucket));