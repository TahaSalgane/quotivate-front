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
    const [activeButton, setActiveButton] = useState<string>('populaire');
    const [searchTag, setSearchTag] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            try {
                setQuoteHeader('Populaire Quotes');
                const { data } = await getQuotes(1);
                setQuotes(data.realData);
                const res = await getTags();
                setTag(res.data.realData);
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
            console.log(pageNumber);
        };
        fetchQuotes();
    };
    const latestQuotes = async () => {
        try {
            setQuoteHeader('Latest Quotes');
            const { data } = await getLatestQuotes(1);
            setQuotes(data.realData);
            setPageNumber(1);
            setActiveButton('latest');
        } catch (error) {
            console.log(error);
        }
    };
    const PopulaireQuotes = async () => {
        try {
            setQuoteHeader('Populaire Quotes');
            const { data } = await getQuotes(pageNumber);
            setQuotes(data.realData);
            setActiveButton('populaire');
        } catch (error) {
            console.log(error);
        }
    };
    const filteredTags = tag.filter((tags: any) => {
        return tags.name.toLocaleLowerCase().includes(searchTag);
    });
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
                    <button
                        className={`home-buttons button ${activeButton === 'populaire' ? 'active' : ''}`}
                        onClick={PopulaireQuotes}
                    >
                        <h4>Populaire Quotes</h4>
                    </button>{' '}
                    <button
                        className={`mt-4 mb-3 home-buttons button ${activeButton === 'latest' ? 'active' : ''}`}
                        onClick={latestQuotes}
                    >
                        <h4>Latest Quotes</h4>
                    </button>
                    <InfiniteScroll
                        dataLength={quotes.length}
                        next={fetchData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        {quotes.map((quote: any, i: number) => (
                            <Quote key={i} data={quote} quotes={quotes} setQuotes={setQuotes} />
                        ))}
                    </InfiniteScroll>
                </Col>
                <Col md={4} style={{ position: 'sticky', top: '10%', height: '100%' }}>
                    <h3>tags:</h3>
                    <input
                        type="text"
                        placeholder="search for a tag"
                        className="w-75"
                        onChange={(e) => {
                            const searchField = e.target.value.toLocaleLowerCase();
                            setSearchTag(searchField);
                        }}
                    />
                    <Row>
                        <Col md={6}>
                            {[...filteredTags].splice(0, Math.ceil(tag.length / 2)).map((tag) => (
                                <Link to={`/tag/${tag.name}`} key={tag._id}>
                                    {tag.name} <br />
                                </Link>
                            ))}
                        </Col>
                        <Col md={6}>
                            {/* {Data.tag.map((tag: any) => ( */}
                            {[...filteredTags].splice(-Math.ceil(tag.length / 2)).map((tag: any) => (
                                <Link to={`/tag/${tag.name}`} key={tag._id}>
                                    {tag.name} {tag.length}
                                    <br />
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
