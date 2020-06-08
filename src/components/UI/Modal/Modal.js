import React, {Component} from 'react';

import MaterialModal from '@material-ui/core/Modal';
import classes from './Modal.module.css';

class Modal extends Component {

    state = {
        open: false
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({open: nextProps.show});
    }

    closeHandler = () => {
        this.setState({open: false});
    }

    render() {
        return (
            <React.Fragment>
                <MaterialModal
                    onClose={this.props.closeHandler}
                    open={this.state.open}>
                    <div className={classes.ModalContent}>
                        {this.props.children}
                    </div>
                </MaterialModal>
            </React.Fragment>

        )
    }
}

export default Modal;