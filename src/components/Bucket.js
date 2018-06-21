import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { grid } from '../utils/reactStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { toggleAddResourceModal, createResourceAction, createTemporaryResourceAction, addBucketColor } from '../redux/actions';
import { defaultColor } from '../utils/reactStyles';

const styles = theme => {
    let listStyle = {
        padding: grid,
        width: 250,
        height: "75%"
    };
    return {
        draggingOver: {
            ...listStyle,
            background: theme.palette.secondary.dark
        },
        notDraggingOver: {
            ...listStyle
        },
        cardStyle: {
            marginTop: "16px"
        }
    };
};

class Bucket extends Component {
    componentDidMount() {
        let { color } = this.props;

        let colorObj = require(`@material-ui/core/colors/${color}`).default;
        this.props.addBucketColor(color, colorObj);
    }

    createResourceWrapper = (values) => {
        let { createResource, id } = this.props;

        //Needed as workaround to return promise in redux-forms
        return new Promise((resolve, reject) => {
            createResource(id, values.resourceName, resolve, reject);
        }).then(() => {this.props.toggleModal(id)});
    }

    getBackgroundStyle = () => {
        let { colorObj } = this.props;

        //change to use buckets color
        return {
            backgroundColor: `${colorObj[500]}5a`
        }
    }

    render() {
        let { colorObj, name, id, classes, createTempResource } = this.props;

        return (
            <div>
                <Card className={classes.cardStyle} style={this.getBackgroundStyle()}>
                    <CardHeader title={name} 
                    action={
                        <IconButton aria-label="Add Resource" style={{color: colorObj[800]}} onClick={() => createTempResource(id)}>
                            <AddIcon/>
                        </IconButton>
                    }/>
                    <Droppable droppableId={id}>
                        {(provided, snapshot) => (
                            <div 
                                ref={provided.innerRef}
                                className={snapshot.isDraggingOver ? classes.draggingOver : classes.notDraggingOver}>
                                {this.props.children}
                            </div>
                            )}
                    </Droppable>
                </Card>
                {/* <AddResourceModal bucketId={id} createResource={this.createResourceWrapper}/> */}
            </div>
          );
    }
}

const mapStateToProps = (state, ownProps) => {
    let colorObj = state.ui.bucketColorPool[ownProps.color];
    return {
        colorObj: colorObj ? colorObj : defaultColor
    }
}

const mapDispatchToProps = {
    toggleModal: toggleAddResourceModal,
    createResource: createResourceAction,
    createTempResource: createTemporaryResourceAction,
    addBucketColor: addBucketColor
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bucket));