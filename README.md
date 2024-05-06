## Introduction

Welcome to the tribal backend.

This project is built using the NestJS framework. Please see 'Main Tools' below for resources and information.

## Main Tools

- Typescript
- Nest JS Framework (https://nestjs.com/)
- TypeORM (https://typeorm.io/#/)

## Running Locally

To run a local database, you need Docker installed

1. Run `$>docker pull postgres:14.2`. This command will download a docker image with the latest version of postgres.
   - To ensure the data persists beyond the container lifecycle you need to create a local mount point as a data
     volume: `mkdir -p $HOME/docker/volumes/tribal`
2. Run `$>docker run --rm --name tribal-backend -e POSTGRES_PASSWORD=password -e POSTGRES_DB=tribal -d -p 4200:4200 -v $HOME/docker/volumes/tribal:/var/lib/postgresql/data postgres:14.2`
   - This command will create a new container with the name `tribal-backend` and expose the port 4200 to the host machine.
3. To check if your DB is running as expected, try to connect to it using a DB tool (like DataGrip or DBeaver)
   - You can connect using User credentials of "_postgres_” and “_password_”