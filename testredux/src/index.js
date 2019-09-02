import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {connect, Provider} from 'react-redux'
import {createStore, bindActionCreators} from 'redux'

const initialState = {
  firstName: 'Oleg',
  secondName: 'Pavlov'
}
const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME';
const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME';

const rootReducer = (state=initialState,action) => {
  switch(action.type) {
    case ACTION_CHANGE_FIRST_NAME:
      return {...state,firstName: action.payload}
    case ACTION_CHANGE_SECOND_NAME:
      return {...state,secondName: action.payload}
  }
  return state;
}
const changeFirstName = (newFirstName) => {
  return {
    type: ACTION_CHANGE_FIRST_NAME,
    payload: newFirstName
  }
}
const changeSecondName = (newSecondName) => {
  return {
    type: ACTION_CHANGE_SECOND_NAME,
    payload: newSecondName
  }
}
const store = createStore(rootReducer);

class MainComponent extends React.Component {
  render() {
    const { firstName, secondName, changeFirstName, changeSecondName} = this.props;
    return (
      <div>
        <div>
          <input
            value={firstName}
            type='text'
            placeholder='First Name'
            onChange={(event) => {
              changeFirstName(event.target.value)
            }}/>
        </div>
        <div>
          <input
            value={secondName}
            type='text'
            placeholder='Second Name'
            onChange={(event) => {
            changeSecondName(event.target.value)
            }}/>
        </div>
        <div>
          {`${firstName} ${secondName}`}
        </div>
      </div>
    )
  }
}
const putDispatchToProps = (dispatch) => {
  return {
    changeSecondName: bindActionCreators(changeSecondName, dispatch),
    changeFirstName: bindActionCreators(changeFirstName, dispatch)
  }
}
const mapStateToProps = (state) => {

  return {
    firstName: state.firstName,
    secondName: state.secondName
  }
}
const WrappedMainComponent = connect(mapStateToProps,putDispatchToProps)(MainComponent);
ReactDOM.render(<Provider store={store}><WrappedMainComponent /></Provider>, document.getElementById('root'));
