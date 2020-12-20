import * as React from 'react';
import FieldErrors from './FieldErrors';
import FieldLabel from './FieldLabel';
import Input from './Input';
import FieldLabelAndInputContainer from './FieldLabelAndInputContainer';

class Field extends React.Component {
    static defaultProps = {
        label: true,
        labelPosition: 'top',
        placeholder: true
    }

    renderInput() {
        let {
            type,
            placeholder,
            caption,
            input,
            label,
            labelPosition,
            ...rest
        } = this.props;

        let props = {
            ...input,
            label,
            type: type,
            ...rest
        };
        return (
            <Input 
                {...input}
                type={type}
                {...props}
                placeholder={placeholder}
            />
        );
    }

    renderLabel() {
        let {
            caption,
            label,
            validations,
            underlinedCaption
        } = this.props;

        if (caption === '' || caption === undefined) {
            label = false;
        }

        if (label === false) {
            return null;
        }

        return (
            <FieldLabel
                text={label === true ? caption : label}
                underlinedCaption={underlinedCaption}
                validations={validations}
            />
        );
    }

    renderErrors() {
        let {
            meta
        } = this.props;

        if (!meta || !meta.error || !meta.error.length) {
            return null;
        }

        return (
            <FieldErrors
                meta={meta}
            />
        );
    }

    render() {
        let {
            labelPosition
        } = this.props;

        return (
            <div>
                <FieldLabelAndInputContainer>
                    {this.renderInput()}
                </FieldLabelAndInputContainer>
                {this.renderErrors()}
            </div>
        );
    }
}

export default Field;