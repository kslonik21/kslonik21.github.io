import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux'
import {createStore, bindActionCreators} from 'redux'
import {changeFirstName,changeSecondName} from '../store/actions'
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
export default connect(mapStateToProps,putDispatchToProps)(MainComponent);
