import React, { Component } from 'react';
import { fetchSearchChar, fetchSearchEpisode, fetchSearchLocation } from '../apirequest';
import fetchInfo from '../apirequest';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      locations: [],
      episodes: [],
    };
  }

  async componentDidMount() {
    const { query } = this.props.location.state;
    // búsqueda de los personajes
    let characters = await fetchSearchChar(query);
    let charList = [];
    if (characters.results) {
      charList = characters.results
      while (characters.info.next !== "") {
        characters = await fetchInfo(characters.info.next);
        charList = charList.concat(characters.results);
      };
    }
    // búsqueda de los episodios
    let episodes = await fetchSearchEpisode(query);
    let epiList = [];
    if (episodes.results) {
      epiList = episodes.results;
      while (episodes.info.next !== "") {
        episodes = await fetchInfo(episodes.info.next);
        epiList = epiList.concat(episodes.results);
      };
    }
    // búsqueda de los lugares
    let locations = await fetchSearchLocation(query);
    let locList = [];
    if (locations.results) {
      locList = locations.results;
      while (locations.info.next !== "") {
        locations = await fetchInfo(locations.info.next);
        locList = locList.concat(locations.results);
      }
    }
    // guardar query en el state
    this.setState({ query, characters: charList, episodes: epiList, locations: locList });
  }

  render() {
    // console.log(this.state.locations);
    return (
      <div>
        <h4 className="text-white">You searched: {this.state.query}</h4>
        <div className="container row">
          <div className="col-4">
            <h3 className="text-white">Characters:</h3>
            {this.state.characters.length > 0 ?
              <div>
                <ul key="character">
                  {this.state.characters.map(char =>
                    <Link to={`/character/${char.id}`}>
                      <li className="search-text" key={`c${char.id}`}>{char.name}</li>
                    </Link>
                  )}
                </ul>
              </div> :
              <h5 className="text-white">No character with that name</h5>}
          </div>
          <div className="col-4">
            <h3 className="text-white">Episodes:</h3>
            {this.state.episodes.length > 0 ?
              <div>
                <ul key="episode">
                  {this.state.episodes.map(epi =>
                    <Link to={`/episode/${epi.id}`}>
                      <li className="search-text" key={`e${epi.id}`}>{epi.episode} - {epi.name}</li>
                    </Link>
                  )}
                </ul>
              </div> :
              <h5 className="text-white">No episodes with that name</h5>}
          </div>
          <div className="col-4">
            <h3 className="text-white">Locations:</h3>
            {this.state.locations.length > 0 ?
              <div>
                <ul key="location">
                  {this.state.locations.map(loc =>
                    <Link to={`/location/${loc.id}`}>
                      <li className="search-text" key={`l${loc.id}`}>{loc.name}</li>
                    </Link>
                  )}
                </ul>
              </div> :
              <h5 className="text-white">No locations with that name</h5>}
          </div>
        </div>
      </div>
    )
  }
}
