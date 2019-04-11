import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import ListRSVP from "./components/list-rsvp";
import CreateRSVP from "./components/create-rsvp";
import DeleteRSVP from "./components/delete-rsvp";
import EditRSVP from "./components/edit-rsvp";

class App extends Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <h1 className='navbar-brand'> <Link to="/">RSVPManager</Link></h1>
                        <ul className="navbar-nav mr-auto">
                            <li className='navbar-item'> <Link to="/" className='nav-link'>RSVPS</Link></li>
                            <li className='navbar-item'> <Link to="/create" className='nav-link'>CREATE</Link> </li>
                        </ul>
                    </nav>

                    <Route path="/create" component={CreateRSVP}/>
                    <Route path="/" exact component={ListRSVP}/>
                    <Route path="/edit/:id" exact component={EditRSVP}/>
                    <Route path="/delete/:id" exact component={DeleteRSVP}/>
                </div>
            </Router>
        );
    }
}

export default App;
