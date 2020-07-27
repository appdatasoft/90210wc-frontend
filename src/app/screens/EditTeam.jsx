import React from "react";
import axios from "axios";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class EditTherapies extends React.Component {
    state = {
        data: []
    }
    componentDidMount() {

        axios
            .get(
                "http://localhost:4040/teams"
            )
            .then((res) => {
                res.data.data.data.map(e => {
                    this.setState({
                        _id: e._id,
                        title: e.title,
                        description: e.description,
                        slug: e.slug
                    })
                })
                console.log(this.state.slug)
            })

            .catch((err) => console.log(err));

    }
    addNew = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    newEditedValue = () => {
        axios({
            method: 'put',
            url: 'http://localhost:4040/teams/update',
            headers: { 'content-type': 'application/json' },
            data: {
                _id: this.state._id,
                title: this.state.title,
                slug: this.state.slug,
                description: this.state.description
            },
            withCredentials: true,

        })
            .then(res => {
                this.setState({ res: res.status })
            })
            .catch(err => {
                if (err) throw err
            })
    }
    render() {
        return (
            <div>
                <h3> Current Team Info</h3>
                <div>
                    <h4>{this.state.title}</h4>
                    <p>{this.state.slug}</p>
                    <p>{this.state.description}</p>
                </div>
                <form method="PUT" >
                    <h3>Edit Team Data</h3>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" onChange={this.addNew} value={this.state.title} name="title" />
                    </div>
                    <div className="form-group">
                        <label>Slug</label>
                        <input type="text" className="form-control" placeholder="Enter Slug" onChange={this.addNew} value={this.state.slug} name="slug" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="textarea" className="form-control" placeholder="Enter Description" onChange={this.addNew} value={this.state.description} name="description" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.newEditedValue}>Update</button>
                </form>
            </div>

        )
    }
}