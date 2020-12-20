import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Api } from '../state/Api';
import * as Cookies from "js-cookie";
import * as i18n from 'i18n-js';
import FooterWeb from './FooterWeb'
import { isEmpty } from 'lodash';
import { clearCurrentUser } from './../state/actions/CurrentUser'
@(connect)(
    (state) => {
        return {
            languageObject: state.language,
            user: state.currentUser.data
        };
    },
    (dispatch) => ({
        clearCurrentUser: bindActionCreators(clearCurrentUser, dispatch),
    })
)
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_auth: '',
            lang: '',
            address: {},
            modal: false
        }
    }

    componentDidMount = () => {
        this.getOfficeAddress();
    }


    getOfficeAddress = () => {
        Api.Info.getAddress().then((res) => {
            this.setState({
                address: res.data
            });
        })
    }

    logOut = async () => {
        await this.props.clearCurrentUser();
        await Cookies.remove('token');
        document.location.replace('/');
    }

    toggle = async () => {
        this.setState({ modal: !this.state.modal });
    }

    getUserNames = () => {
        const value = localStorage.getItem('LANG');
        let item = JSON.parse(value);
        if (!isEmpty(item) && item.lang.name === 'ka') {
            return (
                <>
                <div className="person">{this.props.user.first_name}</div>
                <div className="person">{this.props.user.last_name}</div>
                </>
            )
        }
        else {
            return (
                <>
                <div className="person">{this.props.user.first_name_lat}</div>
                <div className="person">{this.props.user.last_name_lat}</div>
                </>
            )
        }

    }

    render() {
        const {
            user,
            history
        } = this.props;
        const sumPrice = Number(user.sum_price);
        const addr = this.state.address.length ? this.state.address[0] : {};
        return (
            <div className="user_panel">
                <div className="user-profile-area">
                    <Link to="/profile">
                    <div className="person_info">
                        {this.getUserNames()}
                        <div className="room_number">{i18n.t('room_number')} PT{user.id}</div>
                    </div>
                    </Link>
                    <div className="exit" onClick={() => this.logOut()}><img src={require('../assets/images/logout.svg')}/></div>
                </div>
                <Link className="tracking_add" to="/add-parcel">{i18n.t('add_parcel')}</Link>
                <div className="balance_area">
                    <div className="title">{i18n.t('my_balance')}</div>
                    <div className="balance">
                        <div style={{display: 'flex', flex: 1}}>
                        <div className="ms">
                            <div className="ll">{i18n.t('balance')}</div>
                            <div className="numb">{user.balance} ₾</div>
                        </div>
                        <div className="ms">
                            <div className="ll">{i18n.t('payable')}</div>
                            <div className="numb pay">{sumPrice.toFixed(2)} ₾</div>
                        </div>
                        </div>
                        <div className="add_wid">
                            <Link to="/add-payment">
                                <img src={require('../assets/images/more.svg')}/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="address_area">
                    <div className="title">{i18n.t('usa_address')}</div>
                    <div className="ad_block">
                        <div className="address_block">
                            <div className="m">Address 1:</div>
                            <div className="l">{addr.address}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">Address 2:</div>
                            <div className="l">PT{user.id}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">City:</div>
                            <div className="l">{addr.city}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">State:</div>
                            <div className="l">{addr.state}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">ZIP:</div>
                            <div className="l">{addr.zip}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">Country:</div>
                            <div className="l">{addr.country}</div>
                        </div>
                        <div className="address_block">
                            <div className="m">Tel:</div>
                            <div className="l">{addr.tel}</div>
                        </div>
                        {this.state.address.length > 1 && <Link to="/all-address" className="more_address">{i18n.t('all_address')}</Link>}
                    </div>
                    
                </div>
                <FooterWeb/>
            </div>

        );
    }
}
export default UserProfile;
