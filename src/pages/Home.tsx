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
import Autosuggest from 'react-autosuggest';

const Home: React.FC = () => {
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [quoteHeader, setQuoteHeader] = useState<string>('');
    const [tag, setTag] = useState<CateogieInterface[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(2);
    const [activeButton, setActiveButton] = useState<string>('populaire');
    const [searchTag, setSearchTag] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<QuoteInterface[]>([]);
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

    const getSuggestions = (value: string): QuoteInterface[] => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : quotes.filter(
                  (quote: QuoteInterface) => quote.content.toLowerCase().slice(0, inputLength) === inputValue,
              );
    };

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion: QuoteInterface): string => suggestion.content;
    // <Link to={`/Quotes/details/{suggestion._id}`}>{suggestion.content}</Link>;
    const renderSuggestion = (suggestion: QuoteInterface): JSX.Element => (
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/Quotes/details/${suggestion._id}`}>
            <div className="custom-suggestion">{suggestion.content}</div>
        </Link>
    );

    const onChange = (_: React.FormEvent<HTMLInputElement>, { newValue }: any) => {
        setInputValue(newValue);
    };

    const inputProps = {
        placeholder: 'Search for quote',
        value: inputValue,
        className: 'react-autosuggest__input',
        onChange,
    };
    return (
        <Container className="search-container">
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
                    <div className="search-container">
                        <i className="fas fa-search"></i>

                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            // theme={{
                            //     suggestionsContainer: 'react-autosuggest__suggestions-container',
                            //     suggestionsList: 'react-autosuggest__suggestions-list',
                            // }}
                            className="react-autosuggest__container"
                            suggestionsContainerClassName="react-autosuggest__suggestions-container"
                            suggestionClassName="react-autosuggest__suggestion"
                            suggestionHighlightedClassName="react-autosuggest__suggestion--highlighted"
                        />
                    </div>
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
                <Col md={4} style={{ position: 'sticky', top: '10%', height: '100%', paddingLeft: '10%' }}>
                    <h3>tags:</h3>
                    <input
                        type="text"
                        placeholder="search for a tag"
                        className="w-100 mb-2"
                        onChange={(e) => {
                            const searchField = e.target.value.toLocaleLowerCase();
                            setSearchTag(searchField);
                        }}
                    />
                    <Row>
                        <Col md={6}>
                            {[...filteredTags].splice(0, Math.ceil(tag.length / 2)).map((tag) => (
                                <Link className="link-tag" to={`/tag/${tag.name}`} key={tag._id}>
                                    #{tag.name} <br />
                                </Link>
                            ))}
                        </Col>
                        <Col md={6}>
                            {/* {Data.tag.map((tag: any) => ( */}
                            {[...filteredTags].splice(-Math.ceil(tag.length / 2)).map((tag: any) => (
                                <Link className="link-tag" to={`/tag/${tag.name}`} key={tag._id}>
                                    <span style={{ textDecoration: 'none' }}>#{tag.name}</span>
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
