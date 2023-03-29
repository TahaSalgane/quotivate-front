import React from 'react';
const Footer = () => {
    return (
        <div className="px-3 bg-dark">
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <h2>telecharger l &apos; application</h2>
                            <p>telecharger l &apos;application dispo android et ios</p>
                            <br />
                            <img src="/photos/application.jpg" width="200px" />
                        </div>
                        <div className="col-2">
                            <img src="/photos/ofppt.jpg" width="180px" />
                            <p></p>
                        </div>
                        <div className="col-3">
                            <h3></h3>
                            <ul>
                                <li>
                                    {' '}
                                    <a href="">Tableau des tailles</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">Politique de retour</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">Conditions généralesn </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">d utilisation Politique</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <h3></h3>
                            <ul>
                                <li>
                                    {' '}
                                    <a href="">Corporate</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">À propos de nous</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">SPS dans le monde</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="">contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <b>©2023 Quotivate</b>
        </div>
    );
};

export default Footer;
