import * as React from 'react';
class FieldErrors extends React.Component {
    render() {
        let {
            meta
        } = this.props;

        let errors = meta.error.filter(error => {
            return error.showAfter === 'blur' && meta.touched || error.showAfter === 'submit' && meta.submitFailed;
        });

        if (!errors.length) {
            return null;
        }

        return (
            <div className="input-error-text">
                {errors.map(error => (
                    error.message !== 'err' && <div key={error.message}>{error.message}</div>
                ))}
            </div>
        );
    }
}

export default FieldErrors;