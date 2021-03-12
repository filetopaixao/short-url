require('dotenv').config()
const express = require('express')
const knex = require('./database/connection')

const routes = express.Router()

routes.get('/', (req, res)=>{
    return res.redirect(process.env.BASE_URL)
})

routes.get('/:id', (req, res)=>{
    const {id} = req.params
    knex('short_url').where({id: parseInt(id)}).first().then((row)=>{
        console.log(row)
        return res.redirect(process.env.BASE_URL+row.url)
    }).catch(()=>{
        console.log('Não encontrou nenhum dado')
        return res.redirect(process.env.BASE_URL+'/404')
    })
})

module.exports = routes