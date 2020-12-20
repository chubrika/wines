import * as React from 'react';

class FieldLabelAndInputContainer extends React.Component {
    render() {
        let {
            labelPosition,
            children
        } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}

export default FieldLabelAndInputContainer;
