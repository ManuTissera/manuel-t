


## VALIDACION DE PROCESOS
// Solo Manager puede eliminar
router.delete('/delete_pilot/:id', authMiddleware, roleCheck(['Manager']), async (req, res) => {
  // SQL
});

// Manager y Admin pueden editar
router.put('/edit_pilot/:id', authMiddleware, roleCheck(['Manager', 'Administrador']), async (req, res) => {
  // SQL
});

// Cualquiera logueado puede ver (Auditor, Manager, Admin, Público)
router.get('/pilots', authMiddleware, async (req, res) => {
  // SQL
});



## VALIDACION DE PROCESOS