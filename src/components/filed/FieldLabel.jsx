import * as React from 'react';

class FieldLabel extends React.Component{
    render() {
        let {
            text,
            validations,
            underlinedCaption
        } = this.props;

        return (
            <div>
                {text} {underlinedCaption}
            </div>
        );
    }
}

export default FieldLabel;
