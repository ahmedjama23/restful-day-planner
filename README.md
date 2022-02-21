# Day Planner (RESTful API)
<div width="100%" align="center">
<img src="./resources/1280px-Node.js_logo.svg.png" width="50%"/>
</div>

## Description
This API provides the ability to create and manage daily tasks and meetings. Meetings consist of agenda items which contain notes.

## Endpoints
* Tasks (GET, POST, PATCH, DELETE)
* Meetings (GET, POST, PATCH, DELETE)
* AgendaItems (GET, POST, PATCH, DELETE)
* User (POST, DELETE)
  - SignUp
  - Login
  

## Functionality

#### All Users

* User sign up and login
* Get all or specific tasks

#### Authorized Users
* Get all or specific meetings or agenda items (specified by ID)
* Create new tasks, meetings, and agenda items
* Update existing tasks, meetings, and agenda items (specified by ID)
* Delete tasks, meetings, and agenda items (specified by ID)
* Delete users

## Technologies
* Node.js
* Express
* MongoDB
* Mongoose
* bcrypt
* Multer

## Languages
JavaScript
