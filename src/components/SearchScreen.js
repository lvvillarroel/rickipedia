import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SearchScreen = (props) => (
  <div>
    <Query query={gql`{
  characters(filter:{ name: "${props.location.state.query}" }) {
    info {
      pages
      count
    }
    results {
      name
    }
  }
  locations(filter:{ name: "${props.location.state.query}" }) {
    info {
      pages
      count
    }
    results {
      name,
      id
    }
  }
  episodes(filter:{ name: "${props.location.state.query}" }) {
    info {
      pages
      count
    }
    results {
      id,
      name
    }
  }
}`}>
      {({ loading, error, data }) => {
        console.log(props)
        console.log(props.location.state.query)
        if (loading) return <p>Loading ...</p>;
        if (error) return <p>Error :(</p>;
        return <div>
          <h4 className="text-white">You searched: {props.location.state.query}</h4>
          <div className="container row">
            <div className="col-4">
              <h3 className="text-white">Characters:</h3>
              {data.characters.results.length > 0 ?
                <div>
                  <ul key="character">
                    {data.characters.results.map(char =>
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
              {data.episodes.results.length > 0 ?
                <div>
                  <ul key="episode">
                    {data.episodes.results.map(epi =>
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
              {data.locations.results.length > 0 ?
                <div>
                  <ul key="location">
                    {data.locations.results.map(loc =>
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
      }}
    </Query>
  </div>
);

export default SearchScreen;
