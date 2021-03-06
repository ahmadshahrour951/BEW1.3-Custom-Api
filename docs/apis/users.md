# Users API

### GET - `/api/users`
Fetches all users
```JSON
[
  {
    "id": 1,
    "name": "Ahmed",
    "email": "ahmed@test.com"
  },
   {
    "id": 2,
    "name": "Omar",
    "email": "omar@test.com"
  },
]
```

### GET - `/api/users/<user_id>`
Fetches user with `<user_id>`

Returns:
```JSON
{
  "id": <user_id>,
  "name": "Ahmed",
  "email": "ahmed@test.com"
}
```

### GET - `/api/users/<user_id>/events`
Fetches events that belong to the user with `<user_id>`.

Returns:
```JSON
[
  {
    "id": 1,
    "name" : "Football",
    "description": "We play like crazy",
    "time": "2021-03-05T20:38:29.925Z"
  },
  {
    "id": 1,
    "name" : "Basketball",
    "description": "We play like crazy",
    "time": "2021-03-05T20:38:29.925Z"
  },
]
```

### GET - `/api/users/<user_id>/events`
**Requires JWT Token in Authorization Header**
Fetches events that belong to the user with `<user_id>`.

Returns:
```JSON
[
  {
    "id": 1,
    "name" : "Football",
    "description": "We play like crazy",
    "time": "2021-03-05T20:38:29.925Z"
  },
  {
    "id": 1,
    "name" : "Basketball",
    "description": "We play like crazy",
    "time": "2021-03-05T20:38:29.925Z"
  },
]
```

### PUT - `/api/users/<user_id>`
**Requires JWT Token in Authorization Header**

Updates a user

Provide:
```JSON
{
  "name": "new_user_name",
  "email": "new_user_email"
}
```

Returns:
```JSON
{
  "id": <user_id>,
  "name": "new_user_name",
  "email": "new_user_email"
}
```

### DELETE - `/api/users/<user_id>`
**Requires JWT Token in Authorization Header**

Deletes an institution

Returns:
```JSON
{
  "id": <user_id>,
}
```