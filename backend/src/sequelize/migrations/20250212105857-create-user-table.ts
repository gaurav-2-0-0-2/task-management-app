import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,   
        allowNull: false,          
        autoIncrement: true,       
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,    
        allowNull: false,          
      },
      email: {
        type: DataTypes.STRING,    
        allowNull: false,          
        unique: true,              
      },
      password: {                  
        type: DataTypes.STRING,    
        allowNull: false,          
      },
      createdAt: {
        type: DataTypes.DATE,      
        allowNull: false,          
        defaultValue: DataTypes.NOW,        
      },
      updatedAt: {                 
        type: DataTypes.DATE,      
        allowNull: false,
        defaultValue: DataTypes.NOW,        
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  }
};
