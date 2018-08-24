import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */
const GET_SONG_INFO = 'GET_SONG_INFO';

/* ------------     ACTION CREATORS      ------------------ */
const getSongInfo = song => ({ type: GET_SONG_INFO, song });

/* ------------          REDUCER         ------------------ */
export default function reducer(song = {}, action) {
  if (action.type === 'GET_SONG_INFO') {
    return action.song;
  }
  return song;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchSongInfo = selectedSong => dispatch => {
  axios
    .get(`https://genius.com/api${selectedSong.result.api_path}`)
    .then(res => dispatch(getSongInfo(res.data.response.song)));
};
