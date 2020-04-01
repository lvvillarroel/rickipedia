import React, { Component } from 'react';
import fetchInfo from '../apirequest';

import CharacterCard from "./CharacterCard";


export default class EpisodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: null,
      characters: [],
      episodeIndex: '',
    };
  }

  async componentDidMount() {
    const { episodeIndex } = this.props.match.params;
    const episode = await fetchInfo(`https://rickandmortyapi.com/api/episode/${episodeIndex}`);
    episode.characters.forEach(async characterPath => {
      let c = await fetchInfo(characterPath)
      this.setState({ characters: [...this.state.characters, c] })
    });
    this.setState({ episodeIndex, episode });
  }

  render() {
    return (
      <div>
        {this.state.episode ?
          <div>
            <h1 className="page-title text-white"> {this.state.episode.episode} - {this.state.episode.name} </h1>
            <h5 className="page-subtitle text-white"> {this.state.episode.air_date} </h5>
            <br />
            <h3 className="text-white .page-subtitle ">Characters in this chapter:</h3>
          </div> :
          <h1 className=".page-title text-white"> Cargando ... </h1>}
        <div className="card-deck">
          {this.state.characters.length > 0 ?
            this.state.characters.map(character =>
              <CharacterCard
                key={character.id}
                charIndex={character.id}
                name={character.name}
                gender={character.gender}
                species={character.species}
                imageUrl={character.image}
              />) :
            <p>Cargando...</p>}
        </div>
      </div>
    )
  }
}
