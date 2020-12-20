import * as React from 'react';
import { LoggedTabRoutes, AwaitingPackages } from './../../../../components'
import * as i18n from 'i18n-js';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Api } from '../../../../state/Api'
import { setCunt, clearCount} from '../../../../state/actions/Counts'
import { bindActionCreators } from 'redux';
import { Awaiting, Pending }  from './../../../../components/DataTable/index'
@(connect)(
    state => {
      return {
        user: state.currentUser.data
      };
    },
    dispatch => ({
        setCunt: bindActionCreators(setCunt, dispatch),
        clearCount: bindActionCreators(clearCount, dispatch)
    })
  )
class DashboardCountainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: {}
        }
    }

    componentDidMount = () => {
        Api.Info.getUserCounts().then((v) => {
            if (v.status) {
                this.props.setCunt(v.data)
            }
        });
        Api.Tracking.getMyProductList(1).then((v) => {
            if (v.status) {
                this.setState({
                    tracking: v.data
                })
            }
        })
    }

    openTrackingDetails = (item) => {
        this.props.history.push('/declaration/'+item.id);
    }

    render() {
        return (
            <div className="tab_pan">
                <LoggedTabRoutes match={this.props.match.path}/>
                <div className="tab_pan_body">
                    <div className="panel_title_m">{i18n.t('awaiting_packages')}</div>
                    <Awaiting data={this.state.tracking} openTrackingDetails={(v) => this.openTrackingDetails(v)}/>
                </div>
            </div>
        )
    }
}
export default DashboardCountainer;