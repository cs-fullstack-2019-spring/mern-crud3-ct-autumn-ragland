import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class DeleteRSVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false,
        };
    }

    componentDidMount() {
        fetch('/rsvp/' + this.props.match.params.id)
            .then(data => data.json())
            .then(response => {
                this.setState({
                    rsvp_id: response._id,
                    rsvp_person: response.rsvp_person,
                    rsvp_going: response.rsvp_going
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSubmit = (e) => {
        e.preventDefault();

        fetch('/rsvp/' + this.state.rsvp_id, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
                <h3>Delete RSVP</h3>
                <form onSubmit={this.onChangeSubmit}>
                    <div className={"form-group"}>
                        <label>Person: {this.state.rsvp_person}</label>
                    </div>
                    <div className={"form-group"}>
                        <label>Going: {this.state.rsvp_going ? 'Yes' : 'No'}</label>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group" aria-label="Basic example">
                            <input type="submit" value={'Delete RSVP'} className="btn btn-danger mr-2"/>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button onClick={this.onChangeHomePage} className="btn btn-secondary mr-2">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default DeleteRSVP;