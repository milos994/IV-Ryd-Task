## About Project

An application used by Ryd engineers to check my knowledge while creating some issues :) Built with Node & Express.

---
## Features
* Report issue as user
* Close issue as agent
* Automatically assign issue to free agent
* Get/Create/Update Users
* Get User/Agent Issues
* Get/Create Agents
### 
---
## How to run App?

Clone this repository and run:
```bash
$ docker-compose up --build
```

After the build is completed app is running on `localhost:8000`.

---
## How to run tests?
```bash 
$ docker-compose run --rm server yarn run test
```

---

## Postman Collection
You can find exported postman collection on the following [link](./IV-Ryd.postman_collection.json)

---
## API Docs

### User Routes:

```http
GET /users
```
##### Response:
```json
[
	{
        "id": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
        "email": "m.nesovanovic@hotmail.rs",
        "name": "Milos Nesovanovic",
        "createdAt": "2021-01-10T19:54:46.328Z",
        "updatedAt": "2021-01-10T19:54:46.328Z",
        "deletedAt": null
    },
]
```

---

```http
GET /users/:userId
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | *Required*. Unique user id. |

##### Response:
```json
{
	"id": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
	"email": "m.nesovanovic@hotmail.rs",
	"name": "Milos Nesovanovic",
	"createdAt": "2021-01-10T19:54:46.328Z",
	"updatedAt": "2021-01-10T19:54:46.328Z",
	"deletedAt": null
}
```
---

```http
POST /users/sign-up
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | *Required*. User email. |
| `name` | `string` | User name. |

##### Response:
```json
{
	"id": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
	"email": "m.nesovanovic@hotmail.rs",
	"name": "Milos Nesovanovic",
	"createdAt": "2021-01-10T19:54:46.328Z",
	"updatedAt": "2021-01-10T19:54:46.328Z",
	"deletedAt": null
}
```

---

```http
PATCH /users/:userId
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` |*Required*. User name. |

##### Response:
```json
{
	"id": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
	"email": "m.nesovanovic@hotmail.rs",
	"name": "Milos Nesovanovic 7",
	"createdAt": "2021-01-10T19:54:46.328Z",
	"updatedAt": "2021-01-10T19:54:46.328Z",
	"deletedAt": null
}
```
---