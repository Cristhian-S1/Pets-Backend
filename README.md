# Pets
Repositorio de Backend para las mascotas perdidas.

# Comandos
npm install --> carga las dependencias

npm run dev --> ejecute el proyecto utilizando "nodemon" para cambios dinamicos en ejecucion, esto mediante el script que esta en el package.json

api.http --> archivo para probar los endpoints y este requiere de la extencion REST Client.

# Consideraciones
- CAMBIAR LOS DATOS DE CONEXION A SU PROPIA BASE DE DATOS POSTGRESQL
- Se utiliza MVC con un middleware global
- No se utiliza Zod(validador de datos entrates, similar a class-validator usado en nestjs pero sin ORM) por simplicidad
