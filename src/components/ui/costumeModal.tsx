import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

type ModalProps = {
    show: boolean;
    handleClose: () => void;
    handleAction?: () => void;
    title: string;
    btnText?: string;
    variant?: string;
    children: React.ReactNode | string;
};

const CustomModal: FC<ModalProps> = ({ show, handleClose, handleAction, title, children, variant, btnText }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {typeof handleAction !== 'undefined' && (
                    <Button variant={variant} onClick={handleAction}>
                        {btnText}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

CustomModal.defaultProps = {
    variant: 'info',
    btnText: 'Save',
};

export default CustomModal;
