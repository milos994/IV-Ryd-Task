## About Project

An application used by Ryd engineers to check my knowledge while reporting some issues :) Built with Node & Express.

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
You can find exported postman collection on the following [link](./IV-Ryd.postman_collection.json). If you want to test API, download file and import in your postman. :)

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

### Agent Routes:

```http
GET /agents
```
##### Response:
```json
[
	{
		"id": "76944b4b-da2f-478b-8629-c618e1dd33aa",
		"email": "agent1@test.com",
		"isBusy": false,
		"createdAt": "2021-01-10T21:35:19.338Z",
		"updatedAt": "2021-01-10T21:35:19.338Z",
		"deletedAt": null
	},
]
```

---

```http
GET /agents/:agentId
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `agentId` | `string` | *Required*. Unique agent id. |

##### Response:
```json
{
	"id": "76944b4b-da2f-478b-8629-c618e1dd33aa",
	"email": "agent1@test.com",
	"isBusy": false,
	"createdAt": "2021-01-10T21:35:19.338Z",
	"updatedAt": "2021-01-10T21:35:19.338Z",
	"deletedAt": null
}
```
---

```http
POST /agents/sign-up
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | *Required*. User email. |

##### Response:
```json
{
	"id": "76944b4b-da2f-478b-8629-c618e1dd33aa",
	"email": "agent1@test.com",
	"isBusy": false,
	"createdAt": "2021-01-10T21:35:19.338Z",
	"updatedAt": "2021-01-10T21:35:19.338Z",
	"deletedAt": null
}
```
### Issue Routes:

```http
POST /users/:userId/issues
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | *Required*. Unique user id. |
| `text` | `string` | *Required*. Issue text. |
##### Response:
```json
{
    "id": "f5485409-d6a1-4f23-800f-143bdaa25f26",
    "userId": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
    "text": "issue text",
    "agentId": null,
    "status": "new",
    "updatedAt": "2021-01-10T22:07:50.183Z",
    "createdAt": "2021-01-10T22:07:50.183Z",
    "deletedAt": null
}

```

```http
GET /users/:userId/issues
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | *Required*. Unique user id. |
##### Response:
```json
[
	{
		"id": "f5485409-d6a1-4f23-800f-143bdaa25f26",
		"userId": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
		"text": "issue text",
		"agentId": null,
		"status": "new",
		"updatedAt": "2021-01-10T22:07:50.183Z",
		"createdAt": "2021-01-10T22:07:50.183Z",
		"deletedAt": null
	}
]

```

```http
GET /agents/:agentId/issues
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `agentId` | `string` | *Required*. Unique agent id. |
##### Response:
```json
[
	{
		"id": "f5485409-d6a1-4f23-800f-143bdaa25f26",
		"userId": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
		"text": "issue text",
		"agentId": "76944b4b-da2f-478b-8629-c618e1dd33aa",
		"status": "done",
		"updatedAt": "2021-01-10T22:07:50.183Z",
		"createdAt": "2021-01-10T22:07:50.183Z",
		"deletedAt": null
	}
]
```

```http
PATCH /agents/:agentId/issues/:issueId
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `agentId` | `string` | *Required*. Unique agent id. |
| `issueId` | `string` | *Required*. Unique issue id. |
##### Response:
```json
{
	"id": "f5485409-d6a1-4f23-800f-143bdaa25f26",
	"userId": "7d7b95a5-0e3e-4523-9ca9-0863cb59a89d",
	"text": "issue text",
	"agentId": "76944b4b-da2f-478b-8629-c618e1dd33aa",
	"status": "done",
	"updatedAt": "2021-01-10T22:07:50.183Z",
	"createdAt": "2021-01-10T22:07:50.183Z",
	"deletedAt": null
}
```
