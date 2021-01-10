#!/bin/bash

export NODE_ENV=development

yarn run migrations
yarn run seeders
yarn run start