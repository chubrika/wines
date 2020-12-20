import * as React from 'react';
import * as validationFns from '../validations';
import * as normalizerFns from '../normalizers';
import { Field as RawReduxFormField, GenericFieldHTMLAttributes } from 'redux-form';
import Field from './Field';

class ReduxFormField extends React.Component {
    state = {
        validate: null,
        validations: null
    }

    static combineValidations(validations, caption) {
        return (...args) => {
            let errors = [];

            validations.forEach(validation => {
                let message = validationFns[validation.type](caption, validation).apply(null, args);

                if (!message) {
                    return;
                }

                errors.push({
                    ...validation,
                    message: validation.message || message
                });
            });

            // Return undefined if there is no error
            if (!errors.length) {
                return;
            }

            return errors;
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let validations = ReduxFormField.normalizeValidations(nextProps.validations);
        if (JSON.stringify(validations) !== JSON.stringify(prevState.validations)) {
            return {
                validations,
                validate: ReduxFormField.combineValidations(validations, nextProps.caption)
            };
        }
        return null;
    }

    static defaultProps = {
        validations: [],
        normalizers: []
    }
    static normalizeValidations(validations) {
        return [].concat(validations).map(validation => {
            let parsed;

            if (typeof validation === 'string') {
                parsed = {
                    type: validation
                };
            }
            else {
                parsed = validation;
            }

            parsed.showAfter = parsed.showAfter || 'submit';
            return parsed;
        });
    }
    combineNormalizers() {
        return (value, previousValue) => {
            return [].concat(this.props.normalizers).map(normalizer => {
                if (typeof normalizer === 'string') {
                    return {
                        type: normalizer
                    };
                }

                return normalizer;
            }).reduce((value, normalizer) => {
                return normalizerFns[normalizer.type]({
                    normalizer,
                    fieldProps: this.props
                })(value, previousValue);
            }, value)
        };
    }

    render() {
        return (
            <RawReduxFormField 
                {...this.props} 
                validate={this.state.validate} 
                //normalize={this.combineNormalizers()} 
                validations={this.state.validations} 
                component={Field} 
            />
        );
    }
}

export default ReduxFormField;
