import * as React from 'react';
import { Api } from '../../../state/Api';


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            open_menu: false
        }
    }

    render() {
        return (
            <div className="home_page">
                მთავარი გვერდი
            </div>

        )
    }

}
export default HomeComponent;