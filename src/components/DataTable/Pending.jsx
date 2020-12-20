import React, { Component } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { isEmpty, sumBy, chain, groupBy, find } from 'lodash';
import * as i18n from 'i18n-js';
import Moment from 'react-moment';
import 'moment/locale/ka';
class Pending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        function findesm(key) {
            let mm = find(props.data, function(o) { return o.flight_number === key; });
            return mm;
        }
        var rr = chain(props.data).groupBy("flight_number").map((value, key) => ({ 
            name: key, 
            stimated_date: findesm(key).stimated_date,
            end_date: findesm(key).end_date,
            status: findesm(key).status,
            data: value 
        })).value();



        console.log(rr);
        return {
            tracking: props.data ? rr : []
        }
    }


    countSumPriceList = (data) => {
        return sumBy(data.products, function (o) { return Number(o.price); });
    }

    calculationPayedPrice = (item) => {
        if (item.pay === '0' && item.payable_gel <= 0) {
            return null;
        }
        else if (item.pay === '0' && item.payable_gel > 0) {
            return (
                <div className="payale_gel">
                    <span style={{color: '#f44336'}}>{i18n.t('payable')}: {item.payable_gel}₾ {' '}</span>
                    {/* {item.declaration === '1' && <Link to={'/invoice/'+item.id+''}>{i18n.t('invoice')}</Link>} */}
                </div>
            )
        }
        else if (item.pay === '1' && item.payable_gel > 0) {
            return null
        }
    }

    payButton = (item) => {
        if (item.declaration === '1' && item.payable_gel > 0 && item.pay === '0') {
            return (
                <div className="red_button tracking_add_button" style={{marginLeft: 10}} onClick={(e) => this.props.getPayment(item.id)}>{i18n.t('pay')}</div> 
            )
        }
    }

    generatetButtons = (item) => {
        if (item.declaration === '0') {
            return (
                <div className='red_button tracking_add_button' onClick={() => this.props.openTrackingDetails(item)}>{i18n.t('declaration')}</div>
            )
        }
        else {
            return (
                <div className='green_button tracking_add_button' onClick={() => this.props.openTrackingDetails(item)}>{i18n.t('detail')}</div>
            )
        }
    }

    render() {

        const {
            handleSubmit
        } = this.props;

        
        const trackingList = this.state.tracking.map((v, index) => {
            return (
                <div key={v+'_'+index} className="pckg_bl">
                    <div className="item_block_header">
                            <div className="fl_number">{v.name}</div>
                            {v.status !== '5' && <div className="est_date">
                                <div>{v.end_date ? i18n.t('come') : 'ჩამოსვლის სავარაუდო თარიღი'}</div>
                                <Moment locale="ka" format="DD/MM/YYYY">{v.stimated_date}</Moment>
                            </div>}
                        </div>
                    <div>
                        {
                            v.data.map((item) => {
                                return (
                                    <div className="package_block_item">
                                        <div className="image"><img src={require("../../assets/images/shop.svg")}/></div>
                                        <div className="title_block">
                                            <div className="tracking_title">{item.tracking}</div>
                                            <div className="block_declaration">
                                                {item.declaration === '1' ? <b style={{fontSize: 15, color: '#2c3e50'}}>{this.countSumPriceList(item).toFixed(2)}$</b> : <span style={{color: '#f44336'}}>{i18n.t('not_declared')}</span>}
                                                {this.calculationPayedPrice(item)}
                                            </div>
                                        </div>
                                        <>
                                            {this.generatetButtons(item)}
                                            {this.payButton(item)}
                                        </>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        });
        return (
            <div className="package-block">
                {!isEmpty(trackingList) ? trackingList : <div className="list_empty_package">{i18n.t('list_empty')}</div>}
            </div>
        );
    }
}
export default Pending;
