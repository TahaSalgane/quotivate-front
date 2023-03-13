import React, { useEffect, useState } from 'react';
// import Data from 'assets/Categories.json';
import { Container, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import CateogieInterface from 'types/interfaces/categorie.interface';
import { getQuotes } from 'services/quotesService';
import { getCategoris } from 'services/categoriesService';
import BreadCrumbs from 'components/ui/breadCrumbs';
import { Quote } from 'pages/Quote';
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
                        <Quote key={quote._id} data={quote} quotes={quotes} setQuotes={setQuotes} />
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
