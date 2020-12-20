import * as React from 'react';
import { Link } from 'react-router-dom';
import { Teamplate  } from './../components/index'
class PageNotFoundContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render () {
        return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <div style={{fontSize: '7em', fontWeight: 'bold'}}>404</div>
                <div style={{fontSize: '2em', fontWeight: 'bold'}}>Sorry...</div>
                <div style={{fontSize: '1em', fontWeight: 'bold'}}>
                    The page you were looking for doesn't exist
                </div>
                <Link to="/">Go to home</Link>
            </div>
        </div>
        )
    }
}
export default PageNotFoundContainer;