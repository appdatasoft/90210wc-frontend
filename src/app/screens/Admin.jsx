import React from "react";
import axios from "axios";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class AdminAdd extends React.Component {
    state = {
        title: "",
        slug: "",
        description: "",
        type: ""
    }
    addNew = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    newData = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `http://localhost:4040/${this.state.type}/add`,
            headers: { 'content-type': 'application/json' },
            data: {
                title: this.state.title,
                description: this.state.description,
                slug: this.state.slug
            },
            withCredentials: true,
        })
            .then(res => {
                console.log(res)
                this.setState({ res: res.status })
                this.props.history.push('/#/')
            })
            .catch(err => {
                if (err) throw err
            })
    }
    render() {

        return (
            <div>
                <form className="col-6 m-5 align-center text-primary bg-light p-3" method="POST" onSubmit={this.newData} >
                    <h3>Add New Field</h3>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" name="title" value={this.state.title} onChange={this.addNew} required />
                    </div>
                    <div className="form-group">
                        <label>Slug</label>
                        <input type="text" className="form-control" placeholder="Enter Slug" name="slug" onChange={this.addNew} value={this.state.slug} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" placeholder="Enter Description" onChange={this.addNew} value={this.state.description} name="description" />
                    </div>
                    <div className="form-group" >
                        <label className="form-check-inline">Type</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Radio1" name="type" value="ivdrips" onChange={this.addNew} />
                            <label className="form-check-label" >
                                IV-Drip
                        </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Radio2" name="type" value="therapies" onChange={this.addNew} />
                            <label className="form-check-label" >
                                Therapies
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Radio3" name="type" value="services" onChange={this.addNew} />
                            <label className="form-check-label" >
                                Other Services
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Add</button>
                </form>
            </div>
        )
    }
}