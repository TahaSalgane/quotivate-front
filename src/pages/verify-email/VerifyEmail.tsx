import React, { useEffect } from 'react';
import './verify-email.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail } from 'services/authService';
import useUserStore, { StoreStateInterface } from 'store/userStore';

// import { toast } from 'react-toastify';
const VerifyEmail: React.FC = () => {
    const isEmailVerifie = useUserStore((state: StoreStateInterface) => state.isEmailVerified);
    console.log(isEmailVerifie);
    const { userId, token } = useParams();

    useEffect(() => {
        const verify = async () => {
            try {
                await verifyEmail(userId, token);
                useUserStore.getState().setIsEmailVerified();
                console.log(isEmailVerifie);

                // console.log(data);
                // if (data.realData != 'invalid link') {
                //     useUserStore.getState().setIsEmailVerified(); // update the store
                //     console.log('object');
                // }
                // else {
                //     useUserStore.getState().setIsEmailVerified();
                // } // update the store
            } catch (error) {
                console.log(error);
            }
        };
        verify();
    }, []);
    return (
        <section className="verify-email">
            {isEmailVerifie ? (
                <>
                    <FontAwesomeIcon size="2xl" className="me-1 verify-email-icon" icon={faCheckCircle} />
                    <h1 className="verify-email-title">your email adress has been successfuly verified</h1>
                    <Link to={'/login'} className="verify-email-link">
                        Go To Login Page
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="verify-email-not-found">Not Found</h1>
                </>
            )}
        </section>
    );
};
export default VerifyEmail;
