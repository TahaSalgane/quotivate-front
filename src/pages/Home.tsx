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
import InfiniteScroll from 'react-infinite-scroll-component';
const Home: React.FC = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [quoteHeader, setQuoteHeader] = useState<string>('');
    const [tag, setTag] = useState<CateogieInterface[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(2);
    const [pageLatestNumber, setPageLatestNumber] = useState<number>(1);
    useEffect(() => {
        const loadData = async () => {
            try {
                setQuoteHeader('Populaire Quotes');
                const { data } = await getQuotes(1);
                console.log(data);
                setQuotes(data.realData);
                console.log(quotes);
                const res = await getTags();
                setTag(res.data.realData);
                console.log(tag);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    const fetchData = () => {
        const fetchQuotes = async () => {
            const { data } = await getQuotes(pageNumber);
            await setPageNumber((prev) => prev + 1);
            setQuotes(quotes.concat(data.realData));
        };
        fetchQuotes();
    };
    const latestQuotes = async () => {
        try {
            setQuoteHeader('Latest Quotes');
            const { data } = await getLatestQuotes(pageLatestNumber);
            setQuotes(data.realData);
            console.log(quotes);
        } catch (error) {
            console.log(error);
        }
    };
    const PopulaireQuotes = async () => {
        try {
            setQuoteHeader('Populaire Quotes');
            const { data } = await getQuotes(pageNumber);
            setQuotes(quotes.concat(data.realData));
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
                    <InfiniteScroll
                        dataLength={quotes.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        {quotes.map((quote: any, i: number) => (
                            <Quote key={i} data={quote} quotes={quotes} setQuotes={setQuotes} />
                        ))}
                    </InfiniteScroll>
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
