import bcrypt from 'bcryptjs';

const users = [
    {
      name: 'Admin User',
      email: 'admin@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'ratul',
      email: 'ratul@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    },
    {
      name: 'radwan',
      email: 'radwan@email.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    },
  ];
  
  export default users;