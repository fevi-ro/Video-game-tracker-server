const express = require('express')
const router = new express.Router()
const axios = require('axios')
const mergeGameAndImageData = require('../utils/mergeGameAndImageData')
const isEmpty = require('../utils/isEmpty')

//GET Games from API
router.post('/games', async (req, res) => {
    const search = req.body.search

    try {
        // sends out request to IGDB to find games matching the search criteria
        const gameResponse = await axios({
            url: process.env.IGDB_API_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
            },
            data: `fields id, name, summary, cover, platforms.name, genres, similar_games, involved_companies.company.name, involved_companies, rating, total_rating_count, franchise, first_release_date; search "${search}";`
        })
       

      // store the cover data
        const coverIds = gameResponse.data.map((gameData) => {
            return gameData.cover
        }).filter(cover => cover !== undefined)
   
        // GET the cover data from API
       if (!isEmpty(coverIds)) {
            const imageResponse = await axios({
                url: process.env.IGDB_API_URL_COVERS,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
                },
                data: `fields image_id, url; where id = (${coverIds.toString()});`
            })

            const combinedData = mergeGameAndImageData(gameResponse.data, imageResponse.data)
            res.send(combinedData)
        }

        else {
            res.send(gameResponse.data)
        } 
    } 
    catch (error) {
        console.log(error.response.data)
        res.status(400).send({error: error.message})
    }
})

//GET ONE GAME FROM API
router.get('/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId

    try {
        // sends out request to IGDB to get data on the game selected
        const gameResponse = await axios({
            url: process.env.IGDB_API_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
            },
            data: `fields name, summary, franchise, platforms.name, genres, similar_games, involved_companies.company.name, total_rating_count, rating, cover, first_release_date; where version_parent = null; where id = ${gameId};`
        })

        // GET Cover Data
        const imageResponse = await axios({
            url: process.env.IGDB_API_URL_COVERS,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
            },
            data: `fields cover.image_id, url; where game = (${gameResponse.data[0].id});`
        })

     //   GET Franchise Data
        const franchiseResponse = await axios({
            url: process.env.IGDB_API_URL_FRANCHISE,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': process.env.TWITCH_APP_ACCESS_TOKEN
            },
            data: `fields name, url; where game = (${gameResponse.data[0].id});`
        })

        const combinedData = mergeGameAndImageData(gameResponse.data, imageResponse.data, franchiseResponse.data )

        res.send(combinedData)
    }
    catch (error) {
        res.status(400).send({error: error.message})
    }
})



module.exports = router