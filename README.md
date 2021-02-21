# Todo MVC App

This is a simple implementation of Todo using MVC (Model - View - Component) architecture.

The project uses ExpressJS on the backend as a Web - Server and MySQL DB as the Database.

NOTE : The project uses Synchronous driver for MySQL (which is not a good idea 😉)


# Quick Start

1) Install MySQL Community Server from : https://dev.mysql.com/downloads/mysql/

Open the terminal to set up the Database and Table : 

```
mysql -u root -p

(Enter your Password when prompted)

CREATE SCHEMA `tododb`;

CREATE TABLE `tododb`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(80) NULL,
  `completed` VARCHAR(80) NULL,
  PRIMARY KEY (`id`));

```

2) Install *<u><b>ExpressJS, Webpack, TypeScript, sync-mysql (Driver), nodemon</u></b>*

3) The app's Frontend and Backend have to be run separately : 

### <b> Frontend - </b>


Open terminal and run : 

```
cd Frontend/
tsc --watch
```

Split the terminal and run : 

```
cd Frontend/
webpack-dev-server
```

### <b> Backend - </b>

Open terminal and run : 
```
cd Backend/
nodemon --exec ts-node typescript/TodoRouter.ts
```

4) Open `http://localhost:8080` and see the magic happen!


