import React, { Component } from 'react';
import EpisodeCard from './EpisodeCard';
import fetchInfo from '../apirequest';

export default class HomeScreen extends Component {
  state = {
    path: "https://rickandmortyapi.com/api/episode/",
    episodes: null
  }

  async componentDidMount() {
    let episodes = await fetchInfo('https://rickandmortyapi.com/api/episode/');
    let episodesList = episodes.results;
    while (episodes.info.next !== "") {
      episodes = await fetchInfo(episodes.info.next);
      episodesList = episodesList.concat(episodes.results);
    }
    this.setState({ episodes: episodesList });
  }

  render() {
    return (
      <div>
        <h1 className="page-title text-white">Episodes</h1>
        <div className="row">
          {this.state.episodes ?
            this.state.episodes.map(episode =>
              <EpisodeCard
                key={episode.id}
                name={episode.name}
                date={episode.air_date}
                code={episode.episode}
                episodeIndex={episode.id} />
            ) :
            <p> No hay datos </p>}
        </div>
      </div>
    )
  }
}
