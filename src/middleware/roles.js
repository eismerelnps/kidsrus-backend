// roles.js

const roles = {
    superadmin: {
      permissions: ['create', 'read', 'update', 'delete'],
    },
    admin: {
      permissions: ['read', 'create', 'update'],
    },
    user: {
      permissions: ['read'],
    },
  };
  
  module.exports = roles;
  