const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const {getAll} = require('./src/pedidos/PedidoApi')
const port= process.env.PORT || 3001;
// Syncing all the models at once.
const {  Country } = conn.models;
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    const country = await Country.findAll()
    if(!country.length){ 
    try {
      await getAll();

    } catch (error) {
      
    } 
  }  
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
