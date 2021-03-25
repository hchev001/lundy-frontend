import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  Store,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import EventReducer, { EventState } from "./modules/Events";
import { composeWithDevTools } from "redux-devtools-extension";

interface ApplicationState {
  events: EventState;
}
const CombinedReducer = () => combineReducers({ events: EventReducer });

const configureStoreDev = (): Store<ApplicationState> => {
  const store = createStore(
    CombinedReducer(),
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
};

export default configureStoreDev;
