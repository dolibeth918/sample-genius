/* -----------------    ACTION TYPES    ------------------ */
const GET_SONGS = 'GET_SONGS';

/* ------------     ACTION CREATORS      ------------------ */
const getSongs = songs => ({ type: GET_SONGS, songs });

/* ------------          REDUCER         ------------------ */

export default function reducer(songs = [], action) {
  if (action.type === 'GET_SONGS') {
    return { songs: action.songs };
  }
  return songs;
}
