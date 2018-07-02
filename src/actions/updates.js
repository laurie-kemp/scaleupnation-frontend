import { baseUrl } from "../constants";
import * as request from "superagent";

export const FETCH_ALL_UPDATES = "FETCH_ALL_UPDATES";
export const ADD_UPDATE = "ADD_UPDATE";

export const fetchUpdates = () => dispatch => {
  request
    .get(`${baseUrl}/updates`)
    // .set("Authorization", `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_ALL_UPDATES,
        payload: result.body
      });
    });
};

export const addUpdate = update => dispatch => {
  request
    .post(`${baseUrl}/updates`)
    //.set("Authorization", `Bearer ${jwt}`)
    .send(update)
    .then(response =>
      dispatch({
        type: ADD_UPDATE,
        payload: response.body
      })
    );
};
