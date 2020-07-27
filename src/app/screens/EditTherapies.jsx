import React from "react";
import axios from "axios";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class EditTherapies extends React.Component {
    state = {
        data: [],
        edit: false,
        title: "",
        slug: "",
        description: "",
        id:""
    }
    componentDidMount() {

        axios
            .get(
                "http://localhost:4040/therapies"
            )
            .then((res) => {
                this.setState({ data: res.data.data.data })
            })

            .catch((err) => console.log(err));

    }
    editData = (s, i) => {
        this.setState({
            edit: !this.state.edit,
            title: s.title,
            slug: s.slug,
            description: s.description,
            id: s._id
        })
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
            url: 'http://localhost:4040/therapies/update',
            headers: { 'content-type': 'application/json' },
            data: {
                _id: this.state.id,
                title: this.state.title,
                slug: this.state.slug,
                description: this.state.description
            },
            withCredentials: true,

        })
            .then(res => {
                console.log(res)
                this.setState({ res: res.status })
            })
            .catch(err => {
                if (err) throw err
            })
    }
    deleteData = (id) => {
        const url = `http://localhost:4040/therapies/delete/${id}`;

        axios
            .delete(url)
            .then(res => {
                this.setState({ res: res.status })
                this.props.history.push('/#/')
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <h3> Edit Therapies</h3>

                <table class="table table-primary ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Slug</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data && this.state.data.map((s, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{s.title}</td>
                                    <td>{s.slug}</td>
                                    <td>{s.description}</td>
                                    <td><button classname="btn btn-primary btn-block" onClick={() => { this.editData(s, i) }}>Edit</button></td>
                                    <td><button classname="btn btn-primary btn-block" onClick={() => { this.deleteData(s._id) }}>Delete</button></td>
                                </tr>   
                            )
                        })}
                    </tbody>   
                </table>
                {
                    this.state.edit
                        ? <form method="PUT" >
                            <h3>Edit Therapies</h3>

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
                            <button className="btn btn-primary btn-block" onClick={() => { this.setState({ edit: false }) }}>Cancel</button>
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.newEditedValue}>Update</button>
                        </form>
                        : null
                }
            </div>

        )
    }
}