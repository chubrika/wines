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
            languageObject: state.language,
            user: state.currentUser.data
        };
    },
    (dispatch) => ({
        language: bindActionCreators(language, dispatch),
    })
)
class PricesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: [],
            open_menu: false
        }
    }

    componentDidMount = () => {
     
    }

    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        const list = this.state.prices.map((v, index) => {
            return (
                <div key={index + '_prices'} className="price_block">
                    <div className="number">{v.price}</div>
                    <div className="descs">
                        <div className="div_t">{v.title}</div>
                        <div className="div_n">{v.desc}</div>
                    </div>
                </div>
            )
        });
        return (
            <div className="rigth_side_conetent_body">
                <h1>{i18n.t('price')}</h1>
                <div>
                    {list}
                </div>
            </div>
        )
    }

}
export default PricesComponent;