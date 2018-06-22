import React from 'react';
import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
      let { show, title, onClose } = this.props;
    // Render nothing if the "show" prop is false
    if(!show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 999
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      margin: '0 auto',
      transform: `translate(0%, 100%)`,
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle} onClick={onClose}>
        <div className="modal" style={modalStyle} onClick={event => event.stopPropagation()}>
            <Typography variant="title">{title}</Typography>
          {this.props.children}

          {/* <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };

export default Modal;