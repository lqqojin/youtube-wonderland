const express = require('express');
const router = express.Router();
const { Subscribe } = require('../models/Subscibe');
//=================================
//             Subscribe
//=================================
router.post("/subscribeNumber", (req, res) => {
    const { userTo } = req.body;
    Subscribe.find({ userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
});

router.post("/subscribed", (req, res) => {
    const { userTo, userFrom } = req.body;
    Subscribe.find({ userTo, userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            let result = false;
            if (subscribe.length !== 0) result = true;
            res.status(200).json({ success: true, subscribed: result })
        })
});


router.post("/unSubscribe", (req, res) => {
    const { userTo, userFrom } = req.body
    Subscribe.findOneAndDelete({ userTo, userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).send({ success: false, err});
            res.status(200).json({ success: true, doc });
        })
});

router.post("/subscribe", (req, res) => {
    const subscribe = new Subscribe(req.body)
    subscribe.save((err, doc) => {
        if (err) return res.status(400).send({ success: false, err});
        res.status(200).json({ success: true, doc });
    })
});


module.exports = router;
