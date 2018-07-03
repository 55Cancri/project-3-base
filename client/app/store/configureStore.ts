import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'

import { appReducer } from '../reducers/app'
import { authReducer } from '../reducers/auth'
import { modalReducer } from '../reducers/modal'

// middleware is called every store update
const checkTokenExpirationMiddleware = store => next => action => {
  // if (localStorage.q) {
  //   const token = jwtDecode(localStorage.appJWT)

  //   if (token.exp < Date.now() / 1000) {
  //     next(action)
  //     store.dispatch(startLogout())
  //   }
  // }
  next(action)
}

const composeEnhancers =
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      app: appReducer,
      auth: authReducer,
      modal: modalReducer
    }),
    composeEnhancers(applyMiddleware(thunk, checkTokenExpirationMiddleware))
  )

  return store
}
