import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { getSingleQuote } from 'services/quotesService';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Link, useParams } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import AddComment from 'pages/comments/AddComment';
import CommentList from 'pages/comments/CommentList';
import { CommentInterface } from 'types/interfaces/comment.interface';

interface Slide extends ReactImageGalleryItem {
    content?: string;
    author?: string;
}

type idparams = {
    id: string;
};
const DetailQuote: React.FC = () => {
    const { id } = useParams<idparams>();
    const [quote, setQuote] = useState<QuoteInterface[] | any>([]);
    const [fontSize, setFontSize] = useState('20px');
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [quoteId, setQuoteId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getSingleQuote(id as any);
                setQuote(data.realData);
                setQuoteId(data.realData._id);
                setComments(data.realData.comments);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    useEffect(() => {
        if (quote.content) {
            const words = quote.content.split(' ').length;
            if (words < 10) {
                setFontSize('2.8vw');
            } else if (words >= 10 && words <= 15) {
                setFontSize('2.5vw');
            } else if (words >= 15 && words <= 25) {
                setFontSize('3vw');
            } else if (words >= 25 && words <= 35) {
                setFontSize('2vw');
            } else if (words >= 35 && words <= 40) {
                setFontSize('1.7vw');
            } else if (words >= 40 && words <= 50) {
                setFontSize('1.5vw');
            }
        }
    }, [quote.content]);
    const handleCommentAdded = (comment: CommentInterface) => {
        setComments([comment, ...comments]); // Add the newly added comment to the comments state
    };
    const slides: Slide[] = [
        {
            original: 'https://picsum.photos/id/1052/1000/600/',
            originalAlt: 'Slide 1',
            thumbnail: 'https://picsum.photos/id/1052/250/150/',
            thumbnailAlt: 'Slide 1',
            content: quote.content,
            author: quote.author,
        },
        {
            original: 'https://picsum.photos/id/1053/1000/600/',
            originalAlt: 'Slide 1',
            thumbnail: 'https://picsum.photos/id/1053/250/150/',
            thumbnailAlt: 'Slide 1',
            content: quote.content,
            author: quote.author,
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            originalAlt: 'Slide 2',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            thumbnailAlt: 'Slide 2',
            content: quote.content,
            author: quote.author,
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            originalAlt: 'Slide 3',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            thumbnailAlt: 'Slide 3',
            content: quote.content,
            author: quote.author,
        },
    ];

    const renderSlide = (slide: Slide) => {
        return (
            <div className="image-gallery-slide-wrapper">
                <div
                    className="image-gallery-image"
                    style={{
                        background: `url(${slide.original}) no-repeat center center / contain`,
                        position: 'relative',
                        maxWidth: '100%',
                        height: '370px',
                    }}
                >
                    <div
                        className="image-gallery-description"
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '35%',
                            color: 'white',
                            textAlign: 'center',
                            padding: '10px',
                        }}
                    >
                        <p style={{ fontSize: fontSize }} className="detail-quote-content">
                            {slide.content}
                        </p>
                        <p style={{ fontSize: fontSize }} className="detail-quote-author">
                            -{slide.author}
                        </p>{' '}
                        {/* <p className="fs-1">.fs-1 text</p> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Container>
            <BreadCrumbs
                data={[
                    {
                        text: 'Quotes',
                        active: true,
                    },
                ]}
            />
            <Row className="mt-5">
                <Col md={9} className="position-relative">
                    <ImageGallery
                        items={slides}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        renderItem={renderSlide}
                    />
                </Col>
                <Col md={3}>
                    <span style={{ marginLeft: '15px', fontWeight: '600', color: 'black', fontSize: '30px' }}>
                        {' '}
                        Quote tags :&nbsp;&nbsp;
                    </span>
                    <span style={{ marginLeft: '1px', fontWeight: '600', color: 'black', fontSize: '30px' }}>
                        {quote.tags?.map((d: any, index: number) => (
                            <Link key={index} to={`/tag/${d.name}`} className="text-secondary">
                                {d.name}
                            </Link>
                        ))}
                    </span>
                </Col>
                <p style={{ fontSize: '35px' }} className="detail-quote-content">
                    &apos; {quote.content}
                </p>
                <p style={{ fontSize: '30px' }} className="detail-quote-author">
                    -{quote.author}
                </p>{' '}
            </Row>
            <AddComment quoteId={quoteId} onCommentAdded={handleCommentAdded} />
            {/* <CommentList comments={quote.comments} /> */}
            <CommentList comments={comments} />
        </Container>
    );
};

export default DetailQuote;
