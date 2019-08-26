import React from 'react';
import PropTypes from 'prop-types';

const styles = {
	header: {
		fontSize: '3em',
		color: '#404040',
		fontWeight: 300,
		fontFamily: 'Lato',
		marginBottom: 10
	}
};

function Header(props) {
	return <h1 style={styles.header}>{props.text}</h1>;
}

Header.propTypes = {
	text: PropTypes.string.isRequired
}

export default Header;
