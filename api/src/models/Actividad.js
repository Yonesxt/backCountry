const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("actividad", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad:{
      //ver con validaciones:min y max
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño','Invierno','Primavera'),
      allowNull:false          
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: "https://www.cheblender.org/wp-content/uploads/2019/10/deporte-y-salud.jpg"
  }
  },{
    timestamps: false,
  });
};  