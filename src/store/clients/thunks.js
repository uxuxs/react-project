import ClientAPI from '../../api/services';
import { fetchClientsRequest, fetchClientsSuccess, fetchClientsFailure } from './actions';

export const fetchClients = () => async (dispatch) => {
  dispatch(fetchClientsRequest());
  try {
    const clients = await ClientAPI.all();
    dispatch(fetchClientsSuccess(clients));
  } catch (err) {
    dispatch(fetchClientsFailure(err));
  }
};
