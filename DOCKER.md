## Docker

### Setup

* Install dependencies
    * [docker-compose](https://docs.docker.com/compose/install/)
    * [justfile](https://just.systems/man/en/)

### Usage

* Test containers locally
  * Fill out the `.env` file per its `.env.example`
  * Assuming that the containers are running, navigate to http://localhost:3000/ to use the website
* Docker commands
    ```bash
    # clean build (remove `--no-cache` for speed)
    docker-compose build --no-cache

    # start container
    docker-compose up -d

    # stop container
    docker-compose stop

    # destroy container and network
    docker-compose down --remove-orphans
    ```
* justfile runner commands
    ```bash
    # help
    just

    # build image locally (no-cache)
    just build-clean

    # build image locally
    just build

    # start container
    just start

    # ssh
    just exec

    # stop container
    just stop

    # stop container, remove container and network
    just down
    ```

### Further Reading

[Deployment | Next.js](https://nextjs.org/docs/deployment#docker-image)

[Manage NEXT_PUBLIC Environment Variables at Runtime with Docker](https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl)

[docker image with NEXT_PUBLIC_ env variables](https://github.com/vercel/next.js/discussions/17641)
