import React, { Component } from 'react'

const styles = {
    header: {
        fontSize: '3em',
        color: '#404040',
        fontWeight: 300,
        fontFamily: 'Lato',
        marginBottom: 10
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