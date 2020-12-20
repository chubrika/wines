import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Fields from './filed/index';
import FooterWeb from './FooterWeb'
import { isEmpty } from 'lodash';
import * as Cookies from "js-cookie";
import { login } from './../state/actions/Auth/login'
import { getCurrentUser } from './../state/actions/CurrentUser/index'
import * as i18n from 'i18n-js';
import UserArea from './UserProfile'
@(connect)(
    state => {
        return {
            data: state.login.data,
            loading: state.login.loading,
            errors: state.login.errors,
            user: state.currentUser.data,
            languageObject: state.language
        };
    },
    dispatch => ({
        login: bindActionCreators(login, dispatch),
        getCurrentUser: bindActionCreators(getCurrentUser, dispatch)
    })
)
@reduxForm({
    form: 'SITE_INDEX_FORM'
})
class LoginArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_auth: '',
            lang: ''
        }
    }

    handleSubmit = async (values) => {
        if (!isEmpty(values.email) && !isEmpty(values.password)) {
            this.setState({ error_auth: null });
            await this.props.login(values);
            if (this.props.data.status) {
                await Cookies.set('token', this.props.data.token);
                await localStorage.setItem("token", this.props.data.token);
                document.location.replace('/');
            }
            else {
                this.setState({
                    error_auth: this.props.errors.messages
                });
            }
        }
    }

    render() {
        const {
            handleSubmit
        } = this.props;
        if (!isEmpty(this.props.user)) {
            return (
                <UserArea/>
            )
        }
        else {
            return (
                <>
                    {!isEmpty(this.state.error_auth) && <div className="error_block">{this.state.error_auth}</div>}
                    <div className="Left_side_container_body">
                        <div className="login_title Helvetic">{i18n.t('auth')}</div>
                        <div className="login_form">
                            <div>
                                <Fields
                                    name='email'
                                    plholder={i18n.t('email_address')}
                                    type='text'
                                    labels={false}
                                    theme="dark"
                                />
                            </div>
                            <div style={{ marginTop: 25 }}>
                                <Fields
                                    name='password'
                                    plholder={i18n.t('password')}
                                    type='password'
                                    labels={false}
                                    theme="dark"
                                />
                            </div>
                            <div className="ps_rec">
                                <Link to="/password-recovery">{i18n.t('forg_password')}</Link>
                            </div>
                        </div>
                    
                        <div className="login-button">
                            <div className="submit" onClick={handleSubmit(this.handleSubmit)}>{i18n.t('signIn')}</div>
                        </div>
                        <div className="create_account">
                            <Link className="acc_button" to="/registration">{i18n.t('registration')}</Link>
                        </div>
                        <FooterWeb/>
                    </div>
                </>
            );
        }
    }
}
export default LoginArea;
