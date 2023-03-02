import React from 'react';
import Card from 'react-bootstrap/Card';
import Data from 'assets/Categories.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faQuoteLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={8}>
                    <h4>Populaire Quotes</h4>
                    {Data.Quotes.map((quote: any) => (
                        <Card key={quote.id} text="white" style={{ width: '90%' }} className="mb-2 bg-dark">
                            <Card.Body>
                                <FontAwesomeIcon icon={faQuoteLeft} />
                                <Card.Text>{quote.content}</Card.Text>
                                <Row>
                                    <Col md={10}>
                                        <div className="Author">-{quote.author}</div>
                                    </Col>
                                    <Col md={2}>
                                        <span>{quote.nbrlike}</span> <FontAwesomeIcon icon={faHeart} />
                                        <span className="m-2"> {quote.nbrcomment}</span>
                                        <Link to={`/quote/{quote.id}`}>
                                            <FontAwesomeIcon icon={faComment} className="text-white" />
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <span style={{ marginLeft: '15px', color: '#999999', fontSize: '14px' }}>
                                tags :&nbsp;&nbsp;
                                <Link to={quote.categorie} className=" text-secondary">
                                    {quote.categorie}
                                </Link>
                            </span>
                        </Card>
                    ))}
                </Col>
                <Col md={4}>
                    <h3>Categories:</h3>
                    <Row>
                        <Col md={6}>
                            {[...Data.categories]
                                .splice(0, Math.ceil(Data.categories.length / 2))
                                .map((categorie: any) => (
                                    <Link to="gfbd" key={categorie.id}>
                                        {categorie.name} <br />
                                    </Link>
                                ))}
                        </Col>
                        <Col md={6}>
                            {/* {Data.categories.map((categorie: any) => ( */}
                            {[...Data.categories]
                                .splice(-Math.ceil(Data.categories.length / 2))
                                .map((categorie: any) => (
                                    <Link to="gfbd" key={categorie.id}>
                                        {categorie.name} <br />
                                    </Link>
                                ))}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
