import { FETCH_ALL_DATA, CHANGE_CELL, NEW_COMPANIES } from "../actions/list";

export default (state = [], action) => {
  switch (action.type) {
    case CHANGE_CELL:
      return action.payload.reduce((databases, database) => {
        databases[database.id] = database;
        databases[database.id].timestamp = database.timestamp.split("T")[0];
        return databases;
      }, {});
    case FETCH_ALL_DATA:
      return action.payload.reduce((databases, database) => {
        databases[database.id] = database;
        databases[database.id].timestamp = database.timestamp.split("T")[0];
        return databases;
      }, {});
      case NEW_COMPANIES:
        return action.payload.reduce((databases, database) => {
          databases[database.id] = database;
          databases[database.id].timestamp = database.timestamp.split("T")[0];
          return databases;
        }, {});

    default:
      return state;
  }
};
