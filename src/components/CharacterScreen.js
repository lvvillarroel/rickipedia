import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import EpisodeCard from './EpisodeCard';

const CharacterScreen = (props) => (
  <Query query={gql`{
 character(id: ${props.match.params.characterIndex}) {
  id,
  name,
  status,
  species,
  type,
  gender,
  origin {
    name,
    id
  },
  location {
    name,
    id
  },
  episode {
    id,
    name,
    episode,
    air_date
  }
  image
}
}`}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading ...</p>;
      if (error) return <p>Error :(</p>;
      return <div>
        {
          <div>
            <div className="container row">
              <div className="card bg-dark col-3">
                <img className="card-img" src={data.character.image} alt="Character"></img>
              </div>
              <div className="col-6">
                <h1 className="page-title text-white"> {data.character.name} </h1>
                <h4 className="text-white">Species: {data.character.species} </h4>
                {data.character.type !== "" ?
                  <h4 className="text-white">Type: {data.character.type} </h4> :
                  <div></div>
                }
                <h4 className="text-white">Gender: {data.character.gender} </h4>
                <h4 className="text-white">Status: {data.character.status} </h4>
              </div>
              <div className="col-3">
                <h4 className="text-white">Origin and current location</h4>
                <div className="container col">
                  <h5 className="text-white">Origin</h5>
                  {data.character.origin ?
                    <Link to={`/location/${data.character.origin.id}`}>
                      <h5>{data.character.origin.name}</h5>
                    </Link> :
                    <h5 className="text-white">Unknown</h5>
                  }
                  <h5 className="text-white">Location</h5>
                  {data.character.location.id ?
                    <Link to={`/location/${data.character.location.id}`}>
                      <h5>{data.character.location.name}</h5>
                    </Link> :
                    <h5 className="text-white">Unknown</h5>
                  }
                </div>
              </div>
            </div>
            <h3 className="text-white page-subtitle">Episodes in which appears</h3>
          </div>
        }
        <div className="row">
          {
            data.character.episode.length > 0 ?
              data.character.episode.map(ep =>
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
    }}
  </Query>
);


export default CharacterScreen;
