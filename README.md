# Shopping List Web Application

This is a shared shopping list web application built for the course project. The application allows users to create and manage multiple shopping lists, and track items within them. It follows a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database).

## Features

- Create new shopping lists
- Add items to shopping lists
- Diactivate shopping lists
- Mark items as collected

## Project Architecture

The project is structured into the following tiers and layers:
![](https://github.com/nisansalaperera/project_1/blob/main/design.jpeg)

### Three-Tier Architecture:
1. **Client:** The front-end of the application, providing an interactive interface for users.
2. **Server:** The back-end logic that processes requests from the client and communicates with the database.
3. **Database:** Stores the shopping list data, including lists and items.

### Four-Layered Architecture:
1. **Views:** The HTML and templates that are rendered and displayed in the browser.
2. **Controllers:** The logic for handling HTTP requests, user input, and coordinating the flow of data.
3. **Services:** The core application logic and interaction with the database layer.
4. **Database:** The persistence layer responsible for storing and retrieving data from the database.

## Database Schema

The database schema includes two tables: `shopping_lists` and `shopping_list_items`.

```sql
CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);


---

##  Repository Structure

```sh
└── project_1/
    ├── README.md
    ├── docker-compose.yml
    ├── e2e-playwright
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── playwright.config.js
    │   └── tests
    ├── flyway
    │   └── sql
    ├── project.env
    └── shopping-lists
        ├── Dockerfile
        ├── app.js
        ├── controllers
        ├── database
        ├── deps.js
        ├── services
        ├── utils
        └── views
```
##  Getting Started

###  Installation

Build the project from source:

1. Clone the project_1 repository:
```sh
❯ git clone https://github.com/nisansalaperera/project_1
```

2. Navigate to the project directory:
```sh
❯ cd project_1
```

3. Install the required dependencies:
```sh
❯ docker compose up
```

###  Tests

Execute the test suite using the following command:
```
❯ docker compose run --entrypoint=npx e2e-playwright playwright test
```
---

##  License

This project is protected under the [The Unlicense](https://choosealicense.com/licenses/unlicense) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/unlicense/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
