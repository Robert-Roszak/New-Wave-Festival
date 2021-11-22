import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getConcerts = ({ concerts }) => concerts.data;
export const getRequest = ({ concerts }) => concerts.request;

/* ACTIONS */

// action name creator
const reducerName = 'concerts';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_CONCERTS = createActionName('LOAD_CONCERTS');
const UPDATE_CONCERTS = createActionName('UPDATE_CONCERTS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadConcerts = payload => ({ payload, type: LOAD_CONCERTS });
export const updateConcerts = payload => ({ payload, type: LOAD_CONCERTS });

/* THUNKS */

export const loadConcertsRequest = () => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/concerts`);
      dispatch(loadConcerts(res.data));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

export const updateConcertRequest = (seat) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let allConcerts = await axios.get(`${API_URL}/concerts/day/${seat.day}`);
      let allSeats = await axios.get(`${API_URL}/seats/day/${seat.day}`);

      allConcerts.data.forEach(async concert => {
        let updatedConcerts = await axios.put(`${API_URL}/concerts/${concert._id}`, { day: concert.day, price: concert.price, performer: concert.performer._id, seatsCount: allSeats.data.length})
        console.log('czym jest updatedConcerts? powinno byc odpowiedzia serwera na put: ', updatedConcerts);
        dispatch(updateConcerts(updatedConcerts.data));
      });
      
      dispatch(endRequest());
      console.log('ok, zobaczmy koncerty po zmianie: ', await axios.get(`${API_URL}/concerts/day/${seat.day}`))

    } catch(e) {
      dispatch(errorRequest(e.message));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CONCERTS: 
      return { ...statePart, data: [...action.payload] };
    case UPDATE_CONCERTS: 
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    default:
      return statePart;
  }
}
