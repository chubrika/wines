import * as React from 'react';
import { Container, Col, Row, Spinner, Card, Button, Form, Accordion } from 'react-bootstrap';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import Slider from '@material-ui/core/Slider';
import { Api } from '../../../state/Api';

class WinesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wines: [],
            categories: [],
            species: [],
            regions: [],
            activeFilter: [],
            PriceRanger: 7
        }
        this.initialization();
    }
    initialization() {
        Api.Info.getCompanies()
            .then(categories => {
                console.log('categories', categories)
                this.setState({ categories: categories })
            });
        Api.Info.getWinesInfo()
            .then(wines => {
                console.log('aaaa', wines);
                this.setState({ wines: wines })
                this.setState({ activeFilter: wines })
            });

        Api.Info.getSpecies()
            .then(species => {
                this.setState({ species: species })
            });
        Api.Info.getRegionList()
            .then(regions => {
                this.setState({ regions: regions })
            });
    }
    onFilterChange(filter) {
        const { filterList, activeFilter } = this.state;
        // this.setState({
        //     wines: this.state.wines.filter(item => item.categoryId == 1)
        // });
        // console.log(this.state.categories);
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
        console.log(filter);
    }
    handleChange(event) {
        console.log('ada', event);
    }

    render() {

        return (
            <>
                <Container className="mt-5">
                    <Row>
                        <Col sm={2}>
                            <div className="filter-box">
                                <div className="p-2" >
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h6>   ფასი   </h6>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <PriceRangeSlider ></PriceRangeSlider>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                                <div className="p-2" >
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h6>   წელი   </h6>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <YearRangeSlider></YearRangeSlider>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                                <div className="p-2" >
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h6> მეღვინეობა   </h6>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {this.state.categories.map((data) => {
                                                        return (
                                                            <div>
                                                                <Form.Group className="mb-0" controlId={'categorie' + data.id}>
                                                                    <Form.Check onChange={this.handleChange} type="checkbox" label={data.companyName} />
                                                                </Form.Group>
                                                            </div>
                                                        );
                                                    })}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>


                                </div>
                                <div className="p-2" >
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h6>  სახეობა  </h6>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {this.state.species.map((data) => {
                                                        return (
                                                            <div>
                                                                <Form.Group className="mb-0" controlId={'specie' + data.id}>
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        check={this.state.activeFilter.includes(data.id)}
                                                                        onClick={() => this.onFilterChange(data.id)}
                                                                        label={data.specieName} />
                                                                </Form.Group>
                                                            </div>
                                                        );
                                                    })}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                                <div className="p-2" >
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <h6>  რეგიონი  </h6>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {this.state.regions.map((data) => {
                                                        return (
                                                            <div>
                                                                <Form.Group className="mb-0" controlId={'region' + data.id}>
                                                                    <Form.Check type="checkbox" label={data.regionName} />
                                                                </Form.Group>
                                                            </div>
                                                        );
                                                    })}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            </div>
                            <Button onClick={this.onFilterChange} variant="primary">გაფილტვრა</Button>
                        </Col>
                        <Col sm={10}>
                            <div className="row">
                                {this.state.wines.map((data) => {
                                    return (
                                        <Col sm={4}>
                                            <div className="widget">
                                                <div className="widget-image">
                                                    <Image cloudName="geoculture" publicId={data.imageId} >
                                                        <Transformation width="80" height="250" crop="scale" />
                                                    </Image>
                                                </div>
                                                <div className="widget-body">
                                                    <div className="flex flex-d--column">
                                                        <span className="widget-title">{data.specieName}</span>
                                                        <span className="widget-year">{data.year}</span>
                                                        <span className="widget-type">{data.wineType}</span>
                                                        <span className="widget-company">{data.companyName}</span>
                                                    </div>
                                                    <span className="widget-price">{data.price} ₾</span>
                                                    <Button variant="primary">კალათაში დამატება</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}


function PriceValuetext(value) {
    return `${value}°C`;
}
function PriceRangeSlider() {
    const [value, setValue] = React.useState([50, 200]);
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };
    return (
        <div >
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={20}
                max={500}
                getAriaValueText={PriceValuetext}
            />
        </div>
    );
}

function YearValuetext(value) {
    return `${value}WFWFW`;
}
function YearRangeSlider() {
    const [value, setValue] = React.useState([1993, 2015]);
    const YearHandleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div >
            <Slider
                value={value}
                onChange={YearHandleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1800}
                max={2020}
                getAriaValueText={YearValuetext}
            />
        </div>
    );

}
export default WinesList;