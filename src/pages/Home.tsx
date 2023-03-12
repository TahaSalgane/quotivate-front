import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
// import Data from 'assets/Categories.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faQuoteLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import CateogieInterface from 'types/interfaces/categorie.interface';
import { getQuotes } from 'services/quotesService';
import { getCategoris } from 'services/categoriesService';
import BreadCrumbs from 'components/ui/breadCrumbs';

const Home: React.FC = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [categories, setCategories] = useState<CateogieInterface[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getQuotes();
                setQuotes(data);
                console.log(quotes);
                const res = await getCategoris();
                setCategories(res.data);
                console.log(categories);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    return (
        <Container>
            <BreadCrumbs
                data={[
                    {
                        text: 'Home',
                        active: true,
                    },
                ]}
            />
            <Row className="mt-5">
                <Col md={8}>
                    <h4>Populadire Quotes</h4>
                    {quotes.map((quote) => (
                        <Card key={quote._id} text="white" style={{ width: '90%' }} className="mb-2 bg-dark">
                            <Card.Body>
                                <FontAwesomeIcon icon={faQuoteLeft} className="fa-xs" />
                                <Card.Text>{quote.content}</Card.Text>
                                <Row>
                                    <Col md={10}>
                                        <div className="Author">-{quote.author}</div>
                                    </Col>
                                    <Col md={2}>
                                        <span>{quote.likes?.length}</span> <FontAwesomeIcon icon={faHeart} />
                                        <span className="m-2"> 1</span>
                                        <Link to={`/quote/{quote.id}`}>
                                            <FontAwesomeIcon icon={faComment} className="text-white" />
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <span style={{ marginLeft: '15px', color: '#999999', fontSize: '14px' }}>
                                tags :&nbsp;&nbsp;
                                {quote.tags.map((d: any, index) => (
                                    <Link key={index} to={`/tag/${d.name}`} className="text-secondary">
                                        {d.name}
                                    </Link>
                                ))}
                            </span>
                        </Card>
                    ))}
                </Col>
                <Col md={4}>
                    <h3>Categories:</h3>
                    <Row>
                        <Col md={6}>
                            {[...categories].splice(0, Math.ceil(categories.length / 2)).map((categorie) => (
                                <Link to="categorie.id" key={categorie._id}>
                                    {categorie.name} <br />
                                </Link>
                            ))}
                        </Col>
                        <Col md={6}>
                            {/* {Data.categories.map((categorie: any) => ( */}
                            {[...categories].splice(-Math.ceil(categories.length / 2)).map((categorie) => (
                                <Link to={`$categorie.id}`} key={categorie._id}>
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
