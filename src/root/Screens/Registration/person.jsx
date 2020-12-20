import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { LoginArea, GuestHeader } from './../../../components'
import Fields from './../../../components/filed';
import { reduxForm, reset } from 'redux-form';
import { Api } from '../../../state/Api';
import * as i18n from 'i18n-js';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    form: 'SITE_REGISTRATION_FORM'
})
class RegistrationPersonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: null,
            other_cantry: 0,
            step_two: false,
            step_one_error: ''
        }
    }

    handleSubmit = (values) => {
        if (!this.state.step_two) {
            this.props.cheackLoading(true);
            Api.Account.Cheack(values).then((v) => {
                this.props.cheackLoading(false);
                if (v.status) {
                    this.setState({ step_two: true, p: v.msg, step_one_error: '' });
                }
                else {
                    this.setState({ step_one_error: v.messages });
                }
            });
        }
        else {
            this.props.onSubmit(values, this.state.other_cantry);
        }
    }

    activeOtherCountry = () => {
        this.props.dispatch(reset('SITE_REGISTRATION_FORM'));
        this.setState({
            other_cantry: this.state.other_cantry === 0 ? 1 : 0
        })
    }

    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        return (
            <div>
                {!isEmpty(this.state.step_one_error) && <div class="alert alert-danger" role="alert">{this.state.step_one_error}</div>}
                {!this.state.step_two && <div onClick={() => this.activeOtherCountry()} className={this.state.other_cantry === 0 ? 'other_cantry_person' : 'other_cantry_person_active'}>{i18n.t('non_georgian_citizen')}</div>}
                {!this.state.step_two ?
                    <div className="row">
                        {this.state.other_cantry === 0 && <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_first_name'
                                plholder={i18n.t('first_name_ka')}
                                type='text'
                                id="namegeo"
                                labels={false}
                                theme="light"
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>}
                        {this.state.other_cantry === 0 && <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_last_name'
                                plholder={i18n.t('last_name_ka')}
                                type='text'
                                labels={false}
                                theme="light"
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>}
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_first_name_lat'
                                plholder={i18n.t('first_name_en')}
                                type='text'
                                id="namegeo"
                                labels={false}
                                theme="light"
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_last_name_lat'
                                plholder={i18n.t('last_name_en')}
                                type='text'
                                labels={false}
                                theme="light"
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_pin_number'
                                plholder={this.state.other_cantry === 0 ? i18n.t('perons_number') : i18n.t('person_pasport_number')}
                                type='maskinput'
                                labels={false}
                                theme="light"
                                frmt="###########"
                                decimalScale={this.state.other_cantry === 0 ? 11 : 60}
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_phone'
                                plholder={i18n.t('phone_nuber')}
                                type='maskinput'
                                labels={false}
                                theme="light"
                                frmt="+995 ### ## ## ##"
                                decimalScale={9}
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='person_email'
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
                        <div className="col-md-6" style={{ marginTop: 30 }}>
                            <Fields
                                name='perosn_br_date'
                                plholder={i18n.t('person_br_date')}
                                type='datepicker'
                                labels={false}
                                theme="light"
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                        <div className="col-md-6" style={{ marginTop: 30, marginBottom: 30 }}>
                            <Fields
                                name='perosn_gender'
                                plholder={i18n.t('gender')}
                                type={'radio'}
                                data={[{ id: 0, name: i18n.t('gender_type_female') }, { id: 1, name: i18n.t('gender_type_male') }]}
                                validations={[
                                    {
                                        type: 'required',
                                        message: null
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ marginTop: '35px' }}>
                                <Fields
                                    name='perosn_city'
                                    plholder={i18n.t('person_city')}
                                    type='select'
                                    model="citys"
                                    labels={false}
                                    theme="light"
                                    validations={[
                                        {
                                            type: 'required',
                                            message: null
                                        }
                                    ]}
                                />
                            </div>
                            <div style={{ marginTop: '35px' }}>
                                <Fields
                                    name='person_password'
                                    plholder={i18n.t('person_password')}
                                    type='password'
                                    labels={false}
                                    theme="light"
                                    validations={[
                                        {
                                            type: 'required',
                                            message: null
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginTop: '35px' }}>
                                <Fields
                                    name='person_home_address'
                                    plholder={i18n.t('person_address')}
                                    type='text'
                                    labels={false}
                                    theme="light"
                                    validations={[
                                        {
                                            type: 'required',
                                            message: null
                                        }
                                    ]}
                                />
                            </div>
                            <div style={{ marginTop: '35px' }}>
                                <Fields
                                    name='person_rep_password'
                                    plholder={i18n.t('person_repeat_password')}
                                    type='password'
                                    labels={false}
                                    theme="light"
                                    validations={[
                                        {
                                            type: 'required',
                                            message: null
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                }
                {this.state.step_two && <div className="registration_button_back_step" style={{ marginRight: 10 }} onClick={() => this.setState({ step_two: false })}>{i18n.t('reg_back_button')}</div>}
                <div className="registration_button" onClick={handleSubmit(this.handleSubmit)}>
                    {!this.state.step_two ? i18n.t('reg_next_step') : i18n.t('reg_end_button')}
                    {this.props.loading && <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faSpinner} transform="grow-2.5" />}
                </div>
            </div>
        )
    }

}
export default RegistrationPersonComponent;