import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class CreateRSVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false,
        };
    }

    onChangeRSVPPerson = (e) => {
        this.setState({rsvp_person: e.target.value})
    };

    onChangeRSVPGoing = (e) => {
        this.setState({rsvp_going: e.target.value})
    };

    onChangeSubmit = (e) => {
        e.preventDefault();
        let data = {
            rsvp_person: this.state.rsvp_person,
            rsvp_going: this.state.rsvp_going,
        };
        fetch('/rsvp', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                this.onChangeHomePage();
            })
    };

    onChangeHomePage = (e) => {
        this.setState({toHomePage: true})

    };


    render() {

        if (this.state.toHomePage === true) {
            return <Redirect to={'/'}/>
        }

        return (
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onChangeSubmit}>
                    <div className={"form-group"}>
                        <label>Person: </label>
                        <input type="text" value={this.state.rsvp_person} onChange={this.onChangeRSVPPerson}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Going: </label>
                        <select value={this.state.rsvp_going} onChange={this.onChangeRSVPGoing}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group" aria-label="Basic example">
                            <input type="submit" value={'Create RSVP'} className="btn btn-success mr-2"/>
                        </div>
                        <div  className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={this.onChangeHomePage} className="btn btn-secondary mr-2">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateRSVP;