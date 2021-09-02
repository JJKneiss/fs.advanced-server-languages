import React, { Component } from 'react';
import Header from '../components/Header/Header';

/* JK: This page loads Characters alphabetically from the Marvel API */
class Home extends Component {
    state = {
    }
    render() {
        return (
            <div className="App">
                <Header />
            </div >
        );
    }
}
export default Home;