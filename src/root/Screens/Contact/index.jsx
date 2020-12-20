import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { LoginArea, GuestHeader, MobileHeader } from './../../../components'
import { Api } from '../../../state/Api';
import * as i18n from 'i18n-js';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
class ContactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            branches: [],
            open_menu: false
        }
    }

    componentDidMount = () => {
 
    }

    openMap = (v) => {
        window.open(v, '_blank');
    }
    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        const list = this.state.branches.map((v, index) => {
            return (
                <div key={index + '_address'} className="address_block">
                    <div className="address_t">{v.address}</div>
                    <div style={{marginTop: '10px'}}>
                        <div className="working_hours">{i18n.t('MonFri')} {v.work_hours}</div>
                        {v.work_saturday && <div className="working_hours">{i18n.t('Sat')} {v.work_saturday}</div>}
                        <div className="working_hours">{i18n.t('ph')} {v.tel}</div>
                        <div className="working_hours">{i18n.t('email')} {v.email}</div>
                    </div>
                    <div className="map_button" style={{marginTop: '20px'}} onClick={() => this.openMap(v.map_link)}>{i18n.t('seemap')}</div>
                </div>
            )
        });
        return (
            <div className="rigth_side_conetent_body">
                <h1>{i18n.t('branches')}</h1>
                <div className="bbl">
                    {list}
                </div>
            </div>
        )
    }

}
export default ContactComponent;