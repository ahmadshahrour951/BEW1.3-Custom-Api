# Residences API

### GET - `/api/residences`
Fetches all residences
```JSON
[
  {
    "id": 1,
    "name": "851 California",
  "max_capacity": 100,
    "institutionId": 1
  },
  {
    "id": 2,
    "name": "University of California, Berkeley",
    "max_capacity": 100,
    "institutionId": 1
  },
]
```

### GET - `/api/residences/<residence_id>`
Fetches residence with `<residence_id>`

Returns:
```JSON
{
  "id": <residence_id>,
  "name": "851 California",
  "max_capacity": 100,
  "institutionId": 1
}
```

### GET - `/api/residences/<residence_id>/users`
Fetches users that belong to the residence with `<residence_id>`.

Returns:
```JSON
[
  {
    "id": 1,
    "name" : "Ahmed Shahrour",
    "email": "ahmed@test.com",
    "residenceId": 1
  },
  {
    "id": 1,
    "name" : "Omar Gurashi",
    "email": "omar@test.com",
    "residenceId": 1
  }
]
```

### POST - `/api/residences`
**Requires JWT Token in Authorization Header**
 
Creates an institution


Provide:
```JSON
{
  "name": "851 California",
  "max_capacity": 100,
  "institutionId": 1
}
```

Returns:
```JSON
{
  "id": "1",
  "name": "851 California",
  "max_capacity": 100,
  "institutionId": 1
}
```

### PUT - `/api/residences/<institution_id>`
**Requires JWT Token in Authorization Header**

Updates an institution

Provide:
```JSON
{
  "name": "851 California, blabla",
  "max_capacity": 10000,
}
```

Returns:
```JSON
{
  "id": 1,
  "name": "851 California, blabla",
  "max_capacity": 10000,
}
```

### DELETE - `/api/residences/<institution_id>`
**Requires JWT Token in Authorization Header**

Deletes an institution

Returns:
```JSON
{
  "name": "851 California, blabla",
  "max_capacity": 10000,
}
```