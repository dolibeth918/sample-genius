import axios from 'axios';

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

/* ------------       THUNK CREATORS     ------------------ */
export const fetchSongs = () => dispatch => {
  axios.get('/api/users').then(res => dispatch(getSongs(res.data)));
};
