import BreadCrumbs from 'components/ui/breadCrumbs';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap/';
import { getSingleQuote } from 'services/quotesService';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useParams } from 'react-router-dom';
import QuoteInterface from 'types/interfaces/quote.interface';
import ImageGallery from 'react-image-gallery';

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
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            text: quote.content,
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
            text: quote.content,
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
            text: quote.content,
        },
    ];
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
                    <ImageGallery
                        items={images}
                        renderItem={(item: any) => (
                            <div className="image-gallery-image">
                                <img src={item.original} alt={item.text} width={1000} height={300} />
                                <div className="image-gallery-text">{item.text}</div>
                            </div>
                        )}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        lazyLoad
                    />
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
