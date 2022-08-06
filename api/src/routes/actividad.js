const { Router} = require('express');
const express = require('express')
const { getAll,getActividad,postActividad,deleteActividad } = require('../pedidos/PedidoApi');
const {Country, Actividad} = require('../db')
const server = Router();
server.use(express.json())

server.get('/', getActividad);
server.post('/', postActividad);
server.delete('/delete/:id',deleteActividad)
module.exports = server;