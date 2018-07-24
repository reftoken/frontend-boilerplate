import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { apiMiddleware } from 'redux-api-middleware';

const history = createHistory();
const Router = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
  router,
  form
});

/**
 * Takes initial state and returns redux store configured
 * @param  {Object} initialState Inital state
 * @return {Object}              Redux store
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(apiMiddleware),
      applyMiddleware(thunk),
      applyMiddleware(Router)
    )
  );
}