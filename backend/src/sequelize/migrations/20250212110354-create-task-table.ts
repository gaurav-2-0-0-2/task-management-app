import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.INTEGER,   
        allowNull: false,          
        autoIncrement: true,       
        unique: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,    
        allowNull: false,          
      },
      description: {
        type: DataTypes.STRING,    
        allowNull: false,          
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),    
        allowNull: false,          
        defaultValue: 'pending',   
      },
      userId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  
          key: 'id',      
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('tasks');
  }
};
