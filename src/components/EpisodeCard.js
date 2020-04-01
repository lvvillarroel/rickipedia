import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EpisodeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      date: this.props.date,
      code: this.props.code,
      episodeIndex: this.props.episodeIndex,
    };
  }


  render() {
    const { name, date, code, episodeIndex } = this.state;
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Link to={`/episode/${episodeIndex}`}>
          <div
            className="card text-white bg-info"
            style={{ maxWidth: "18rem" }}>
            <div className="card-header">{code}</div>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{date}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
