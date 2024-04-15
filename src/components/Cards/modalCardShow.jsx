import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalCard = ({ show, onHide, cardUrl }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Detalle de la carta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                <img src={cardUrl} alt="Carta" width={300} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCard;
