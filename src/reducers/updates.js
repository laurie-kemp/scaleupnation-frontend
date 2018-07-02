import { FETCH_ALL_UPDATES, ADD_UPDATE } from "../actions/updates";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_UPDATES:
      return action.payload;
    case ADD_UPDATE:
      return action.payload;
    default:
      return state;
  }
};
