const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    // Correcting the splice syntax
    data.splice(0, 0, { order_date: req.body.order_date });

    try {
        // Check if email already exists
        let eId = await Order.findOne({ email: req.body.email });

        if (eId === null) {
            // Create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data],
            }).then(() => {
                res.json({ success: true });
            });
        } else {
            // Update the existing order
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        const myData = await Order.find({ "email": req.body.email });
        if (!myData || myData.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }
        res.json({ orderData: myData });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Server error: " + error.message });
    }
});


module.exports = router;
