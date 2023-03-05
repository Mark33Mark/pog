import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => next => async action => {

  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) {
    dispatch({ type: onStart });
  }

  next(action);

  try {
    const response = await axios.request({
      baseURL: ".netlify/functions/",
      url,  //this is the endpoint, but you have to use 'url' keyword.
      method,
      data
    });

    // General
    dispatch(actions.apiCallSuccess(response.data));
    
    // Specific
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data });
    }

  } catch (error) {

    // General error scenario
    dispatch( actions.apiCallFailed(error.message) );
    
    // Specific
    if (onError) {
      dispatch({ type: onError, payload: error.message });
    }
  }
};

export default api;
