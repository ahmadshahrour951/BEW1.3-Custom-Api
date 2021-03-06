# Institutions API

### GET - `/api/institutions`
Fetches all institutions
```JSON
[
  {
    "id": 1,
    "name": "Make School"
  },
  {
    "id": 2,
    "name": "University of California, Berkeley"
  },
]
```

### GET - `/api/institutions/<institution_id>`
Fetches institution with `<institution_id>`

Returns:
```JSON
{
  "id": <institution_id>,
  "name": "Make School"
}
```

### GET - `/api/institutions/<institution_id>/residences`
Fetches residences that belong to the institution with `<institution_id>`.

Returns:
```JSON
[
  {
    "id": 1,
    "name" : "851 California",
    "max_capacity": 100
  },
  {
    "id": "2",
    "name" : "The Herbert Hotel",
    "max_capacity": 100
  }
]
```

### POST - `/api/institutions`
**Requires JWT Token in Authorization Header**
 
Creates an institution


Provide:
```JSON
{
  "name": "<institution_name>",
}
```

Returns:
```JSON
{
  "id": "1",
  "name": "<institution_name>,
}
```

### PUT - `/api/institutions/<institution_id>`
**Requires JWT Token in Authorization Header**

Updates an institution

Provide:
```JSON
{
  "name": "<new_institution_name>",
}
```

Returns:
```JSON
{
  "id": <institution_id>,
  "name": <new_institution_name>,
}
```

### DELETE - `/api/institutions/<institution_id>`
**Requires JWT Token in Authorization Header**

Deletes an institution

Returns:
```JSON
{
  "id": <institution_id>,
  "name": <new_institution_name>,
}
```