import React from "react";
import axios from "axios";

export default class Services extends React.Component {
  state = {
      data: [],
      title: "",
      description: "",
      slug: "",
      _id: "",
      res: ""
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:4040/services"
      )
        .then((res) => {
            this.setState({ data: res.data.data.data, _id: res.data.data.data.find(d => d)._id })

        })

        .catch((err) => console.log(err));
      
    }
    editValue = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    updateValue = (e) => {
        e.preventDefault()
        axios({
            method: 'put',
            url: 'http://localhost:4040/services/update',
            headers: { 'content-type': 'application/json' },
            data: {
                _id: this.state._id,
                title: this.state.title,
                description: this.state.description,
                slug: this.state.slug
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

  render() {
    const result = this.state.data.find(
      (d) => d.slug === this.props.match.params.slug
    );
    if (result) {
        const { _id, title, description, slug } = result;

      return (
          <div>
              <div>
                  <h1>{title}</h1>
                  <p>{description}</p>
              </div>
          </div>

      );
    } else {
      return (
        <div>
          <h1>No result found</h1>
        </div>
      );
    }
  }
}
