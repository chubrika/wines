import * as React from 'react';
import { isEmpty } from 'lodash';
import * as Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
require('moment/locale/ru')
const errors = [];
class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errori: false,
            local: 'ka'
        }
    }

    componentDidMount = () => {
        const value = localStorage.getItem('LANG');
        let item = JSON.parse(value);
        
        if (!isEmpty(item)) {
            this.setState({ local: item.lang.name })
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
            theme,
            ...rest
        } = this.props;
        
        let errors = meta.error !== undefined ? meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        }) : null;
        const them = theme ? theme : "light";
        return (
            <div className={!isEmpty(errors) ? "input-error theme-"+them : "theme-"+them}>
                <div className={'lb'}>{rest.plholder} {this.isRequired() && <span className="required">*</span>}</div>
                 <Datetime
                    {...rest}
                    value={value ? new Date(value) : null}
                    onChange={(event)=> onChange(event._d)}
                    autoComplete="off"
                    locale={this.state.local}
                    closeOnSelect={true} 
                    timeFormat={false}
                    inputProps={{placeholder: rest.placeholder}}
                />
            </div>
        );
    }
}

export default InputText;