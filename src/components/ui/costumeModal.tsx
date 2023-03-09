import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

type ModalProps = {
    show: boolean;
    handleClose: () => void;
    handleAction: () => void;
    title: string;
    children: React.ReactNode | string;
};

const CustomModal: FC<ModalProps> = ({ show, handleClose, handleAction, title, children }) => {
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
                <Button variant="danger" onClick={handleAction}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
