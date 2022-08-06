const { Router} = require('express');
const express = require('express')
const { getAll,getAllDB,getId } = require('../pedidos/PedidoApi');
//const {Country, Actividad} = require('../db')
const server = Router();
server.use(express.json())

server.get('/', getAllDB);
server.get('/:id', getId);

module.exports = server;