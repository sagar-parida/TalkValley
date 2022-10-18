const express = require('express')
const Ads = require('../models/Ads')
const Companies = require('../models/Companies')

const router = express.Router()

router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword
        const re = new RegExp(keyword)
        const data = await Ads.aggregate([
            {
                $lookup: {
                    from: "companies",
                    localField: "companyId",
                    foreignField: "_id",
                    as: "Result"
                }
            },
            {
                $unwind: "$Result"
            },
            {
                $match: {
                    $or: [
                        { primaryText: { $regex: re, $options: 'i' } },
                        { headline: { $regex: re, $options: 'i' } },
                        { description: { $regex: re, $options: 'i' } },
                        { Result: { name: { $regex: re, $options: 'i' } } },
                    ]
                }
            }
        ])
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.post('/ads', async (req, res) => {
    try {
        const item = req.body
        const data = new Ads(item)
        await data.save()
        res.send({ "message": "Added successfully" })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/companies', async (req, res) => {
    try {
        const item = req.body
        const data = new Companies(item)
        await data.save()
        res.send({ "message": "Added successfully" })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router