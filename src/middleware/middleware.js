const jwt = require('jsonwebtoken');

const roles = require('./roles');

// Middleware de autenticación
exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
  
      // Agregar la información del usuario autenticado al objeto `req`
      req.user = decoded;
      next();
    });
  };
  



  // Middleware para verificar los permisos de un usuario
exports.checkPermissions = (requiredPermissions) => {
    
   
    
    return (req, res, next) => {
      const  {role}  = req.user;
      console.log("role")
      console.log(role)

      console.log("req")
      console.log(req.user)
  
      // Verificar si el usuario tiene los permisos requeridos
      const hasPermissions = requiredPermissions.every((permission) => roleHasPermission(role, permission));
  
      if (!hasPermissions) {
        return res.status(403).json({ message: 'Acceso Degnegado' });
      }
  
      next();
    };
  };

  // Verificar si un rol tiene un permiso específico
function roleHasPermission(role, permission) {
  
  console.log("role : " + role)
  console.log("permission: " + permission)
  console.log(roles[role]);
   
   
    // Puedes definir la lógica para verificar los permisos de cada rol
    // Por ejemplo, utilizando un objeto o una base de datos
    // En este ejemplo básico, solo se permite el acceso completo para el rol 'superadmin'
    if (roles.hasOwnProperty(role) && roles[role].permissions.includes(permission)) {
      console.log("tiene permisos")
      return true;
      } else {
        console.log("no tiene permisos")
        return false;
      }
      
    
  }