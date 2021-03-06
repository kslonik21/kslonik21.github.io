import React from 'react'
import Auth from './Auth'
import {connect} from 'react-redux'
import {setEmailText,setPasswordText} from '../store/auth/actions'
class AuthContainer extends React.Component {
  render() {
    return (
      <Auth email={this.props.email} setEmailText={this.props.setEmailText} setPasswordText={this.props.setPasswordText}  password={this.props.password}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password
  }
}
const mapDispatchToProps =  {
    setEmailText,
    setPasswordText
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthContainer);
