import React from 'react';
import EpisodeCard from './EpisodeCard';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const HomeScreen = () => (
  <div>
    <h1 className="page-title text-white">Episodes</h1>
    <div className="row">
      <Query query={gql`{
        episodes(page:1) {
        info {
          next
        },
        results {
          id,
          name, 
          air_date,
          episode
        }
      }
      }`}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error :(</p>;
          return data.episodes.results.map((episode) => (
            <EpisodeCard
              key={episode.id}
              name={episode.name}
              date={episode.air_date}
              code={episode.episode}
              episodeIndex={episode.id} />
          ));
        }}
      </Query>
      <Query query={gql`{
    episodes(page:2) {
     info {
       next
     },
     results {
       id,
       name, 
       air_date,
       episode
     }
   }
   }`}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error :(</p>;
          return data.episodes.results.map((episode) => (
            <EpisodeCard
              key={episode.id}
              name={episode.name}
              date={episode.air_date}
              code={episode.episode}
              episodeIndex={episode.id} />
          ));
        }}
      </Query>
    </div>
  </div>

);

export default HomeScreen;