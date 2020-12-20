import * as React from 'react';
import { Input } from 'reactstrap';
import { isEmpty } from 'lodash';
import DinamycSelect from 'react-select';
import * as Cookies from "js-cookie";
import Api from '../../../state/Api/Api'


class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errori: false,
            data: []
        }
    }

    onChangeSelect = (item) => {
        if (this.props.onChangeValue) {
            this.props.onChangeValue(item);
        }
        this.props.onChange(item);
    }

    componentWillUnmount = () => {
        this.setState({data: []});
    }


    fetchData = async () => {
        Api.Info.getCity(this.props.model).then((v) => {
            let mm = v.map((v) => {
                return {
                    id: v.id ? v.id : null,
                    id_name: v.id_name ? v.id_name : null,
                    value: v.name,
                    label: v.name
                }
            })
            this.setState({
                data: mm
            })
        })
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
            placeholder,
            isDisabled,
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
                <div className={'lb'} style={{zIndex: 11}}>{rest.plholder} {this.isRequired() && <span className="required">*</span>}</div>
                <DinamycSelect
                    onChange={(event) => this.onChangeSelect(event)}
                    value={value}
                    onMenuOpen={this.fetchData}
                    options={this.state.data}
                    placeholder={''}
                    isClearable={true}
                    isSearchable={true}
                    isDisabled={isDisabled}
                    styles={{
                        container: () => ({
                            // zIndex: 10,
                            // position: 'relative'
                        }),
                        menu: provided => ({ ...provided, zIndex: "9999 !important" }),
                        control: (base, state) => ({
                            ...base,
                            '&:hover': { borderColor: '#e2e5ec' }, // border style on hover
                            border: state.isActived ? '1px solid #9aabff' : '1px solid #e2e5ec', // default border color
                            boxShadow: 'none', // no box-shadow
                            height: 40,
                            borderRadius: 3,
                            width: '100%',
                            
                        }),
                        placeholder: (base, state) => ({
                            ...base,
                            color: '#c9ccd4'
                        })
                    }}
                />
            </div>
        );
    }
}

export default Select;