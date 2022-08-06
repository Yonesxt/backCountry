const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imagBandera:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    continente:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "undefined",
    },
    subRegion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.INTEGER,
      get() {
        // 100 ---> "100 ,2"
        const Area = this.getDataValue("area");
        return Area ? `${Area} Km²` : null;
      },
    },
    poblacion:{
      type: DataTypes.INTEGER
    }
  },{
    timestamps: false,
  });
};
