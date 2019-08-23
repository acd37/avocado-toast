module.exports = function(categories, balance) {
	let sum = 0;

	if (categories) {
		categories.forEach((category) => {
			sum += parseFloat(category.amount);
		});
		return (sum += parseFloat(balance));
	} else {
		return sum;
	}
};
