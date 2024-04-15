import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";

export const SearchComp = ({cards,setCards}) => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const searchCard = () => {
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${search}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCards(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <>
            <Card className="mt-3 mx-5">
                <Card.Header>
                    <h6>Buscador de cartas</h6>
                </Card.Header>
                <Card.Body>
                    <input type="text" 
                    placeholder="Buscar carta"
                    className="form-control mb-2" 
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    />
                    <Button variant="primary"
                    onClick={()=>searchCard()}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                  </Button>
                </Card.Body>
            </Card>             
        </>
    )
};

export default SearchComp;