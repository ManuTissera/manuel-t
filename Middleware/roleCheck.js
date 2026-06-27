
// export const roleCheck = (rolesPermitidos) => {
//   return (req, res, next) => {
//     const { rol } = req.usuario;
    
//     if (!rolesPermitidos.includes(rol)) {
//       return res.status(403).json({ error: 'No tienes permiso para esta acción' });
//     }
    
//     next();
//   };
// };



// ------------------------------------------------
// ------------  El de anbajo es el nuevo
// ------------------------------------------------



// middleware/roleCheck.js
export const roleCheck = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
 
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
 
    next();
  };
};
 




