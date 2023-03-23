import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect, useState } from 'react';
import { Quote } from 'pages/Quote';
import { getQuotesByTag } from 'services/quotesService';
import QuoteInterface from 'types/interfaces/quote.interface';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col } from 'react-bootstrap/';

import { useParams } from 'react-router-dom';
type tagparams = {
    tag: string;
};
const Tag = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { tag } = useParams<tagparams>();
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getQuotesByTag(pageNumber, tag);
                setQuotes(data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, [tag]);
    const fetchData: any = () => {
        const fetchQuotes = async () => {
            const { data } = await getQuotesByTag(pageNumber, tag);
            await setPageNumber((prev) => prev + 1);
            setQuotes(quotes.concat(data.realData));
        };
        fetchQuotes();
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
                    <Row>fzf</Row>
                </Col>
            </Row>
        </Container>
    );
};
export default Tag;
