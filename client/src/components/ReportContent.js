import React, { Component } from 'react';
import Header from './common/Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	chartContainer: {
		marginTop: 50,
		marginBottom: 50,
		width: 800,
		maxWidth: '90%'
	}
};

class ReportContent extends Component {
	chartRef = React.createRef();

	state = {
		data: {
			labels: [],
			maintainAspectRatio: false,
			datasets: [
				{
					label: 'Overview',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: []
				}
			]
		},
		loading: true
	};

	componentDidMount() {
		let categories = [];
		let categoryValues = [];
		axios.get('/api/categories/reports').then((res) => {
			let financials = res.data;
			let data = { ...this.state.data };
			for (let i = 0; i < financials.length; i++) {
				categories.push(financials[i].categoryDescription);
				categoryValues.push(parseFloat(financials[i].amountSpent));
			}
			data.labels = categories;
			data.datasets[0].data = categoryValues;

			window.setTimeout(() => {
				this.setState({
					loading: false,
					data
				});
			}, 1000);
		});
	}

	render() {
		return (
			<div>
				<Header text="Your Spending Overview" />
				{this.state.loading ? (
					<div>
						<CircularProgress />
						<p>Sit tight. Loading data...</p>
					</div>
				) : (
						<div style={styles.chartContainer}>
							<Bar
								data={this.state.data}
							// height={150}
							// width={700}
							/>
						</div>
					)}
			</div>
		);
	}
}

ReportContent.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.auth.loading,
	profile: state.profile
});

export default connect(mapStateToProps, {})(ReportContent);
