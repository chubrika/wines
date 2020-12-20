import * as React from 'react';
import { Card, Row, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import { isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';
const errors = [];
class InputNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errori: false
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
            label,
            notLabeled,
            placeholder,
            meta,
            value,
            labels,
            theme,
            frmt,
            decimalScale,
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
                <NumberFormat
                    className="board_input form-control" 
                    value={value} 
                    thousandSeparator={true}
                    placeholder={''}
                    onValueChange={(values) => this.onChnageText(values.value)}
                    format={frmt}
                    decimalScale={decimalScale}
                    allowEmptyFormatting
                />
            </div>
        );
    }
}

export default InputNumber;