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
class UserPolicyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount = () => {
        Api.Info.getArgs(1).then((res) => {
            this.setState({
                text: res.text
            })
        })
    }

    render() {
        const {
            user,
            handleSubmit
        } = this.props;
        return (
            <div className="rigth_side_conetent_body">
                <h1>{i18n.t('user_policy')}</h1>
                <div dangerouslySetInnerHTML={{__html: this.state.text}}/>
            </div>
        )
    }

}
export default UserPolicyContainer;