import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { getSingleQuote } from 'services/quotesService';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useParams } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

interface Slide extends ReactImageGalleryItem {
    description?: string;
}
const slides: Slide[] = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        originalAlt: 'Slide 1',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        thumbnailAlt: 'Slide 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        originalAlt: 'Slide 2',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        thumbnailAlt: 'Slide 2',
        description: 'Praesent euismod odio ut arcu lobortis, at consectetur nunc vestibulum.',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        originalAlt: 'Slide 3',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        thumbnailAlt: 'Slide 3',
        description: 'Curabitur sed ipsum in augue pulvinar hendrerit.',
    },
];

type idparams = {
    id: string;
};
const DetailQuote: React.FC = () => {
    const { id } = useParams<idparams>();
    const [quote, setQuote] = useState<QuoteInterface[] | any>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getSingleQuote(id as any);
                console.log(data);
                setQuote(data.realData);
            } catch (error) {
                console.log(error);
            }
            console.log(id);
            console.log(getSingleQuote(id as any));
        };
        loadData();
    }, []);

    const renderSlide = (slide: Slide) => {
        return (
            <div className="image-gallery-slide-wrapper">
                <div
                    className="image-gallery-image"
                    style={{
                        background: `url(${slide.original}) no-repeat center center / contain`,
                        position: 'relative',
                    }}
                >
                    <div
                        className="image-gallery-description"
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '20%',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '10px',
                        }}
                    >
                        {slide.description}
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
                        text: 'Home',
                        active: true,
                    },
                ]}
            />
            <Row className="mt-5">
                <Col md={8} className="position-relative">
                    v{' '}
                    <ImageGallery
                        items={slides}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        renderItem={renderSlide}
                    />
                    {/* <ImageGallery
                        items={images}
                        renderItem={(item: any) => (
                            <div className="image-gallery-image">
                                <img src={item.original} alt={item.text} width={1000} height={300} />
                                <div className="parent-text">
                                    <div className="image-gallery-text">{item.text}</div>
                                </div>
                            </div>
                        )}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        lazyLoad
                    /> */}
                </Col>
                <Col md={4}>
                    <h3>tag:{quote.author}</h3>
                    <Row>fzf</Row>
                </Col>
            </Row>
        </Container>
    );
};

export default DetailQuote;
