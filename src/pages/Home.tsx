import React, { useEffect, useState } from 'react';
// import Data from 'assets/tag.json';
import { Container, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import CateogieInterface from 'types/interfaces/tag.interface';
import { getQuotes, getLatestQuotes } from 'services/quotesService';
import { getTags } from 'services/tagsService';
import BreadCrumbs from 'components/ui/breadCrumbs';
import { Quote } from 'pages/Quote';
const Home: React.FC = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [quoteHeader, setQuoteHeader] = useState<string>('');
    const [tag, setTag] = useState<CateogieInterface[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                setQuoteHeader('Populaire Quotes');
                const { data } = await getQuotes();
                setQuotes(data);
                console.log(quotes);
                const res = await getTags();
                setTag(res.data);
                console.log(tag);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const latestQuotes = async () => {
        try {
            setQuoteHeader('Latest Quotes');
            const { data } = await getLatestQuotes();
            setQuotes(data);
            console.log(quotes);
        } catch (error) {
            console.log(error);
        }
    };
    const PopulaireQuotes = async () => {
        try {
            setQuoteHeader('Populaire Quotes');
            const { data } = await getQuotes();
            setQuotes(data);
            console.log(quotes);
        } catch (error) {
            console.log(error);
        }
    };
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
                    <h1>{quoteHeader}</h1>
                    <button onClick={PopulaireQuotes}>
                        <h4>Populaire Quotes</h4>
                    </button>{' '}
                    <button onClick={latestQuotes}>
                        <h4>Latest Quotes</h4>
                    </button>
                    {quotes.map((quote) => (
                        <Quote key={quote._id} data={quote} quotes={quotes} setQuotes={setQuotes} />
                    ))}
                </Col>
                <Col md={4}>
                    <h3>tag:</h3>
                    <Row>
                        <Col md={6}>
                            {[...tag].splice(0, Math.ceil(tag.length / 2)).map((tag) => (
                                <Link to="tag.id" key={tag._id}>
                                    {tag.name} <br />
                                </Link>
                            ))}
                        </Col>
                        <Col md={6}>
                            {/* {Data.tag.map((tag: any) => ( */}
                            {[...tag].splice(-Math.ceil(tag.length / 2)).map((tag) => (
                                <Link to={`$tag.id}`} key={tag._id}>
                                    {tag.name} <br />
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
