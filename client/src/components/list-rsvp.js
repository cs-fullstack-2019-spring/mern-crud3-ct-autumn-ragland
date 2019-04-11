import React, {Component} from 'react';
import {Link} from "react-router-dom";

const Rsvp = props => (
    <tr>
        <td className='tdcenter'>{props.rsvp.rsvp_person}</td>
        <td className='tdcenter'>{props.rsvp.rsvp_going ? 'Yes' : 'No'}</td>
        <td className='tdcenter'>
            <Link style={{marginRight: 5}} to={"/edit/" + props.rsvp._id} className='btn btn-dark btn-sm modbutton' > Edit </Link>
            <Link to={"/delete/" + props.rsvp._id} className='btn btn-dark btn-sm modbutton'> Delete </Link>
        </td>

    </tr>
);

class ListRSVP extends Component {



    constructor(props) {
        super(props);
        this.state = {
            rsvps:[],
        };
    }

    componentDidMount() {
        fetch('/rsvp')
            .then(data => data.json())
            .then(returnedData => this.setState({rsvps:returnedData}))
    }

    rsvpList() {
      return(
        this.state.rsvps && this.state.rsvps.map(function(eachRSVP,i){
            return <Rsvp rsvp={eachRSVP} key={i}/>
        })
      )
    };

    render() {
        return (
            <div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th className='tdcenter'>Person Invited</th>
                        <th className='tdcenter'>Going</th>
                        <th className='tdcenter'>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                        {this.rsvpList()}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default ListRSVP;