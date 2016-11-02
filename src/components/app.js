import React from 'react';
import Header from './common/header';
import Sidebar from './common/sidebar';
import Footer from './common/footer';

export default class App extends React.Component {
    render() {
        return (
            <section id="container">
                <Header />

                {this.props.children}

            </section>
        );
    }
}
