import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import * as i18n from 'i18n-js';
class FooterWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_auth: '',
            open_resp: false
        }
    }

    render() {
        const {
            handleSubmit
        } = this.props;
        return (
            <>
            <div className="footer_container_web">
                <div><Link to="/user-policy">{i18n.t('user_policy')}</Link></div>
                <div><Link to="/agreement">{i18n.t('agreement')}</Link></div>
                <div className="footer_text">
                    Copyright 2020, All Rights Reserved by POSTATIME.GE
                </div>
            </div>
        </>
        );
    }
}
export default FooterWeb;
