import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';

import HomePage from './components/HomePage'

const App = () => {
    return (
        <Router>
            <Route exact path="/" component={HomePage}></Route>
        </Router>
    );
}

export default App;
