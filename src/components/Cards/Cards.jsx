import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import  ModalCard  from "./modalCardShow";
import SearchComp from './SearchComp';
import { Alert } from 'react-bootstrap';
export const CardComp = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [selectedCardUrl, setSelectedCardUrl] = useState(null); // Estado para almacenar la URL de la carta seleccionada

    useEffect(() => {
        fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&limit=5')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCards(data.data.slice(0, 5));
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const openModal = (cardUrl) => {
        setSelectedCardUrl(cardUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedCardUrl(null);
        setShowModal(false);
    };

    const deleteButton = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    }
    
    return (
        
        <>
            <Card>
                <Card.Header>
                    <h3>Cartas Baneadas de TCG</h3>
                </Card.Header>
                <SearchComp cards={cards} setCards={setCards} />
                <Card.Body>
                    {loading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    {
                        cards.error ?(
                            <Alert variant="warning">
                                No se encontraron cartas que coincidan con la busqueda
                            </Alert>
                            ):(
                                cards.map((card) => (
                                    <Card key={card.id} className="mx-4 mb-2 bg-light shadow-sm ">
                                        <Card.Header>
                                            <h6 className="text-center">{card.name}</h6>
                                        </Card.Header>
                                        <Card.Body>
                                            <p>Type: {card.type}</p>
                                            <p>Description: {card.desc}</p>
                                            {card.type.includes("Monster") && (
                                                <>
                                                    <p>Atk: {card.atk}</p>
                                                    <p>Def: {card.def}</p>
                                                </>
                                            )}
                                            <Button className='mx-1' 
                                            variant="primary btn-sm" 
                                            onClick={() => openModal(card.card_images[0].image_url)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                </svg>
                                            </Button>
                                            <Button variant="danger btn-sm" onClick={() => deleteButton(card.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            
                        )
                    }
                </Card.Body>
            </Card>

            {/* Componente de modal */}
            <ModalCard show={showModal} onHide={closeModal} cardUrl={selectedCardUrl} />
        </>
    );
};
