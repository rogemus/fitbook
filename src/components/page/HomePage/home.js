import React from 'react';
import Geosuggest from 'react-geosuggest';
import {findGyms} from '../../../actions/gyms_actions';
import SearchResultsCard from '../../common/searchResultsCard'
import {connect} from 'react-redux';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search_result: [],
            location: null
        };

        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.renderGymSearchResult = this.renderGymSearchResult.bind(this);
    }


    onSuggestSelect(suggest) {
        const distanceInMeters = 2000;

        const location = {
            latitude: suggest.location.lat,
            longitude: suggest.location.lng
        };

        const latRadian = location.latitude * Math.PI / 180;
        const degLatKm = 110.574235;
        const degLongKm = 110.572833 * Math.cos(latRadian);
        const deltaLat = distanceInMeters / 1000 / degLatKm;
        const deltaLong = distanceInMeters / 1000 / degLongKm;

        const viewBox = {
            bottom_right: {
                latitude: location.latitude - deltaLat,
                longitude: location.longitude - deltaLong
            },
            top_left: {
                latitude: location.latitude + deltaLat,
                longitude: location.longitude + deltaLong
            }
        };

        return this.props.findGyms(viewBox);
    }

    renderGymSearchResult() {
        if (this.props.search_result) {
           return (

               <div className="find-gym__result">
                   <div className="find-gym__result__title">
                       <h1 className="title text-center">Gyms in your area</h1>
                   </div>
                   <div className="content">
                       {this.props.search_result.map(gym => {
                           console.log(gym);
                           return (
                               <SearchResultsCard key={gym.id} gym={gym}/>
                           );
                       })}
                   </div>
               </div>
           )
        }
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
                        radius="20"/>
                </div>

                {this.renderGymSearchResult()}
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