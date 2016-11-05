import React from 'react';
import Header from './common/menu';
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
                    </div>
                </div>
            </div>
        );
    }
}
