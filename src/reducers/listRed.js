import { CHANGE_CELL } from "../actions/list";

export default (state = [], action) => {
  switch (action.type) {
    case CHANGE_CELL:
      return [
        ...state,
        {
          id: action.payload.id,
          row: action.payload.row,
          column: action.payload.column,
          oldValue: action.payload.oldValue,
          newValue: action.payload.newValue
        }
      ];

    default:
      return state;
  }
};
