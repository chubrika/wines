import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { reduxForm, reset, change } from 'redux-form';
import { Api } from '../../../../state/Api'
import * as i18n from 'i18n-js';
import Fields from './../../../../components/filed';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import '../../../../components/notify/notifications.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
@reduxForm({
    form: 'PROFILE_FORM_SCREEN'
})
class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            modal: false,
            old_password: '',
            new_password: '',
            rep_new_password: ''
        }
    }

    componentDidMount = () => {
        this.getUserInfo();
    }

    getUserInfo = () => {
        Api.Account.getUserInfo().then((res) => {
            if (res.status) {
                this.setState({
                    data: res.data
                }, () => {
                    this.props.initialize(res.data);
                });
            }
            else {
                alert('Error');
            }
        })
    }

    handleSubmit = (values) => {
        Api.Account.updateUserInformation(values).then((res) => {
            if (res.status) {
                NotificationManager.success(res.message);
                this.getUserInfo();
            }
            else {
                NotificationManager.error(res.message);
            }
        })
    }

    toggle = () => {
        this.props.dispatch(change('PROFILE_FORM_SCREEN', 'old_password', null));
        this.props.dispatch(change('PROFILE_FORM_SCREEN', 'new_password', null));
        this.props.dispatch(change('PROFILE_FORM_SCREEN', 'rep_new_password', null));
        this.setState({modal: !this.state.modal ? true : false})
    }


    changePassword = () => {
        const {
            old_password,
            new_password,
            rep_new_password
        } = this.state;
        Api.Account.updateUserPassword({old_password, new_password, rep_new_password}).then((res) => {
            if (res.status) {
                NotificationManager.success(res.message);
                this.toggle();
            }
            else {
                NotificationManager.error(res.message);
            }
        })
    }


    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        const {
            data
        } = this.state;
        return (
            <>
            <NotificationContainer />
            <div className="right_side_body">
                <div className="logged_content">
                    <div className="page_title">{data.first_name} {data.last_name}</div>
                    <div className="password_recovery_area">
                        <div className="red_button tracking_add_button" style={{display: 'inline-block', marginTop: 20}} onClick={() => this.toggle()}>{i18n.t('rec_password')}</div>
                    </div>
                    <div className="logged_content_body">

                        <div className="row">
                            <div className="col-md-6">
                                <Fields
                                    name='email'
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
                                <div style={{marginTop: 30}}>
                                    <Fields
                                        name='city'
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
                                <div style={{marginTop: 30, marginBottom: 30}}>
                                    <Fields
                                        name='gender'
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
                            <div className="col-md-6">
                                <Fields
                                    name='phone'
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
                                <div style={{marginTop: 30}}>
                                    <Fields
                                        name='address'
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
                                <div style={{marginTop: 30}}>
                                    <Fields
                                        name='br_date'
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
                            </div>
                            <div className="col-md-12" style={{marginTop: 20}}>
                                <div className="red_button tracking_add_button" style={{display: 'inline-block'}} onClick={handleSubmit(this.handleSubmit)}>{i18n.t('save')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{i18n.t('rec_password')}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12" style={{marginTop: 15}}>
                            <Fields
                                name='old_password'
                                plholder={i18n.t('old_password')}
                                type='password'
                                label={true}
                                onChangeValue={(text) => this.setState({old_password: text})}
                            />
                        </div>
                        <div className="col-md-12" style={{marginTop: 30}}>
                            <Fields
                                name='new_password'
                                plholder={i18n.t('new_password')}
                                type='password'
                                label={true}
                                onChangeValue={(text) => this.setState({new_password: text})}
                            />
                        </div>
                        <div className="col-md-12" style={{marginTop: 30, marginBottom: 10}}>
                            <Fields
                                name='rep_new_password'
                                plholder={i18n.t('rep_new_password')}
                                type='password'
                                label={true}
                                onChangeValue={(text) => this.setState({rep_new_password: text})}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => this.changePassword()}>{i18n.t('update')}</Button>{' '}
                    <Button color="danger" onClick={this.toggle}>{i18n.t('cancel')}</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }

}
export default ProfileContainer;