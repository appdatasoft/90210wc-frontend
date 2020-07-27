import React from "react";
import axios from "axios";

export default class Teams extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
        .get("http://localhost:4040/teams")
      .then((res) => this.setState({ data: res.data.data.data }))
      .catch((err) => console.log(err));
  }
  render() {
    const result = this.state.data.find(
      (d) => d.slug === this.props.match.params.slug
    );
    if (result) {
      const { title, description } = result;
      return (
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
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
