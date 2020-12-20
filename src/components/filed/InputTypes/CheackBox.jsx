import * as React from 'react';
import { Input } from 'reactstrap';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
const errors = [];
class CheackBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cheak: false
        }
    }

    isRequired = () => {
        if (this.props.validations && this.props.validations[0].type === 'required') {
            return true;
        }
        else {
            return false;
        }
    }


    onChnageText = (values) => {
        if (this.props.isDisabled) {
            return;
        }
        if (this.props.onChangeValue) {
            this.props.onChangeValue(values);
        }
        this.props.onChange(values);
    }

    render() {
        let {
            onChange,
            onBlur,
            editable,
            labels,
            label,
            notLabeled,
            meta,
            value,
            onChangeValue,
            plholder,
            isDisabled,
            ...rest
        } = this.props;
        
        let errors = meta.error !== undefined ? meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        }) : null;
        return (
            <div className={!isEmpty(errors) ? 'input-error' : null}>
                <div className="cheackbox_m clearfix" onClick={() => this.onChnageText(value ? false : true)}>
                    {value ? <div className="chj-cj"><FontAwesomeIcon color="#fff" icon={faCheck} /></div> : <div className="chj"></div>}
                    <div className="pl_hold form-lab">{plholder}</div>
                 </div>
            </div>
        );
    }
}

export default CheackBox;