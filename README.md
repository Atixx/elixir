# Elixir Games challenge

## Description

Backend Monsters CRUD server, serving admin and public APIs

## Technical considerations

### Transactions

Gold updates should use transactions instead of `.findOneAndUpdates` due to the caveats around using validations with those functions (especially on the `$inc` operator). But mongo allows transactions only when a replica set is configured, which although is possible using the docker compose in the project, it goes beyond the scope of this technical challenge due to time constrains.

Therefore to get a reliable service in this challenge, `findOneAndUpdate` was used.

### Presentation

Some presentation DTO was impemented, but more detailed work was possible (especially with decimal types, to consistently round to 4 decimal places), and were avoided due to challenge time constraints.

### Documentation

Simple swagger documentation is present for the API, a more complete project would include better detailed request and response payload and header examples

### Authentication

Simple authentication was used with hard-coded in memory verification, clearly this adapted for the simple challenge example

## Running the app

Requires Docker with docker compose.

Running `docker compose up --build -d` will start the mongo server, initializing the data on the repository's `./db-data` directory, will wait for service to be healthy and start the NestJS service.

Check the documentation at:

`http://localhost:3000/api`

### User login information

* **User: Bored Mike**

```plain
username: mike
pass: bored
roles: Admin and User
```

* **User: Elixir CEO**

```plain
username: elixirCEO
pass: gimme-gold
roles: Admin and CEO
```
