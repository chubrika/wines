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
import Person from './person';
import Organization from './organization';
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
class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: null,
            mode: 1,
            other_cantry: 0,
            loading: false,
            deleteAlert: null,
            errors: ''
        }
    }

    onChangeMode = (mode) => {
        if (this.state.mode !== mode) {
            this.props.dispatch(reset('SITE_REGISTRATION_FORM'));
            this.setState({mode: mode, other_cantry: 0});
        }
    }

    onSave = (values, otherCantry) => {
        this.setState({loading: true, errors: ''})
        Api.Account.Create(values, otherCantry).then((v) => {
            this.setState({loading: false}, () => {
                if (v.status) {
                    this.alert();
                }
                else {
                    this.setState({ errors: v.messages })
                }
            })
        });
    }

    onSaveOrganization = (values) => {
        this.setState({loading: true, errors: ''})
        Api.Account.CreateOrganization(values).then((v) => {
            this.setState({loading: false}, () => {
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
        deleteAlert: (
            <SweetAlert 
                success
                confirmBtnText = {i18n.t('auth')}
                confirmBtnBsStyle="success"
                btnSize="sm"
                title={i18n.t('alert')}
                onConfirm = {() => this.onleaveRegistrationPage()}>
                   {i18n.t('registration_success_text')} 
            </SweetAlert>
            )            
        });
    }

    onleaveRegistrationPage = () => {
        this.setState({deleteAlert: null}, () => {
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
                <h1>{i18n.t('registration')}</h1>
                <div className="mode_block" style={{display: 'flex'}}>
                    <div className={this.state.mode === 1 ? 'switch active' : 'switch'} onClick={() => this.onChangeMode(1)}>{i18n.t('individual_person')}</div>
                    <div className={this.state.mode === 2 ? 'switch active' : 'switch'} onClick={() => this.onChangeMode(2)}>{i18n.t('organization')}</div>
                </div>
                <div className="tab_container" style={{marginTop: '20px'}}>
                    {!isEmpty(this.state.errors) && <div class="alert alert-danger" role="alert">{this.state.errors}</div>}
                    {
                        this.state.mode === 1 ? 
                            <Person 
                                loading={this.state.loading}
                                cheackLoading={(param) => this.setState({loading: param})}
                                onSubmit={(values, otherCantry) => this.onSave(values, otherCantry)}
                            /> 
                            : 
                            <Organization 
                                loading={this.state.loading} 
                                cheackLoading={(param) => this.setState({loading: param})}
                                onSubmit={(values) => this.onSaveOrganization(values)}
                            /> 
                    }
                </div>
                {this.state.deleteAlert}
            </div>
        )
    }

}
export default RegistrationComponent;