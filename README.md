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
  * establish uniqueness on monster, verify on creation/update

* add schema/model functionalities:
  * add gender and nationalities from permitted collection
  * same for title?
  * test for restrictions

## Description

Backend Monsters CRUD server, serving admin and public APIs

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
