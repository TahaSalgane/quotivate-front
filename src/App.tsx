import React, { FC, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Layout from 'components/core/Layout/Index';
import PageGuard from 'hoc/PageGuard';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Forgotpassword from 'pages/ForgotPassword';
import Users from 'pages/Users';
import Tag from 'pages/Tag';
import Dashboard from 'pages/Dashboard';
import TagsIndexPage from 'pages/tags/Index';
import QuotesIndexPage from 'pages/quotes/Index';
import LoadingBackDropSpin from 'components/shared/loadingBackDrop';

import useUserStore, { StoreStateInterface, PERSIST_KEY } from 'store/userStore';
import EventBus from 'utils/eventBus';
import { logout as serviceLogOut } from 'services/authService';
import getUser from 'utils/helper';
import DetailQuote from 'pages/quotes/DetailQuote';
import Comment from 'pages/quotes/comment';

const App: FC = () => {
    const location = useLocation();
    const user = useUserStore((state: StoreStateInterface) => state.user);
    const clearUser = useUserStore((state: StoreStateInterface) => state.clearUser);

    const logOut = useCallback(() => {
        serviceLogOut();
        clearUser();
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem(PERSIST_KEY);
        if (token) {
            const decodedJwt = getUser(token);
            if (decodedJwt?.exp! * 1000 < Date.now()) {
                console.log('logOut');
                logOut();
            }
        } else logOut();
    }, [location]);

    useEffect(() => {
        EventBus.on('logout', () => {
            logOut();
        });

        return () => {
            EventBus.remove('logout');
        };
    }, [user, logOut]);

    return (
        <>
            <LoadingBackDropSpin />
            <ToastContainer />
            <Routes>
                <Route element={<Layout userlogOut={logOut} layoutDesign="backback" />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/admin/users"
                        element={
                            <PageGuard guarded isAdmin>
                                <Users />
                            </PageGuard>
                        }
                    />
                    <Route path="/admin/quotes" element={<QuotesIndexPage />} />
                    <Route path="/tag/:tag" element={<Tag />} />
                    <Route path="/quotes/details/:id" element={<DetailQuote />} />
                    <Route path="/quotes/test/" element={<Comment />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/tags" element={<TagsIndexPage />} />
                </Route>
                <Route element={<Layout userlogOut={logOut} layoutDesign="reglogbackground" isNotDark />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgotpassword" element={<Forgotpassword />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
