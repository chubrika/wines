import * as React from 'react';
import { reduxForm, reset, change } from 'redux-form';
import { connect } from 'react-redux';
import * as i18n from 'i18n-js';
import { isEmpty, sumBy, debounce, sortBy } from 'lodash';
import { Api } from '../state/Api'
import SweetAlert from 'react-bootstrap-sweetalert';
import Fields from './filed';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { SlidingPane } from './index'
import { Awaiting, Pending }  from '../components/DataTable/index'
import { setCunt, clearCount} from '../state/actions/Counts'
import './notify/notifications.scss';
import { bindActionCreators } from 'redux';
@(connect)(
    state => {
      return {
        user: state.currentUser.data,
        count: state.userCounts.data
      };
    },
    dispatch => ({
        setCunt: bindActionCreators(setCunt, dispatch),
        clearCount: bindActionCreators(clearCount, dispatch)
    })
  )
@reduxForm({
    form: 'ADD_PARCEL_FORM'
})
class AwaitingPackages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            site: [],
            tracking_number: '',
            tracking: [],
            isPaneOpen: false,
            trackingInfo: {},
            tracking_items_price: 0.00,
            tracking_items_category: {},
            tracking_items_shop: {},
            deleteAlert: null,
            paymentAlert: null,
            windowSize: window.innerWidth,
            office_address: false
        }
        this.onChangeComments = debounce(this.onChangeComments, 1000);
        this.windowResize = window.addEventListener('resize', this.windowResize)
        
    }

    componentDidMount = () => {
        this.getMyOrders();
    }

    windowResize = () => {
        this.setState({
            windowSize: window.innerWidth
        })
    }

    getMyOrders = () => {
        this.props.clearCount();
        Api.Info.getUserCounts().then((v) => {
            if (v.status) {
                this.props.setCunt(v.data)
            }
        });
        Api.Tracking.getMyProductList(this.props.list).then((v) => {
            if (v.status) {
                this.setState({
                    tracking: v.data
                })
            }
        })
    }

    onSaveTrackingNumber = () => {
        if (this.state.tracking_number) {
            Api.Tracking.AddTracking(this.state.tracking_number).then((v) => {

                if (v.status) {
                    NotificationManager.success(v.message);
                    this.getMyOrders();
                }
                else {
                    NotificationManager.error(v.message);
                }

            })
        }
        else {
            NotificationManager.error(i18n.t('empty_tracking_number'));
        }
    }

    removeTracking = () => {
        this.setState({
            deleteAlert: (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText={i18n.t('yes')}
                    cancelBtnText={i18n.t('no')}
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    btnSize="sm"
                    title={i18n.t('alert')}
                    onConfirm={() => this.removeTrackingOk()}
                    onCancel={() => this.setState({ deleteAlert: null })}
                >
                    {i18n.t('tracking_remove_text')}
                </SweetAlert>
            )
        });
    }

    removeTrackingOk = () => {
        Api.Tracking.RemoveTracikngInfo(this.state.trackingInfo.id).then((v) => {
            if (v.status) {
                NotificationManager.success(v.message);
                this.setState({
                    category: [],
                    site: [],
                    tracking_number: '',
                    tracking_comments: '',
                    additional_security: false,
                    cut_down: false,
                    repack: false,
                    tracking: v.data,
                    isPaneOpen: false,
                    trackingInfo: {},
                    tracking_items_price: 0.00,
                    tracking_items_category: {},
                    tracking_items_shop: {},
                    deleteAlert: null
                })
            }
            else {
                NotificationManager.error(v.message);
            }
        })
    }

    openTrackingDetails = (item) => {

    }


    onChangeAdditionalSecurity = (value) => {
        Api.Tracking.onChangeAdditionalSecurity(this.state.trackingInfo.id, value);
    }

    cutDownPackage = (value) => {
        Api.Tracking.cutDownPackage(this.state.trackingInfo.id, value);
    }

    onChnageRepack = (value) => {
        Api.Tracking.onChnageRepack(this.state.trackingInfo.id, value);
    }

    onChnageCourierService = (value) => {
        Api.Tracking.onChnageCourierService(this.state.trackingInfo.id, value).then((res) => {
            this.setState({
                trackingInfo: {
                    ...this.state.trackingInfo,
                    courier_service: res.data
                }
            })
        });
    }

    onChangeComments = (value) => {
        Api.Tracking.onChangeComments(this.state.trackingInfo.id, value);
    }

    onChangeBranches = (value) => {
        Api.Tracking.onChangeBranches(this.state.trackingInfo.id, value).then((res) => {
            if (res.status) {
                this.setState({
                    office_address: true
                })
            }
            else {
                this.setState({
                    office_address: false
                })  
            }
        });
        
    }

    formDeclaration = () => {
        if (isEmpty(this.state.trackingInfo.products)) {
            NotificationManager.error('ამანათის დეკლარირება შეუძლებელია. ერთი ნივთი მაინც უნდა იყოს დამატებული რომ შეძლოთ დეკლარაცია');
            return;
        }
        // if (!this.state.office_address) {
        //     NotificationManager.error('აირჩიეთ ფილიალი');
        //     return;
        // }
        Api.Tracking.FormDeclaration(this.state.trackingInfo.id).then((v) => {
            if (v.status) {
                NotificationManager.success(v.message);
                this.setState({
                    category: [],
                    site: [],
                    tracking_number: '',
                    tracking_comments: '',
                    additional_security: false,
                    cut_down: false,
                    repack: false,
                    tracking: v.data,
                    isPaneOpen: false,
                    trackingInfo: {},
                    tracking_items_price: 0.00,
                    tracking_items_category: {},
                    tracking_items_shop: {},
                    deleteAlert: null,
                    office_addres: false
                }, () => {
                    this.getMyOrders();
                })
            }
            else {
                NotificationManager.success(v.error);
            }
        })
    }

    countSumPrice = () => {
        return sumBy(this.state.trackingInfo.products, function (o) { return Number(o.price); });
    }

    countSumPriceList = (data) => {
        return sumBy(data.products, function (o) { return Number(o.price); });
    }

    getPayment = (id) => {
        this.setState({
            paymentAlert: (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText={i18n.t('yes')}
                    cancelBtnText={i18n.t('no')}
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    btnSize="sm"
                    title={i18n.t('alert')}
                    onConfirm={() => this.getPaymentOk(id)}
                    onCancel={() => this.setState({ paymentAlert: null })}
                >
                    {i18n.t('do_you_really_want_to_pay')}
                </SweetAlert>
            )
        });
    }

    getPaymentOk = (id) => {
        this.setState({
            paymentAlert: null
        }, () => {
            Api.Tracking.getPayments(id).then((v) => {
                if (v.status) {
                    NotificationManager.success(v.message);
                    window.location.reload(false);
                }
                else {
                    NotificationManager.error(v.message);
                }
            })
        })

    }

    generateTable = () => {
        if (this.props.list === 1 || this.props.list === 2) {
            return <Awaiting data={this.state.tracking} openTrackingDetails={(v) => this.openTrackingDetails(v)}/>
        } 
        else if (this.props.list === 3 || this.props.list === 4 ||  this.props.list === 5) {
            return <Pending data={this.state.tracking} getPayment={(item) => this.getPayment(item)} openTrackingDetails={(v) => this.openTrackingDetails(v)}/>
        }
    }

    render() {
        return (
            <>
                {this.props.showTitle && <div className="panel_title_m">{this.props.showTitle}</div>}
                {this.generateTable()}
                {this.state.paymentAlert}
            </>
        )
    }

}
export default AwaitingPackages;