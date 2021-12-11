const bcrypt = require('bcryptjs');

const usersToInsert = [
  { firstName: 'Franco', lastName: 'Armani', email: 'fa@afa.com', roleId: 1 },
  { firstName: 'Lucas', lastName: 'Martínez Quarta', email: 'lmq@afa.com', roleId: 1 },
  { firstName: 'Nicolás', lastName: 'Tagliafico', email: 'nt@afa.com', roleId: 1 },
  { firstName: 'Gonzalo', lastName: 'Montiel', email: 'gm@afa.com', roleId: 1 },
  { firstName: 'Leandro', lastName: 'Paredes', email: 'lp@afa.com', roleId: 1 },
  { firstName: 'Germán', lastName: 'Pezzella', email: 'gp@afa.com', roleId: 1 },
  { firstName: 'Rodrigo', lastName: 'De Paul', email: 'rdp@afa.com', roleId: 1 },
  { firstName: 'Marcos', lastName: 'Acuña', email: 'ma@afa.com', roleId: 1 },
  { firstName: 'Sergio', lastName: 'Agüero', email: 'sa@afa.com', roleId: 1 },
  { firstName: 'Lionel', lastName: 'Messi', email: 'lm10@afa.com', roleId: 1 },
  { firstName: 'Ángel', lastName: 'Di María', email: 'adm@afa.com', roleId: 1 },
  { firstName: 'Agustín', lastName: 'Marchesín', email: 'am@afa.com', roleId: 2 },
  { firstName: 'Cristian', lastName: 'Romero', email: 'cr@afa.com', roleId: 2 },
  { firstName: 'Exequiel', lastName: 'Palacios', email: 'ep@afa.com', roleId: 2 },
  { firstName: 'Nicolás', lastName: 'González', email: 'ng@afa.com', roleId: 2 },
  { firstName: 'Joaquín', lastName: 'Correa', email: 'jc@afa.com', roleId: 2 },
  { firstName: 'Nicolás', lastName: 'Domínguez', email: 'nd@afa.com', roleId: 2 },
  { firstName: 'Guido', lastName: 'Rodríguez', email: 'gr@afa.com', roleId: 2 },
  { firstName: 'Nicolás', lastName: 'Otamendi', email: 'no@afa.com', roleId: 2 },
  { firstName: 'Giovani', lastName: 'Lo Celso', email: 'glc@afa.com', roleId: 2 },
  { firstName: 'Ángel', lastName: 'Correa', email: 'ac@afa.com', roleId: 2 },
  { firstName: 'Lautaro', lastName: 'Martínez', email: 'lm@afa.com', roleId: 2 },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hashs generic password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('12345678', salt);

    await queryInterface.bulkInsert(
      'Users',
      usersToInsert.map((x) => {
        return {
          ...x,
          password: hashedPassword,
          photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      // As the email is unique, we can delete using it in the where condition
      email: { [Sequelize.Op.in]: usersToInsert.map(x => x.email) },
    });
  },
};
