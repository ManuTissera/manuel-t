

*Roles*

- Manager
- Admin
- Auditor
- Public

## Critca de Don Deep

Sí, entiendo el archivo. Es un componente React que muestra una tabla de pilotos con funcionalidades de:

Listar pilotos desde una API (getPilots)

Filtrar por categoría, piloto específico o nombre

Eliminar pilotos seleccionados (checkboxes + deletePilot)

Buscar por nombre

Ver todo (resetear filtros)

Modal de confirmación para eliminar

Modal de filtros

El estado maneja: filtros, pilotos mostrados, selección de filas, modales, etc.
Hay algunos comentarios y código comentado (paginación, descarga CSV).
La recarga de datos depende de showPilots (toggle forzado) en lugar de depender directamente de los filtros, lo cual es poco convencional pero funcional.

## Otros
