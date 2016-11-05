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
            </div>
        )
    }
}


export default HomePage;