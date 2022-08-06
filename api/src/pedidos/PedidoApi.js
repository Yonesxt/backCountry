var axios = require('axios')
const { Country, Actividad }  = require('../db.js');

const API_URL_PEOPLE = 'http://restcountries.com/v3/all';
const getAll =  async function () {
  //   return res.send("funciona si");
    // pedido a la api
    const respuesta = await axios(API_URL_PEOPLE);
    respuesta.data.map(c=>(
      Country.findOrCreate({
        where: { nombre: c.name.common },
        defaults:{
          id: c.cca3,
          imagBandera: c.flags[0],
          continente: c.continents[0],
          capital:c.capital?.[0],
          subRegion: c.subregion,
          area: c.area,
          poblacion: c.population
      }})
    ))
}
const getAllDB =  async function (req, res, next) {
  //   return res.send("funciona si");
    // pedido a la api
    await getAll()
    try {
       if (Object.values(req.query)[0]) {
      //   // si hay query hay que filtrar
      //   // where === donde
         Country.findAll({
          include: {
            model: Actividad,
            atributes: [ ["nombre", "dificultad", "duracion","temporada"]],
            through:{
              atributes:[]
              }
          }
        }).then((respuesta) =>
         {let country = respuesta.filter(elemento=>elemento[Object.keys(req.query)[0]].toLowerCase().includes(Object.values(req.query)[0].toLowerCase()))
          if (!country.length>0) 
            return  res.status(404).json({message: "Error 404 database not found"});
          res.status(200).json(country);
        });
       } else {
        Country.findAll({
          include: {
            model: Actividad,
            atributes: [ ["nombre", "dificultad", "duracion","temporada"]],
            through:{
              atributes:[]
              }
          }
        }).then(country=>{
          res.status(200).json(country)
        });
      }
      } catch (error) {
    return res.send(error);
  }
}
const getId = async function (req, res, next){
  const id = req.params.id
  try {
    let Ciudades = await Country.findAll(
       { include: {
            model: Actividad,
            atributes: [ ["nombre", "dificultad", "duracion","temporada"]],
            through:{ atributes:[] }
        }}
    );
    const Ciudad = Ciudades.filter(c => id == c.id)
    if (!Ciudad.length) {
        return res.status(404).json({message: `error 404, country not found with id ${id}`});
    }
    return res.send(Ciudad[0]);
    } catch (error) {
        next(error)
    }
}
const getActividad =  async function (req, res, next) {
  //   return res.send("funciona si");
    try {
        Actividad.findAll({
          include: {
              model: Country,
              atributes: [  "nombre", "capital","continente","subRegion", "id","poblacion","area"],
              through:{
              atributes:[]
              }
          }
     }).then(actividad=>{
          res.json(actividad)
        });
      //}
      } catch (error) {
    return res.send(error);
  }
}
const postActividad =  async function (req, res, next) {
  const {  nombre, dificultad, duracion,temporada } = req.body;
  var {ciudad , ... newActividad}=req.body;
  if (!nombre || !dificultad || !duracion|| !temporada|| !ciudad)
    return res.status(404).send("Falta enviar datos obligatorios");
    try {
      const actividad = await Actividad.create({ ...newActividad });
      const Country_Actividad = await Country.findAll({ 
        where:{
          nombre: ciudad
        }
      })
    await actividad.addCountry(Country_Actividad);
    return res.status(201).json(actividad);
      //}
      } catch (error) {
          return res.status(404).json({ msg: "Error en alguno de los datos provistos", err: error });
  }
}
const deleteActividad = async function (req, res, next) {
  try {
    let ID = Number(req.params.id)
    Actividad.destroy({
        where: {
            id: ID
        }
    })
    res.send("actividad eliminada")
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports ={
  getAll,
  getAllDB,
  getId,
  getActividad,
  postActividad,
  deleteActividad
}