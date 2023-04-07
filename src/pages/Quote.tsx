import React from 'react';
import { Row, Col } from 'react-bootstrap/';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'classnames';
import { toast } from 'react-toastify';

import { faHeart, faQuoteLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import QuoteInterface from 'types/interfaces/quote.interface';
import { toggleLike } from 'services/quotesService';
import useUserStore, { StoreStateInterface } from 'store/userStore';

type props = {
    data: QuoteInterface;
    quotes: QuoteInterface[];
    setQuotes: (item: QuoteInterface[]) => void;
};
export const Quote: React.FC<props> = ({ data, quotes, setQuotes }: props) => {
    const user = useUserStore((state: StoreStateInterface) => state.user);
    const iLikedIt = data.likes?.map((item: any) => item._id).includes(user?._id!);
    const navigation = useNavigate();
    const toggleLikeClick = async (id: string) => {
        try {
            const {
                data: { realData },
            } = await toggleLike(id);
            const index = quotes.findIndex((item: QuoteInterface) => item._id.toString() === id.toString());
            const listUpdate = [...quotes];
            listUpdate[index] = realData;
            setQuotes(listUpdate);
        } catch (Exception) {
            navigation('login');
            toast.error('Please Log in');
        }
    };
    return (
        <>
            <Card style={{ width: '90%' }} className="mb-2 testing">
                <Card.Body>
                    <FontAwesomeIcon icon={faQuoteLeft} className="fa-xs" />
                    <Card.Text>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/Quotes/details/${data._id}`}>
                            {data.content}
                        </Link>
                    </Card.Text>
                    <Row>
                        <Col md={10}>
                            <div className="Author">-{data.author}</div>
                        </Col>
                        <Col md={2}>
                            <span>{data.likes?.length}</span>
                            <FontAwesomeIcon
                                style={{ cursor: 'pointer' }}
                                className={clsx({
                                    'text-danger': iLikedIt,
                                    'text-black': !iLikedIt,
                                })}
                                onClick={() => toggleLikeClick(data._id)}
                                icon={faHeart}
                            />
                            <span className="m-2"> {data.likes?.length}</span>
                            <Link to={`/Quotes/details/${data._id}`}>
                                <FontAwesomeIcon icon={faComment} className="text-black" />
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
                <span style={{ marginLeft: '15px', color: '#999999', fontSize: '14px' }}>
                    tags :&nbsp;&nbsp;
                    {data.tags.map((d: any, index: number) => (
                        <Link key={index} to={`/tag/${d.name}`} className="text-secondary">
                            {d.name}
                        </Link>
                    ))}
                </span>
            </Card>
        </>
    );
};
