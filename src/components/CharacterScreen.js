import React, { Component } from 'react';
import fetchInfo from '../apirequest';
import { Link } from 'react-router-dom';

import EpisodeCard from './EpisodeCard';

export default class CharacterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      characterIndex: '',
      episodes: [],
      origin: null,
      location: null,
    };
  }

  async componentDidMount() {
    const { characterIndex } = this.props.match.params;
    const character = await fetchInfo(`https://integracion-rick-morty-api.herokuapp.com/api/character/${characterIndex}`);
    if (character.origin.url !== "") {
      let origin = await fetchInfo(character.origin.url);
      this.setState({ origin })
    }
    if (character.location.url !== "") {
      let location = await fetchInfo(character.location.url);
      this.setState({ location })
    }
    character.episode.forEach(async episodePath => {
      let e = await fetchInfo(episodePath)
      this.setState({ episodes: [...this.state.episodes, e] })
    });
    this.setState({ characterIndex, character });
  }

  render() {
    const { character, episodes, origin, location } = this.state;
    return (
      <div>
        {
          this.state.character ?
            <div>
              <div className="container row">
                <div className="card bg-dark col-3">
                  <img className="card-img" src={character.image} alt="Character"></img>
                </div>
                <div className="col-6">
                  <h1 className="page-title text-white"> {character.name} </h1>
                  <h4 className="text-white">Species: {character.species} </h4>
                  {character.type !== "" ?
                    <h4 className="text-white">Type: {character.type} </h4> :
                    <div></div>
                  }
                  <h4 className="text-white">Gender: {character.gender} </h4>
                  <h4 className="text-white">Status: {character.status} </h4>
                </div>
                <div className="col-3">
                  <h4 className="text-white">Origin and current location</h4>
                  <div className="container col">
                    <h5 className="text-white">Origin</h5>
                    {origin ?
                      <Link to={`/location/${origin.id}`}>
                        <h5>{character.origin.name}</h5>
                      </Link> :
                      <h5 className="text-white">Unknown</h5>
                    }
                    <h5 className="text-white">Location</h5>
                    {location ?
                      <Link to={`/location/${location.id}`}>
                        <h5>{character.location.name}</h5>
                      </Link> :
                      <h5 className="text-white">Unknown</h5>
                    }
                  </div>
                </div>
              </div>
              <h3 className="text-white page-subtitle">Episodes in which appears</h3>
            </div> :
            <p>Loading ...</p>
        }
        <div className="row">
          {
            episodes.length > 0 ?
              episodes.map(ep =>
                <EpisodeCard
                  key={ep.id}
                  name={ep.name}
                  code={ep.episode}
                  date={ep.air_date}
                  episodeIndex={ep.id}
                />) :
              <p>No episodes</p>
          }
        </div>
      </div>
    )
  }
}
