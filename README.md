# Elixir Challenge

## TODO

1. Store Models in DB
2. CRUD with 2 clients - admin API and public API
3. Gold Balance -> add remove reliably (money)

### Reqs - includes choices made

1. NestJS applicaiton
2. Express Server
3. MongoDB + Mongoose (maybe)
4. Keep it modular
5. Handle errors + exceptions as required
6. Deploy somewhere

### Optional reqs

1. Cache with redis
2. Event Driven Design
3. voting system
4. Paginate monster list
5. add authentication
6. Add API key rate limitor
7. measure performance

### TODO from list

* correctly test services & controllers (unit tests)
* correctly add e2e tests for all endpoints
* add controller/service functionalites:
  * establish uniqueness on monster, verify on creation/update (see below)

* add schema/model functionalities:
  * ~~add gender and nationalities from permitted collection~~
  * ~~same for title?~~
  * ~~add unique validation for name (both) + title~~
  * test for restrictions

## Description

Backend Monsters CRUD server, serving admin and public APIs

## Technical considerations

### Transactions

Gold updates should use transactions instead of `.findOneAndUpdates` due to the caveats around using validations with those functions (especially on the `$inc` operator). But mongo allows transactions only when a replica set is configured, which although is possible using the docker compose in the project, it goes beyond the scope of this technical challenge due to time constrains.

Therefore to get a reliable service in this challenge, `findOneAndUpdate` was used.

### Presentation

Some presentation DTO was impemented, but more detailed work was possible (especially with decimal types, to consistently round to 4 decimal places), and were avoided due to challenge time constraints.

## Installation

```bash
# setup dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
