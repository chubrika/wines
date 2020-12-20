import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { LoginArea, GuestHeader, MobileHeader } from './../../../components'
import { Api } from '../../../state/Api';
import * as i18n from 'i18n-js';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { language } from '../../../state/actions/Language'
import { Collapse } from 'reactstrap';
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
            category: [],
            shop_list: [],
            open_menu: false,
            cat_id: null
        }
    }

    componentDidMount = () => {
      
    }

    onSubmitTab = (catId, shops) => {
        this.setState({
            shop_list: shops,
            cat_id: catId
        })
    }

    onSubmitTabmobile = (id) => {
        this.setState({
            cat_id: this.state.cat_id === id ? null : id
        })
    }

    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        const list = this.state.category.map((v, index) => {
            return (
                <div key={index + '_shops'} className={this.state.cat_id === v.id ? "active_tb tab_category_title" : "tab_category_title"} onClick={() => this.onSubmitTab(v.id, v.shops)}>
                    <div className="div_t">{v.title} - {v.shops.length}</div>
                </div>
            )
        });
        const shopList = this.state.shop_list.map((v, index) => {
            return (
                <div key={index + '_shops_items'} className="tab_category_items" onClick={()=> window.open(v.link+'?ref=postatime.ge', "_blank")}>
                    <div className="link_title">{v.title}</div>
                    <div className="link_url">{v.link}</div>
                </div>
            )
        })
        const list_mobile = this.state.category.map((v, index) => {
            return (
                <>
                <div key={index + '_shops'} className={this.state.cat_id === v.id ? "active_tb tab_category_title_mobile" : "tab_category_title_mobile"} onClick={() => this.onSubmitTabmobile(v.id)}>
                    <div className="div_t">{v.title} - {v.shops.length}</div>
                </div>
                <Collapse isOpen={this.state.cat_id === v.id}>
                    <div className="mobile_tabs_body">
                    {
                        v.shops.length ? v.shops.map((v, index) => {
                            return (
                                <div key={index + '_shops_items_mobile'} className="tab_category_items_mobile" onClick={()=> window.open(v.link+'?ref=postatime.ge', "_blank")}>
                                    <div className="link_title_mobile">{v.title}</div>
                                    <div className="link_url_mobile">{v.link}</div>
                                </div>
                            )
                        }) : <div className="tab_list_empty_mobile">{i18n.t('list_empty')}</div>
                    }
                    </div>
                </Collapse>
                </>
            )
        });
        return (
            <div className="rigth_side_conetent_body">
                <h1>{i18n.t('shops')}</h1>
                <div className="tab_category_block">
                    <div className="tab_category_left">{list}</div>
                    <div className="tab_category_right clearfix">{shopList.length ? shopList : <div className="tab_list_empty">{i18n.t('list_empty')}</div>}</div>
                </div>

                <div className="tab_category_block_mobile">
                    <div className="tab_category_left_mobile">{list_mobile}</div>
                </div>
            </div>
        )
    }

}
export default PricesComponent;