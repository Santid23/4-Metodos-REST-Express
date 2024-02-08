const express = require('express')
const app = express()
const array = require('./array')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/personas', function(req, res) {
    res.send(array)
})

app.post('/sumar', function(req, res) {
    const {nombre, apellido, edad} = req.body
    array.push({nombre, apellido, edad})

    res.send(array)
})

app.put('/modificar', function(req, res) {
    const index = array.findIndex((persona) => persona.nombre === req.body.nombre)
    
    if(index < 0) {
        res.send(`${req.body.nombre} no existe`)
        return
    }

    array[index].apellido = req.body.apellido
    array[index].edad = req.body.edad

    res.send(array)
})

app.delete('/borrar', function(req, res) {
    array = array.filter((persona) => persona.nombre != req.body.nombre)
    res.send(array)
})




app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error('No se ha podido iniciar el servidor')
    : console.log('Servidor a la escucha en el puerto:' +(process.env.PORT || 3000))
})