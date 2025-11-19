import {
    FETCH_CLIENTS_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE,
    ADD_CLIENT, DELETE_CLIENT
  } from './types';
  
  export const fetchClientsRequest = () => ({ type: FETCH_CLIENTS_REQUEST });
  export const fetchClientsSuccess = (clients) => ({ type: FETCH_CLIENTS_SUCCESS, payload: clients });
  export const fetchClientsFailure = (error) => ({ type: FETCH_CLIENTS_FAILURE, payload: error });
  
  export const addClientAction = (client) => ({ type: ADD_CLIENT, payload: client });
  export const deleteClientAction = (id) => ({ type: DELETE_CLIENT, payload: id });
  