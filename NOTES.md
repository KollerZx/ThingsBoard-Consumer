# ThingsBoard Api Endpoints

### Login
`/api/auth/login`

```json
  {
    "username":"tenant@thingsboard.org",
    "password":"tenant"
  }

```

### Create User

`/api/user{?sendActivationMail}`

sendActivationMail : boolean

```json
  {
    "email": "user@example.com",
    "authority": "SYS_ADMIN, TENANT_ADMIN or CUSTOMER_USER",
    "firstName": "John",
    "lastName": "Doe",
    "additionalInfo": {}
  }

```

## Get Activation Link

`/api/user/{user_id}/activationLink`