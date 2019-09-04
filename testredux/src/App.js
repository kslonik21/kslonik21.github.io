import React from 'react'
import Registration from './components/Registration'
import Auth from './components/Auth'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './store/reducers'
import AuthContainer from './components/AuthContainer'
const store = createStore(rootReducer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className='wrapper'>
          <h1>Complex State</h1>
          <div className='forms'>
            <AuthContainer/>
            <Registration/>
          </div>
        </div>
      </Provider>
    )
  }
}
