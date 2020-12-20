import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import * as i18n from 'i18n-js';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash';

@(connect)(
    (state) => {
        return {
            user: state.currentUser.data,
            count: state.userCounts.data
        };
    },
    (dispatch) => ({})
)
class LoggedTabRoutes extends React.Component {
    
    render() {
        console.log(this.props);
        const activeHome = this.props.match === '/' ? 'active' : null;
        let cou = !isEmpty(this.props.count) ? this.props.count : {};
        return (
            <>
            <div className="tabPan row pad-4">
                <div className="col">
                    <Link className={"item "+activeHome} to="/">
                        {cou.awaiting > 0 && <div className="icon_m">
                            <img src={require('../assets/images/supplier.svg')} alt="" style={{width: 25}} />
                        </div>}
                        {i18n.t('awaiting_packages')}
                        <div className="ccount">{cou.awaiting}</div>
                    </Link>
                </div>
                <div className="col">
                    <NavLink className="item" to="/warehouse">
                        {cou.warehouse > 0 && <div className="icon_m">
                            <img src={require('../assets/images/factory.svg')} alt="" style={{width: 25}} />
                        </div>}
                        {i18n.t('usa_warehouse')}
                        <div className="ccount">{cou.warehouse}</div>
                    </NavLink>
                </div>
                <div className="col">
                    <NavLink className="item" to="/pending">
                        {cou.pending > 0 && <div className="icon_m">
                            <img src={require('../assets/images/message.svg')} alt="" style={{width: 35, transform: 'rotate(10deg)'}} />
                        </div>}
                        {i18n.t('pending')}
                        <div className="ccount">{cou.pending}</div>
                    </NavLink>
                </div>
                <div className="col">
                    <NavLink className="item" to="/arrived">
                        {cou.arrived > 0 && <div className="icon_m">
                            <img src={require('../assets/images/message.svg')} alt="" style={{width: 35, transform: 'rotate(62deg)'}} />
                        </div>}
                        {i18n.t('arrived')}
                        <div className="ccount">{cou.arrived}</div>
                    </NavLink>
                </div>
                <div className="col">
                    <NavLink className="item" to="/received">
                        {cou.received > 0 && <div className="icon_m">
                            <img src={require('../assets/images/box.svg')} alt="" style={{width: 25}} />
                        </div>}
                        {i18n.t('received')}
                        <div className="ccount">{cou.received}</div>
                    </NavLink>
                </div>
            </div>
            <div className="mobile_tab_panel">
                <div className="taping">
                    <div className="tab_items">
                        <Link className={"item_m "+activeHome} to="/">
                            <div className="item_text">{i18n.t('awaiting_packages')}</div>
                            <div className="item_icon"><img src={require('../assets/images/supplier.svg')} alt="" /></div>
                            <div className="ccount">{cou.awaiting}</div>
                        </Link>
                    </div>
                    <div className="tab_items">
                        <NavLink className="item_m" to="/warehouse">
                            <div className="item_text">{i18n.t('usa_warehouse')}</div>
                            <div className="item_icon"><img src={require('../assets/images/factory.svg')} alt="" /></div>
                            <div className="ccount">{cou.warehouse}</div>
                        </NavLink>
                    </div>
                    <div className="tab_items">
                        <NavLink className="item_m" to="/pending">
                            <div className="item_text">{i18n.t('pending')}</div>
                            <div className="item_icon"><img src={require('../assets/images/message.svg')} alt="" style={{transform: 'rotate(32deg)'}} /></div>
                            <div className="ccount">{cou.pending}</div>
                        </NavLink>
                    </div>
                    <div className="tab_items">
                        <NavLink className="item_m" to="/arrived">
                            <div className="item_text">{i18n.t('arrived')}</div>
                            <div className="item_icon"><img src={require('../assets/images/message.svg')} alt="" style={{transform: 'rotate(62deg)'}} /></div>
                            <div className="ccount">{cou.arrived}</div>
                        </NavLink>
                    </div>
                    <div className="tab_items">
                        <NavLink className="item_m" to="/received">
                            <div className="item_text">{i18n.t('received')}</div>
                            <div className="item_icon"><img src={require('../assets/images/box.svg')} alt="" /></div>
                            <div className="ccount">{cou.received}</div>
                        </NavLink>
                    </div>
                </div>
            </div>
            </>
        )
    }

}
export default LoggedTabRoutes;