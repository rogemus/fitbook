import React from 'react';
import Sidebar from './common/sidebar';
import Footer from './common/footer';

export default class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content">
                        {this.props.children}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}
