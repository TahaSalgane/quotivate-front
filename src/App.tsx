import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/core/Layout/Index';
import PageGuard from 'hoc/PageGuard';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Forgotpassword from 'pages/ForgotPassword';
import Users from 'pages/Users';
import Quotes from 'pages/Quotes';
import Tag from 'pages/Tag';
import Dashboard from 'pages/Dashboard';
import TagsIndexPage from 'pages/tags/Index';
const App: FC = () => {
    return (
        <Routes>
            <Route element={<Layout layoutDesign="backback" />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/quotes" element={<Quotes />} />
                <Route path="tag/:tag" element={<Tag />} />
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/categories" element={<TagsIndexPage />} />
            </Route>
            <Route element={<Layout layoutDesign="reglogbackground" isNotDark />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                    path="forgotpassword"
                    element={
                        <PageGuard guarded>
                            <Forgotpassword />
                        </PageGuard>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
