import * as React from 'react';
import InputText from './InputTypes/Input';
import Select from './InputTypes/Select'
import MultiInput from './InputTypes/MultiInputForm'
import DateTimePicker from './InputTypes/DateTimePicker';
import InputNumber from './InputTypes/InputNumber'
import CheackBox from './InputTypes/CheackBox'
import TextArea from './InputTypes/TextArea'
import Number from './InputTypes/Number'
import RadioInput from './InputTypes/RadioInput'


class Input extends React.Component{
    render() {
        let {
            type,
            ...rest
        } = this.props;
        switch (type) {
            case 'text':
                return <InputText {...rest} />
            case 'number':
                return <Number {...rest} />
            case 'password':
                return <InputText {...rest} type={type}/>
            case 'select':
                return <Select {...rest} />
            case 'multiinput':
                return <MultiInput {...rest} />
            case 'datepicker':
                return <DateTimePicker {...rest} />
            case 'maskinput':
                return <InputNumber {...rest} />
            case 'cheackbox':
                return <CheackBox {...rest} />
            case 'textarea':
                return <TextArea {...rest} />
            case 'radio':
                return <RadioInput {...rest} />
    
                
            default:
                throw new Error(`Input with type "${type}" not found.`);
        }
    }
}

export default Input;
