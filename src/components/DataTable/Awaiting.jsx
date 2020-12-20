import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { isEmpty, sumBy } from 'lodash';
import * as i18n from 'i18n-js';
import Moment from 'react-moment';
class Awaiting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            tracking: props.data ? props.data : []
        }
    }


    countSumPriceList = (data) => {
        return sumBy(data.products, function (o) { return Number(o.price); });
    }

    render() {
        const {
            handleSubmit
        } = this.props;
        const trackingList = !isEmpty(this.state.tracking) ? this.state.tracking.map((v, index) => {
            return (
                <div key={v+'_'+index} className="pckg_bl">
                    <div className="package_block_item">
                        <div className="image"><img src={require("../../assets/images/shop.svg")}/></div>
                        <div className="title_block">
                            <div className="tracking_title">{v.tracking}</div>
                            <div className="block_declaration">
                                {v.declaration === '1' ? <b style={{fontSize: 15, color: '#2c3e50'}}>{this.countSumPriceList(v).toFixed(2)}$</b> : <span style={{color: '#f44336'}}>{i18n.t('not_declared')}</span>}
                                {/* {this.calculationPayedPrice(item)} */}
                            </div>
                        </div>
                        <div className={v.declaration === '0' ? 'red_button tracking_add_button' : 'green_button tracking_add_button'} onClick={() => this.props.openTrackingDetails(v)}>{v.declaration === '0' ? i18n.t('declaration') : i18n.t('detail') }</div>
                    </div>
                </div>
            )
        }) : [];
        return (
            <div className="package-block">
                {!isEmpty(this.state.tracking) ? trackingList : <div className="list_empty_package">{i18n.t('list_empty')}</div>}
            </div>
        );
    }
}
export default Awaiting;
