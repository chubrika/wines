import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import * as i18n from 'i18n-js';
class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_auth: '',
            open_resp: false
        }
    }

    componentWillMount = () => {
        this._getChooseLanguages();
    }

    _getChooseLanguages = async () => {
        const value = await localStorage.getItem('LANG');
        let item = JSON.parse(value);

        if (!isEmpty(item) && !isEmpty(item.lang)) {
            this.setState({ lang: item.lang.name });
        }
        else {
            this.setState({ lang: 'ka' });
        }

    }

    navigatin = (nav) => {
        this.setState({
            open_resp: false
        }, () => {
            this.props.history.history.push(nav)
        })
    }

    render() {
        const {
            handleSubmit
        } = this.props;
        return (
            <>
                <div className={this.state.open_resp ? "resp_menu open_nv_resp" : "resp_menu"}>
                    <div className="area_one">
                        <div className="menu-text">
                            <div style={{marginRight: '10px'}} onClick={() => this.props.onChangeLanguage('ka')}><img src={require('../assets/images/geo-flag.svg')} style={{width: 25}}/></div> 
                            <div style={{marginRight: '10px'}} onClick={() => this.props.onChangeLanguage('en')}><img src={require('../assets/images/eng-flag.svg')} style={{width: 25}}/></div> 
                            <div style={{marginRight: '10px'}} onClick={() => this.props.onChangeLanguage('ru')}><img src={require('../assets/images/rus-flag.svg')} style={{width: 25}}/></div>
                        </div>
                        <div onClick={() => this.setState({open_resp: this.state.open_resp ? false : true})}>
                            <img src={require('../assets/images/close.svg')} alt="" style={{width: 38}} />
                        </div>
                    </div>
                    <div className="area_two">
                        <ul>
                            <li>
                                <Link to="/home" onClick={() => { this.setState({open_resp: false}) }}>
                                    <img src={require('../assets/images/icons8-home.svg')} alt="" style={{width: 25}} />
                                    <div className="div-text">{i18n.t('home')}</div>   
                                </Link>
                            </li>
                            <li>
                                <Link to="/flights-schedule" onClick={() => { this.setState({open_resp: false}) }}>
                                <img src={require('../assets/images/flights-icon.svg')} alt="" style={{width: 25}} />
                                    <div className="div-text">{i18n.t('flight_menu')}</div>   
                                </Link>
                            </li>
                            <li>
                                <Link to="/price" onClick={() => { this.setState({open_resp: false}) }}>
                                    <img src={require('../assets/images/price.svg')} alt="" style={{width: 20, marginRight: '15px'}} />
                                    <div className="div-text">{i18n.t('price_menu')}</div>   
                                </Link>
                            </li>
                            <li>
                                <Link to="/shops" onClick={() => { this.setState({open_resp: false}) }}>
                                    <img src={require('../assets/images/shops.svg')} alt="" style={{width: 20, marginRight: '15px'}} />
                                    <div className="div-text">{i18n.t('shops')}</div>   
                                </Link>
                            </li>
                            <li>
                                <Link to="/calculator" onClick={() => { this.setState({open_resp: false}) }}>
                                    <img src={require('../assets/images/shops.svg')} alt="" style={{width: 20, marginRight: '15px'}} />
                                    <div className="div-text">{i18n.t('calculator')}</div>   
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={() => { this.setState({open_resp: false}) }}>
                                    <img src={require('../assets/images/phone-icon.svg')} alt="" style={{width: 20, marginRight: '15px'}} />
                                    <div className="div-text">{i18n.t('contact_menu')}</div>   
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mm_header">
                    <div className="mobile_header">

                        <div className="mobile_flex_block">
                            <div className="dc-mobile-logo">
                                <img src={require('../assets/images/logo.png')} alt=""/>
                            </div>
                            <div className="button_menu">
                                <div className="nav_m" onClick={() => this.setState({open_resp: this.state.open_resp ? false : true})}>
                                    <span className="w_1"></span>
                                    <span className="w_2"></span>
                                    <span className="w_3"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default MobileHeader;