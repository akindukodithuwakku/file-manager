// filepath: c:\Users\akind\OneDrive\Desktop\file manager\src\App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* Add more routes here as needed */}
                    <Route path="*" element={<h2> 404 Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;