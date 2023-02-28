import React from 'react';
import picture from 'assets/Images/beautiful-girl-reading-book-4k-nt.jpg';
const Home: React.FC = () => {
    return (
        <>
            <img className="girl" style={{ width: '100%', height: '750px' }} src={picture} alt="book" />
            <div className="text-container">
                <h1>Be Yourself </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dolorum eius dolorem ratione illo
                    qui voluptas tempore ipsa quis quibusdam. Tempora, nihil culpa. Veritatis saepe suscipit esse, et
                    obcaecati iure?
                </p>
                <a href="">Check All Quotes</a>
            </div>
        </>
    );
};
export default Home;
