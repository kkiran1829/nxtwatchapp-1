import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  AppContainer,
  FormContainer,
  LoginImage,
  UserInputContainer,
  UserInputLabel,
  UserInput,
  LoginButton,
  CheckBox,
  CheckBoxConter,
  ErrorMassage,
  CheckboxLabel,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLogin: true,
    errMsg: '',
    isShowPassword: false,
  }

  onSuccess = data => {
    const jwtToken = data.jwt_token
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = data => {
    this.setState({isLogin: false, errMsg: data.error_msg})
  }

  getLogin = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data)
    } else {
      this.onFailure(data)
    }
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSubmittingForm = event => {
    event.preventDefault()
    this.getLogin()
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isLogin, errMsg, isShowPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <AppContainer isDark={isDark}>
              <FormContainer onSubmit={this.onSubmittingForm} isDark={isDark}>
                <LoginImage
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <UserInputContainer>
                  <UserInputLabel htmlFor="username" isDark={isDark}>
                    USERNAME
                  </UserInputLabel>
                  <UserInput
                    type="text"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                    id="username"
                    isDark={isDark}
                  />
                </UserInputContainer>
                <UserInputContainer>
                  <UserInputLabel htmlFor="password" isDark={isDark}>
                    PASSWORD
                  </UserInputLabel>
                  <UserInput
                    type={isShowPassword ? 'text' : 'password'}
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                    id="password"
                    isDark={isDark}
                  />
                </UserInputContainer>
                <CheckBoxConter>
                  <CheckBox
                    type="checkBox"
                    id="checkBoxEl"
                    onClick={this.onClickCheckbox}
                  />
                  <CheckboxLabel htmlFor="checkBoxEl" isDark={isDark}>
                    Show Password
                  </CheckboxLabel>
                </CheckBoxConter>
                <LoginButton type="submit">Login</LoginButton>
                {!isLogin && <ErrorMassage>* {errMsg}</ErrorMassage>}
              </FormContainer>
            </AppContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
