import * as React from 'react';
import { Input } from 'reactstrap';
import { isEmpty } from 'lodash';
const errors = [];
class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errori: false
        }
    }

    onChangeNumberInput = (event) => {
        
        if (/^\d+$/.test(event.target.value) || event.target.value === '') {
            this.props.onChange(event.target.value);
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
    render() {
        let {
            onChange,
            onBlur,
            editable,
            labels,
            label,
            notLabeled,
            meta,
            ...rest
        } = this.props;
        
        let errors = meta.error !== undefined ? meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        }) : null;
        
        return (
            <div className={!isEmpty(errors) ? 'input-error' : null}>
                 {labels ? <div className="form-lab"><div>{rest.placeholder}:</div>{this.isRequired() && <div className="required">*</div>}</div> : null }
                 <Input
                    
                    ref={this.input}
                    {...rest}
                    onChange={(event) => this.onChangeNumberInput(event)}
                    autoComplete="off"
                />
            </div>
        );
    }
}

export default InputText;