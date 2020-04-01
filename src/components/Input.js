import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  onPress() {
    let path = window.location.href.split("/");
    if (path[3] === "search") {
      window.location.reload();
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="filter">
          <input type="text" id="filter"
            value={this.state.query}
            placeholder="Search..."
            onChange={this.handleChange} />
        </label>
        <Link to={{
          pathname: '/search',
          state: {
            query: this.state.query
          }
        }}>
          <button type="button" className="btn btn-outline-light" onClick={this.onPress}>Go</button>
        </Link>
      </div>
    )
  }
}