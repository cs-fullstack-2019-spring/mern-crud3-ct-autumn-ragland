import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class EditRSVP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rsvp_id: '',
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
        fetch('/rsvp/' + this.state.rsvp_id, {
            method: "PUT",
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
                    <h3>Edit RSVP</h3>
                    <div className={"form-group"}>
                        <label>Person: </label>
                        <input type="text" value={this.state.rsvp_person} onChange={this.onChangeRSVPPerson}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Going: </label>
                        <select value={this.state.rsvp_going} onChange={this.onChangeRSVPGoing} className="form-control">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group">
                            <input type="submit" value={'Update RSVP'} className="btn btn-success mr-2"/>
                        </div>
                        <div className="btn-group" role="group">
                            <button onClick={this.onChangeHomePage} className="btn btn-secondary mr-2">Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default EditRSVP;