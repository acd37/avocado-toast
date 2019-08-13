module.exports = function (categories, balance) {
    let sum = 0;
    categories.forEach(category => {
        sum += parseFloat(category.amount);
    })
    return sum += parseFloat(balance);
}
