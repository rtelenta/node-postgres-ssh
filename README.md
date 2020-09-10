# Ejemplo de una conexión a **postgreSQL** usando _node-postgres_ y un tunel SSH

## Comenzando 🚀

_Antes de empezar asegurate de instalar los paquetes del proyecto_

```
yarn install
```

### Pre-requisitos 📋

1. Copia y renombra el archivo **.env.example** a **.env**
2. Agrega la llave privada a la raíz. Ejemplo: **key.pem**

### Instalación 🔧

Edita el archivo **.env** con los datos de tu tunel ssh y tu base de datos

```
#SSH CONFIG
SSH_PRIVATE_KEY=key.pem
SSH_HOST=0.0.0.0
SSH_USERNAME=ubuntu

#DB CONFIG
DB_HOST=example-db-host.com
DB_USER=admin
DB_PASSWORD=123456
```

### Probando la conexión 🧨

Ejecuta el comando:

```
yarn query
```

Si la conexión ha sido exitosa obtendras un resultado similar siguiente:

```
{ schemaname: 'pg_cata
  tablename: 'pg_stati
  tableowner: 'rdsadmi
  tablespace: null,
  hasindexes: true,
  hasrules: false,
  hastriggers: false,
  rowsecurity: false }

{ schemaname: 'pg_cata
  tablename: 'pg_forei
  tableowner: 'rdsadmi
  tablespace: null,
  hasindexes: true,
  hasrules: false,
  hastriggers: false,
  rowsecurity: false }
```

_Por defecto se esta conectando a la base de datos **template1** de postgreSQL y ejecutando la query **SELECT \* FROM pg_catalog.pg_tables**_

### Probando otra _query_ 🤓

Abre el archivo **index.js** y en la parte inferior encontraras:

```
const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "template1", // aquí cambia template1 por la base de datos de tu elección
};

Query("SELECT * FROM pg_catalog.pg_tables", db) // aquí escribe tu query
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```
