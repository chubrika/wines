import * as React from 'react';
import { Redirect, Link, NavLink, useHistory } from 'react-router-dom';
import { LoginArea, GuestHeader } from './../../../components'
import Fields from './../../../components/filed';
import { reduxForm, reset } from 'redux-form';
import { Api } from '../../../state/Api';
import * as i18n from 'i18n-js';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { language } from '../../../state/actions/Language'

@(connect)(
    (state) => {
        return {
            languageObject: state.language
        };
    },
    (dispatch) => ({
        language: bindActionCreators(language, dispatch),
    })
)
@reduxForm({
    form: 'PASSWORD_RECOVERY_FORM'
})
class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: null,
            loading: false,
            succ_alert: null,
            errors: ''
        }
    }

    handleSubmit = (values, otherCantry) => {
        this.setState({ loading: true, errors: '' })
        Api.Account.PasswordRecovery(values.recovery_email).then((v) => {
            this.setState({ loading: false }, () => {
                if (v.status) {
                    this.alert();
                }
                else {
                    this.setState({ errors: v.messages })
                }
            })
        });
    }

    alert = () => {
        this.setState({
            succ_alert: (
                <SweetAlert
                    success
                    confirmBtnText={i18n.t('close')}
                    confirmBtnBsStyle="success"
                    btnSize="sm"
                    title={i18n.t('alert')}
                    onConfirm={() => this.onleaveRegistrationPage()}>
                    {i18n.t('password_recovery_success_text')}
                </SweetAlert>
            )
        });
    }

    onleaveRegistrationPage = () => {
        this.setState({ succ_alert: null }, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        return (
            <div className="rigth_side_conetent_body">
                <h1>{i18n.t('password_recovery')}</h1>
                <div className="tab_container" style={{ marginTop: '20px' }}>
                    <div className="Arial">{i18n.t('password_recovery_text')}</div>
                    {!isEmpty(this.state.errors) && <div style={{ marginTop: 20 }} class="alert alert-danger" role="alert">{this.state.errors}</div>}
                    <div className="row">
                        <div className="col-md-5">
                            <div style={{ marginTop: '25px' }} id="frm">
                                <Fields
                                    name='recovery_email'
                                    plholder={i18n.t('email_address')}
                                    type='text'
                                    labels={false}
                                    theme="light"
                                    validations={[
                                        {
                                            type: 'required',
                                            message: null
                                        },
                                        {
                                            type: 'email',
                                            message: 'Invalid email address'
                                        }
                                    ]}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="registration_button" onClick={handleSubmit(this.handleSubmit)}>
                        {i18n.t('password_recovery_button_text')}
                        {this.state.loading && <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faSpinner} transform="grow-2.5" />}
                    </div>
                </div>
                {this.state.succ_alert}
            </div>
        )
    }

}
export default RegistrationComponent;