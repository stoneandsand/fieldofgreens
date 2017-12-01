# fieldofgreens

> The Grossery List

## How To Start This App

************************************

Application instructions:

package.json in root folder contains some scripts for you to use in terminal. Run these commands in shell.

"npm run wp" will start webpack. Run it once and it will watch for any new changes and automatically transpile to browser-friendly code!

"npm run start" will start the server to accept incoming clients and also allow you to monitor the server in terminal.

Thank you for your interest in The Grossery List!

************************************
Future Goals:

Social Media features -> Share with friends, upload local grossery discoveries
Add user authentication
Complete API integration to openFDA recall list
Scrub data from said API integration

************************************

RESTful API Endpoints:
| METHOD   | URL                              | REQ                     | RES                     |
|:---------|:---------------------------------|:------------------------|:------------------------|
| GET      | /                                |                         | html                    |
| POST     | /login                           |                         |                         |
| POST     | /signup                          |                         |                         |
| GET      | /api/users/:username/lists/:id   | list                    | {name: '', items: []}   |
| POST     | /api/users/:username/lists       | {name: '', items: []}   | {name: '', items: []}   |
| GET      | /api/users/:username/lists       |                         | array                   |
| GET      | /api/search                      | {name: 'string'}        | array                   |
| GET      | /api/users/:username/allergies   |                         | array                   |
| GET      | /api/users/:username/likes       |                         | array                   |
| GET      | /api/users/:username/dislikes    |                         | array                   |
| POST     | /api/users/:username/allergies   | {item: ''}              | array                   |
| POST     | /api/users/:username/likes       | {item: ''}              | array                   |
| POST     | /api/users/:username/dislikes    | {item: ''}              | array                   |
| POST     | /api/users/:username/delete      | {name: '', type:''}     | array                   |
| :------- | :------------------------------- | :---------------------- | :---------------------- |


