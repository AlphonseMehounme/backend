// require('dotenv').config()
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT
app.use(express.json())

let trxs = []
let nextId = 1

app.get("/", (req, res) => {
    res.send("Welcome to the bitcoin app")
})

app.get("/transactions", (req, res) => {
    res.status(200).send(trxs)
})

app.get("/transactions/:id", (req, res) => {
    const trx = trxs.find(t => t.id === parseInt(req.params.id))
    if (!trx) {
        return res.status(404).send('Transaction not found')
    }
    res.status(200).send(trx)
})

app.post("/transactions", (req, res) => {
    const { type, amountSat, amountFiat } = req.body
    const newTrx = { id: nextId++, type, amountSat, amountFiat }
    trxs.push(newTrx)
    res.status(201).send(newTrx)
})

app.put("/transactions/:id", (req, res) => {
    const trx = trxs.find(t => t.id === parseInt(req.params.id))
    if (!trx) {
        return res.status(404).send('Transaction not found')
    }
    const { type, amountSat, amountFiat } = req.body
    trx.amountFiat = amountFiat
    trx.amountSat = amountSat
    trx.type = type
    res.status(200).send(trx)
})

app.delete("/transactions/:id", (req, res) => {
    const index = trxs.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Transaction not found")
    }
    trxs.splice(index, 1)
    res.status(200).send('Deleted Successfuly')
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}...`)
})