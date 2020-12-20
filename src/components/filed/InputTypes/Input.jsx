import * as React from 'react';
import { Input } from 'reactstrap';
import { isEmpty } from 'lodash';
const errors = [];
class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errori: false,
            text: ''
        }
    }



    isRequired = () => {
        if (!isEmpty(this.props.validations) && this.props.validations[0].type === 'required') {
            return true;
        }
        else {
            return false;
        }
    }

    onChnageText = (values) => {
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
            theme,
            onChangeValue,
            ...rest
        } = this.props;
        const them = theme ? theme : "light";
        let errors = meta.error !== undefined ? meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        }) : null;
        return (
            <div className={!isEmpty(errors) ? "input-error theme-"+them : "theme-"+them}>
                 <div className={'lb'}>{rest.plholder} {this.isRequired() && <span className="required">*</span>}</div>
                 <Input
                    ref={this.input}
                    {...rest}
                    className="board_input"
                    onChange={(event)=> this.onChnageText(event.target.value)}
                    autoComplete="off"
                    placeholder={''}
                />
            </div>
        );
    }
}

export default InputText;