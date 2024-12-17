# Desafío 06 - Tienda Joyería (Diseño avanzado de API REST)

## :computer: Para interactuar con el servidor server.js ejecutar:

 ## Server (Backend)
npm i -y  
npm install express  
npm install pg cors  
npm install pg-format (Manejo sentencias SQL)  
npm install dotenv (Manejo de variables de entorno)  
npm install -D nodemon (Habilitar actualizacion Hot Reloading)  
npm install morgan (Generar informe)

node server.js para iniciar el servidor

## Configuracion (Archivo .env)
PG_HOST=localhost  
PG_USER=postgres  
PG_PASSWORD=########  
PG_PORT=5432  
PG_DATABASE=joyas  

PORT=3000

## Ejemplos
Consulta de joyas con cláusulas en estructura de datos HATEOAS  
Trae todas las joyas  
http://localhost:5510/joyas

joyas/limit  
http://localhost:5510/joyas/limit/?limits=3&page=2&order_by=stock_ASC  

Filtrando las joyas por precio máximo, mínimo, categoría y metal  
joyas/filter  
http://localhost:5510/joyas/filter/?precio_max=40000  
http://localhost:5510/joyas/filter?precio_max=15000  
http://localhost:5510/joyas/filter?precio_min=20000&precio_max=12000  
http://localhost:5510/joyas/filter?precio_min=30000&precio_max=12000&categoria=aros  

## Informe
Nombre: informe.log
