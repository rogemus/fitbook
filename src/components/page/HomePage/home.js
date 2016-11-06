import React from 'react';
import Geosuggest from 'react-geosuggest';
import {findGyms} from '../../../actions/gyms_actions';
import {connect} from 'react-redux';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search_result: [],
            location: null
        };
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.renderGymSearchResult2 = this.renderGymSearchResult2.bind(this);
    }


    onSuggestSelect(suggest) {
        const viewport = suggest.gmaps.geometry.viewport;

        const location = {
            top_left: {
                latitude: viewport.b.b,
                longitude: viewport.b.f
            },
            bottom_right: {
                latitude: viewport.f.b,
                longitude: viewport.f.f
            }, center_of_search: {
                latitude: suggest.location.lat,
                longitude: suggest.location.lng,
                placeId: suggest.placeId
            }
        };

        return this.props.findGyms(location);
    }

    renderGymSearchResult2() {
        if (this.props.search_result) {
            console.log(this.props.search_result);
        }
    }

    renderGymSearchResult() {
        return (
            <div className="find-gym__result">
                <div className="find-gym__result__title">
                    <h1 className="title text-center">Gyms in your area</h1>
                </div>
                <div className="content">
                    <div className="col-md-3">
                        <div className="card find-gym__result__gym">
                            <div className="content">
                                <div className="find-gym__result__gym__image text-center icon-big">
                                    <img className="avatar border-white" src="../../assets/img/faces/face-2.jpg"
                                         alt="Gymsite 2"/>
                                </div>
                                <div className="find-gym__result__gym__desc text-center">
                                    <a href="/gyms/1">
                                        <h4>Gymsite 2</h4>
                                    </a>
                                    <hr />
                                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        At
                                        cupiditate ea itaque iure labore qui, ratione temporibus tenetur totam
                                        veritatis. A
                                        autem dicta harum neque nesciunt numquam obcaecati possimus recusandae.
                                    </p>
                                </div>
                                <div className="find-gym__result__gym__location">
                                    <hr />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155798.0005825091!2d16.761584961055007!3d52.40044577082501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhA!5e0!3m2!1spl!2spl!4v1478371298201"
                                        frameBorder={0} style={{border: 0}} allowFullScreen/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card find-gym__result__gym">
                            <div className="content">
                                <div className="find-gym__result__gym__image text-center icon-big">
                                    <img className="avatar border-white" src="../../assets/img/faces/face-2.jpg"
                                         alt="Gymsite 2"/>
                                </div>
                                <div className="find-gym__result__gym__desc text-center">
                                    <a href="/gyms/1">
                                        <h4>Gymsite 2</h4>
                                    </a>
                                    <hr />
                                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        At
                                        cupiditate ea itaque iure labore qui, ratione temporibus tenetur totam
                                        veritatis. A
                                        autem dicta harum neque nesciunt numquam obcaecati possimus recusandae.
                                    </p>
                                </div>
                                <div className="find-gym__result__gym__location">
                                    <hr />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155798.0005825091!2d16.761584961055007!3d52.40044577082501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhA!5e0!3m2!1spl!2spl!4v1478371298201"
                                        frameBorder={0} style={{border: 0}} allowFullScreen/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card find-gym__result__gym">
                            <div className="content">
                                <div className="find-gym__result__gym__image text-center icon-big">
                                    <img className="avatar border-white" src="../../assets/img/faces/face-2.jpg"
                                         alt="Gymsite 2"/>
                                </div>
                                <div className="find-gym__result__gym__desc text-center">
                                    <a href="/gyms/1">
                                        <h4>Gymsite 2</h4>
                                    </a>
                                    <hr />
                                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        At
                                        cupiditate ea itaque iure labore qui, ratione temporibus tenetur totam
                                        veritatis. A
                                        autem dicta harum neque nesciunt numquam obcaecati possimus recusandae.
                                    </p>
                                </div>
                                <div className="find-gym__result__gym__location">
                                    <hr />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155798.0005825091!2d16.761584961055007!3d52.40044577082501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhA!5e0!3m2!1spl!2spl!4v1478371298201"
                                        frameBorder={0} style={{border: 0}} allowFullScreen/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card find-gym__result__gym">
                            <div className="content">
                                <div className="find-gym__result__gym__image text-center icon-big">
                                    <img className="avatar border-white" src="../../assets/img/faces/face-2.jpg"
                                         alt="Gymsite 2"/>
                                </div>
                                <div className="find-gym__result__gym__desc text-center">
                                    <a href="/gyms/1">
                                        <h4>Gymsite 2</h4>
                                    </a>
                                    <hr />
                                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        At
                                        cupiditate ea itaque iure labore qui, ratione temporibus tenetur totam
                                        veritatis. A
                                        autem dicta harum neque nesciunt numquam obcaecati possimus recusandae.
                                    </p>
                                </div>
                                <div className="find-gym__result__gym__location">
                                    <hr />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155798.0005825091!2d16.761584961055007!3d52.40044577082501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhA!5e0!3m2!1spl!2spl!4v1478371298201"
                                        frameBorder={0} style={{border: 0}} allowFullScreen/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="find-gym">
                <div className="find-gym__background">
                    <Geosuggest
                        placeholder="Start typing!"
                        country="pl"
                        types={["geocode"]}
                        onSuggestSelect={this.onSuggestSelect}
                        location={new google.maps.LatLng()}
                        radius="50"/>
                </div>

                {this.renderGymSearchResult2()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        search_result: state.gym.search_gyms,
    }
}

export default connect(mapStateToProps, {findGyms})(HomePage);