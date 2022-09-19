# Notes API (Django & React)

You can make notes using this API to store ideas from your lectures or reading. It will make revision easy and clarify your thinking.

## Frontend (React)

Frontend is developed using ReactJS library. The UI is kept simple just to demonstrate the functionality of the app.

## Backend (Django)

Backend is developed using DRF (Django Rest Framework) using both class based views (for tokenization) and function based views (for CRUD operation on Notes).

## Badges

[![GitHub issues](https://img.shields.io/github/issues/zmaktr/django-react-auth)](https://github.com/zmaktr/django-react-auth/issues)
[![GitHub forks](https://img.shields.io/github/forks/zmaktr/django-react-auth)](https://github.com/zmaktr/django-react-auth/network)
[![GitHub stars](https://img.shields.io/github/stars/zmaktr/django-react-auth)](https://github.com/zmaktr/django-react-auth/stargazers)

## JWT Authentication Features

- Access token valid for 5000ms
- Generate a new access token using refresh token before expiry
- Refresh token rotation lifespan 90 days
- Previous refresh tokens are blacklisted after rotation so save the new refresh token each time after rotation
- Encryption algorithm used HS256
- For Authorization use 'Bearer {access token}' as value
- Token claim has been customized to add additional field 'username'. You can retrieve 'username' by jwt decoding either refresh or access token

## API Reference

#### Base URL :

```https
  https://django-react-auth-backend.zaeemakhtar.site
```

#### Get all endpoints

```https
  GET /api/
```

#### Signup to a create new user

```https
  POST /api/create-user/
```

| Parameter  | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `username` | `string` | **Required**. username should be unique field   |
| `password` | `string` | **Required**. password any format is acceptable |

#### Login for existing users

```https
  POST /api/token/
```

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `username` | `string` | **Required**. existing username |
| `password` | `string` | **Required**. existing password |

#### Generate new tokens (tokens expire every 5000ms)

```https
  POST /api/token/refresh/
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `refresh` | `string` | **Required**. latest refresh token |

#### Retrieve array of user notes

```https
  GET /api/notes/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `access`  | `string` | **Required**. latest access token |

#### Create a new note

```https
  POST /api/create-notes/
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `access`  | `string` | **Required**. latest access token to authenticate |
| `body`    | `string` | **Required**. add content of note in 'body' key   |

```https
  DELETE /api/delete-notes/{id}/
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `access`  | `string` | **Required**. latest access token to authenticate |
| `id`      | `string` | **Required**. id of note to be deleted            |

```https
  PATCH /api/update-notes/{id}/
```

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `access`  | `string` | **Required**. latest access token to authenticate |
| `id`      | `string` | **Required**. id of note to be be updated         |

## Deployment

This project is running on [@docker](https://docker.com) containers deployed on [@DigitalOcean](https://digitalocean.com) droplet and managed by @[NGINX](https://www.nginx.com/) reverse proxy

## Author

Zaeem Akhtar

- [@github profile](https://www.github.com/zmaktr)
- [@portfolio website](https://zaeemakhtar.site)
