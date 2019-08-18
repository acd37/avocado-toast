import React, { Component } from 'react'

const styles = {
    header: {
        fontSize: '3em',
        color: '#404040',
        // textTransform: 'uppercase',
        fontWeight: 200,
        fontFamily: 'Lato'
    }
}


class Header extends Component {
    render() {
        return (
            <h1 style={styles.header}>
                {this.props.text}
            </h1>
        )
    }
}


export default Header