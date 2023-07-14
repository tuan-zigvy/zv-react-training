# Login mock api

To start server:

```
yarn install
yarn start

```

All apis

1. Get token login `POST /login`

```
	body: {
		emails: ...,
        password ...,
	}
```

2. Get current login user (Require login) `GET /api/users/my` 


3. Get all users (Require login && `Admin` role) `GET /api/users`



All initial users:

```
const users = [{
  fullName: 'John Doe',
  email: 'john@doe.com',
  password: 'zigvy123',
  id: 'fb3111f1-ea6e-11e9-ba42-2368758065ba',
  role: 'Admin',

}, {
  fullName: 'John Smith',
  email: 'john@smith.com',
  password: 'zigvy123',
  id: '781f9a70-ea6e-11e9-a9a5-4d422b2ea8f4',
  role: 'User',
}]

```