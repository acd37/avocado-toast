module.exports = function (app) {
    const db = require("../../models");
    const Sequelize = require("sequelize");

    // @route GET categories/test
    app.get("/api/categories/test", (req, res) =>
        res.json({ msg: "Categories routes works!" })
    );

    // @route POST api/categories/
    // @desc creates a new category
    app.post("/api/categories", (req, res) => {

        db.Category.findOne({
            where: {
                UserId: req.body.UserId,
                description: req.body.description
            }
        }).then(category => {
            if (category) {
                return res.status(400).json({ email: "This category already exists for this user." })
            } else {
                const newCategory = {
                    description: req.body.description,
                    amount: req.body.amount,
                    UserId: req.body.UserId
                };

                db.Category.create(newCategory)
                    .then(category => {
                        res.status(200).json({ message: "Category successfully created." })
                    })
                    .catch(err => console.log(err));

            }
        });
    });


    // @route GET api/categories/:userId/
    // @desc gets all categories  for a particular user
    app.get("/api/categories/:userId", (req, res) => {
        db.Category.findAll({
            where: {
                UserId: req.params.userId,
            }
        })
            .then(categories => {
                res.status(200).json(categories)
            })
            .catch(err => console.log(err));
    })

    // UPDATE


    // @route DELETE api/categories/
    // @desc deletes a category
    app.delete('/api/categories', (req, res) => {
        db.Category.destroy({
            where: {
                category_id: req.body.category_id
            }
        })
            .then(() => {
                res.status(200).json({ admin: "Category was successfully deleted." })
            })
    })

}