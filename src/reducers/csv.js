import { UPDATE_CSV } from "../actions/list";

const data = [];

export default function(state = data, action) {
  switch (action.type) {
    case UPDATE_CSV:
      if (action.payload.id === state.id) {
        return action.payload;
      } else return state;

    default:
      return state;
  }
}
