import * as React from 'react';
import { Input, Button } from 'reactstrap';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const errors = [];
class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: '',
            fild: [],
            formError: null
        }
    }

    addValueReduxForm = async () => {
        if (this.state.form) {
            let data = { 
                zip_code: this.state.form
            }

            let createArray = this.state.fild.concat(data);
            await this.setState({formError: null, form: '',  fild: createArray});
            this.props.onChange(createArray);
        }
        else {
            this.setState({formError: 'ველი არუნდა იყოს ცარიელი'});
        }
    }

    onChangeInputText = (event) => {
        this.setState({form: event.target.value, formError: null})
    }

    removeValueFromList = async (index) => {
        await this.setState({
            fild: this.state.fild.filter((s, sidx) => index !== sidx)
        });
        this.props.onChange(this.state.fild);
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


        const table_list = this.state.fild.map((v, index) => {
            return (
                <div className="table_body" key={index.toString()+'_multiAddForm'}>
                    <div style={{flex: 1}}>
                        <div>{index+1}. {v.zip_code}</div>
                    </div>
                    <div>
                        <div className="link_a" onClick={() => this.removeValueFromList(index)}>წაშლა</div>
                    </div>
                </div>
            )
        });
        return (
            <div className={!isEmpty(errors) || this.state.formError ? 'input-error' : null}>
                 {labels ? <div>{rest.placeholder}:</div> : null }
                 <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                        <Input
                            ref={this.input}
                            {...rest}
                            value={this.state.form}
                            onChange={(event)=> this.onChangeInputText(event)}
                            autoComplete="off"
                        />
                        {this.state.formError && <div className="input-error input-error-text">{this.state.formError}</div>}
                    </div>
                    <div>
                        <div className="addMultiInputButton" onClick={() => this.addValueReduxForm()}>
                            <FontAwesomeIcon color="#fff" style={{fontSize: 14}} icon={faPlus} />
                        </div>
                    </div>
                </div>
                {!isEmpty(this.state.fild) && <div id="table_list" className="custom_table">
                    <div className="table_header">დასახელება:</div>
                    {table_list}
                </div>}
            </div>
        );
    }
}

export default InputText;