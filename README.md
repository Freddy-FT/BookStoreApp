# !!! Important !!! ##
## I am still working on this project and it is my hobby project so it is not finished ##



**Just some BookStore build with django-restframework and react**
## Tech Used

- **Container**
  - Podman
  - Podman Compose
    - (Should work with Docker but you will need to rename `podman-compose.yml` to `docker-compose.yml`)

- **Python**
  - Django
  - Django REST Framework
  - psycopg
  - dj-rest-auth
  - drf-spectacular
  - djangorestframework-simplejwt
  - django-cors-headers

- **Node.js**
  - Vite
    - React
      - Packages used are specified in `package.json`

## Project Structure

- **Backend** is located in the `backendfolder` where I define what backend it is.
- **Frontend** is located in the `backendfolder` where I define what frontend it is.

## Information

**Features**

- Login
- Create Book
- List all Books
- See Details of a Book
- Delete Book (only if you are the Author)
- Update Book (only if you are the Author)
- See Author Details
