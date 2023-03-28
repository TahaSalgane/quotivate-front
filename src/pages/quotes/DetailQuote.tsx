import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { getSingleQuote } from 'services/quotesService';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Link, useParams } from 'react-router-dom';
import QuoteInterface from 'types/quote.interface';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import AddComment from 'pages/comments/AddComment';
import CommentList from 'pages/comments/CommentList';

interface Slide extends ReactImageGalleryItem {
    content?: string;
    author?: string;
}

type idparams = {
    id: string;
};
const DetailQuote: React.FC = () => {
    const { id } = useParams<idparams>();
    const [quote, setQuote] = useState<QuoteInterface[]>([]);
    const [fontSize, setFontSize] = useState('20px');

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getSingleQuote(id as any);
                setQuote(data.realData);
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
                setFontSize('3.3vw');
                console.log(quote.tags[0].name);
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
                    <span style={{ marginLeft: '15px', color: '#999999', fontSize: '14px' }}>
                        tags :&nbsp;&nbsp;
                        {quote.tags?.map((d: any, index: number) => (
                            <Link key={index} to={`/tag/${d.name}`} className="text-secondary">
                                {d.name}
                            </Link>
                        ))}
                    </span>
                    <Row>fzf</Row>
                </Col>
                <p style={{ fontSize: fontSize }} className="detail-quote-content">
                    &apos; {quote.content}
                </p>
                <p style={{ fontSize: fontSize }} className="detail-quote-author">
                    -{quote.author}
                </p>{' '}
            </Row>
            <AddComment comments={quote.comments!} quoteId={quote?._id} />
            {/* <CommentList comments={quote.comments} /> */}
            <CommentList comments={[{ _id: '1' }]} />
        </Container>
    );
};

export default DetailQuote;
