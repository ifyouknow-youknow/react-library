import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

export function createRouter({ routes }) {
    return <BrowserRouter>
        <Routes>
            {
                routes.map((route, i) => {
                    return <Route key={i} path={route.path} element={route.route} />
                })
            }
        </Routes>
    </BrowserRouter>
}

export function navigate(path) {
    const nav = useNavigate();
    nav(path)
}