import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CharacterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      species: this.props.species,
      gender: this.props.gender,
      imageUrl: this.props.imageUrl,
      charIndex: this.props.charIndex,
    };
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Link to={`/character/${this.state.charIndex}`}>
          <div
            className="card text-white bg-dark"
            style={{ maxWidth: "15rem" }}>
            <img className="card-img" src={this.state.imageUrl} alt="Character"></img>
            <div className="card-image-overlay">
              <h4 className="character-title">{this.state.name}</h4>
            </div>
            <div className="card-body">
              <h6 className="card-text">Species: {this.state.species}</h6>
              <h6 className="card-text">Gender: {this.state.gender}</h6>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
