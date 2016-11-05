import React from 'react';
import Geosuggest from 'react-geosuggest';
class HomePage extends React.Component {
    componentDidMount() {
    }

    onSuggestSelect(suggest) {
        console.log(suggest);
    }

    render() {
        return (
            <div>
                <Geosuggest
                    placeholder="Start typing!"
                    country="pl"
                    types={["geocode"]}
                    onSuggestSelect={this.onSuggestSelect}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20"/>
            </div>
        )
    }
}


export default HomePage;