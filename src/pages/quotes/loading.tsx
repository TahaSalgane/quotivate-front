import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageData from './ImageData';

const Gallery = () => {
    const renderItem = (item: ReactImageGalleryItem | any) => {
        return (
            <div className="image-gallery-custom">
                <img src={item.original} alt={item.originalAlt} />
                {item.description && <span className="image-gallery-description">{item.description}</span>}
                {item.text && <div className="image-gallery-text">{item.text}</div>}
                <button onClick={() => downloadImage(item.original)}>Download</button>
            </div>
        );
    };

    const downloadImage = (url: string) => {
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.jpg');
                document.body.appendChild(link);
                link.click();
            });
    };

    return (
        <div className="gallery-container">
            <ImageGallery items={ImageData} renderItem={renderItem} />
        </div>
    );
};

export default Gallery;
