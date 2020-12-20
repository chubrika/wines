import * as React from 'react';
import { Input } from 'reactstrap';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
const errors = [];
class RadioInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cheak: false,
            gender_id: null
        }
    }

    componentDidMount = () => {
        setTimeout((v) => {
            if (this.props.meta && this.props.meta.initial !== undefined) {
                this.setState({
                    gender_id: Number(this.props.meta.initial.id)
                })
            }
        },600)
 
    }

    isRequired = () => {
        if (this.props.validations && this.props.validations[0].type === 'required') {
            return true;
        }
        else {
            return false;
        }
    }

    onChangeRadio = (v) => {
        this.setState({
            gender_id: v.id
        }, () => {
            this.props.onChange(v);
        });
        
    }

    activeRadio = () => {
        if (this.state.gender_id) {
            return this.state.gender_id;
        }
        else {
            this.props.onChange(this.props.data[0]);
            return this.props.data[0].id
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
            data,
            ...rest
        } = this.props;
        
        let errors = meta.error !== undefined ? meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        }) : null;
        console.log('PROS', this.props);
        const datagg = data.map((v) => {
            return (
                <div key={v.id.toString()+'_City_model'} className="button_block" onClick={() => this.onChangeRadio(v)}>
                    <div className={this.activeRadio() === v.id ? 'radio rds_active' : 'radio'}>
                        <div className={this.activeRadio() === v.id ? 'rd_active rd_op_active' : 'rd_active'}></div>
                    </div>
                    <div className="radio_text">{v.name}</div>
                </div>
            );
        })
        return (
            <div className={!isEmpty(errors) ? 'my_radio_button input-error' : 'my_radio_button'}>
                {datagg}
            </div>
        );
    }
}

export default RadioInput;