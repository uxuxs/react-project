import {
    FETCH_CLIENTS_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE,
    ADD_CLIENT, DELETE_CLIENT
  } from './types';
  
  const initialState = {
    clients: [],
    loading: false,
    error: null
  };
  
  export default function clientsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_CLIENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CLIENTS_SUCCESS:
        return { ...state, loading: false, clients: action.payload };
      case FETCH_CLIENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_CLIENT:
        return { ...state, clients: [...state.clients, action.payload] };
      case DELETE_CLIENT:
        return { ...state, clients: state.clients.filter(c => c.id !== action.payload) };
      default:
        return state;
    }
  }
  