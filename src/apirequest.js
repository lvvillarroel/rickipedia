export default function fetchInfo(path) {
  return fetch(path, { headers: { Accept: 'application/json' } }).then(
    response => response.json()
  ).catch(
    error => console.log(error)
  );
}

export function fetchSearchChar(word) {
  return fetch(`https://rickandmortyapi.com/api/character/?name=${word}`, {
    headers: { Accept: 'application/json' }
  }).then(
    response => response.json()
  ).catch(
    error => console.log(error)
  );
}

export function fetchSearchEpisode(word) {
  return fetch(`https://rickandmortyapi.com/api/episode/?name=${word}`, {
    headers: { Accept: 'application/json' }
  }).then(
    response => response.json()
  ).catch(
    error => console.log(error)
  );
}

export function fetchSearchLocation(word) {
  return fetch(`https://rickandmortyapi.com/api/location/?name=${word}`, {
    headers: { Accept: 'application/json' }
  }).then(
    response => response.json()
  ).catch(
    error => console.log(error)
  );
}