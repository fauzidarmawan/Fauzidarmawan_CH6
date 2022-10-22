'use strict';
const bcrypt = require('bcryptjs');

  function encryptPassword(str){
    try{
        const hash =  bcrypt.hash(str,10);
        return hash;
    }catch(err){
        console.log(err);
        throw err;
    }
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passSuper = await (encryptPassword('super'));
    const pass = await (encryptPassword('admin'))
    const member = await (encryptPassword('memberrr'))
      return queryInterface.bulkInsert('Users', [{
      email: 'super@gmail.com',
      password: passSuper,
      name:'fauzi',
      status:'super admin',
      createdBy:'fauzi',
      updatedBy:'fauzi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      email: 'admin@gmail.com',
      password: pass,
      name:'awww',
      status:'admin',
      createdBy:'fauzi',
      updatedBy:'fauzi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      email: 'memberrrr@gmail.com',
      password: member,
      name:'member',
      status:'member',
      createdBy:'default',
      updatedBy:'default',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
    )
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
