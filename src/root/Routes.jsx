import * as React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import * as i18n from 'i18n-js';
import * as Cookies from "js-cookie";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import LoginContainer from './Screens/Home';
import PricesComponent from './Screens/Prices'
import WinesList from './Screens/WinesList'
import ContactComponent from './Screens/Contact'
import RegistrationComponent from './Screens/Registration'
import PasswordRecoveryComponent from './Screens/PasswordRecovery'
import AgreementContainer from './Screens/Agreement'
import UserPolicyContainer from './Screens/UserPolicy'
import OnlineShopsComponent from './Screens/shops'
import { GuestHeader, MobileHeader, Footer } from './../components'
import {
  DashboardContanier,
  ProfileContainer
} from './Screens/Logged/index'
import { language } from './../state/actions/Language'
import { setCurrentUser, clearCurrentUser } from './../state/actions/CurrentUser'
import { Api } from '../state/Api'
@(connect)(
  state => {
    return {
      user: state.currentUser.data,
      loading: state.currentUser.loading,
      errors: state.currentUser.errors,
      languageObject: state.language
    };
  },
  dispatch => ({
    language: bindActionCreators(language, dispatch),
    setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
    clearCurrentUser: bindActionCreators(clearCurrentUser, dispatch)
  })
)
class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: null,
      loading: false
    }
  }

  componentDidMount = async () => {
    let token = await Cookies.get('token');
    if (token) {
      this.setState({ loading: true })
      Api.Account.getCurrentUser(token).then(async (v) => {
        await this.props.setCurrentUser(v);
        this.setState({ loading: false })
      })
    }
  }

  changeLanguages = async (lang) => {
    let langItem = { lang: { name: lang } };
    this.setState({ lang: lang });
    await localStorage.setItem("LANG", JSON.stringify(langItem));
    window.location.reload(true);
  }

  render() {
    const { user, errors, loading } = this.props;
    if (this.state.loading) {
      return <div></div>
    }
    return (
      <HashRouter>
        <>
          <div className="site_container">
            <MobileHeader onChangeLanguage={(lang) => this.changeLanguages(lang)} />
            {/* <div className="Left_side_container">
              <LoginArea/>
            </div> */}
            <div className="Right_side_container">
              <div className="site_header">
                <GuestHeader onChangeLanguage={(lang) => this.changeLanguages(lang)} />
              </div>
              <Switch>
                <Route exact key='/' path='/' component={isEmpty(user) ? LoginContainer : DashboardContanier} />
                <Route exact key='/home' path='/home' component={isEmpty(user) ? LoginContainer : DashboardContanier} />
                <Route exact key='/price' path='/price' component={PricesComponent} />
                <Route exact key='/shops' path='/shops' component={OnlineShopsComponent} />
                <Route exact key='/wines-list' path='/wines-list' component={WinesList} />
                <Route exact key='/contact' path='/contact' component={ContactComponent} />
                <Route exact key='/registration' path='/registration' component={isEmpty(user) ? RegistrationComponent : DashboardContanier} />
                <Route exact key='/password-recovery' path='/password-recovery' component={isEmpty(user) ? PasswordRecoveryComponent : DashboardContanier} />
                <Route exact key='/dashboard' path='/dashboard' component={isEmpty(user) ? LoginContainer : DashboardContanier} />
                <Route exact key='/user-policy' path='/user-policy' component={UserPolicyContainer} />
                <Route exact key='/agreement' path='/agreement' component={AgreementContainer} />
                <Route exact key='/profile' path='/profile' component={ProfileContainer} />
              </Switch>
            </div>
            <Footer />
          </div>
        </>
      </HashRouter>
    )
  }
}
export default Routes;