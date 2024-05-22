import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
