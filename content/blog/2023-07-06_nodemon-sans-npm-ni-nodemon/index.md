---
title: "nodemon, sans npm ni nodemon"
slug: nodemon-sans-npm-ni-nodemon
description: "Comment faire pour relancer automatiquement un processus node lorsque le code est modifié, sans npm ni nodemon ?"
date: 2023-07-06
draft: false
incaya: https://incaya.fr/blog/nodemon-sans-npm-ni-nodemon/
in_search_index: true
tags:
  - javascript
  - anti-npm-npm-club
---

`npm` n'est pas en odeur de sainteté ces jours-ci chez INCAYA (cela mériterait un post à part entière pour l'expliquer). Mais comme on aime tout de même JavaScript, nous venons de commencer un projet s'appuyant sur un serveur tournant sur Node.js. L'une des questions classiques en phase de démarrage technique de ce type de projet est la suivante : comment faire pour relancer automatiquement le processus node lorsque le code est modifié ?

La réponse standard serait d'utiliser [nodemon](https://nodemon.io/) (voir [pm2](https://pm2.keymetrics.io/)), solution simple, efficace, éprouvée voir pavlovienne pour un développeur JavaScript/Node.

Mais cela implique un `npm install --dev nodemon`. Hors l'idée est de reculer au maximum l'utilisation de `npm`, tant que d'autres solutions viables et suffisamment simples existent.

Et c'est le cas, en utilisant un sous-système du noyau Linux : [inotify](https://en.wikipedia.org/wiki/Inotify).

Pour cela, on part d'une image node dans laquelle on installe [inotify-tool](https://github.com/inotify-tools/inotify-tools):

```dockerfile
// in Dockerfile
FROM node:18.16

RUN apt-get update && apt-get install -y \
  inotify-tools \
  && rm -rf /var/lib/apt/lists/*
```

Ensuite, on écrit un petit script `bash` pour lancer le serveur (`node server.js`), puis `inotifwait` sur le répertoire contenant notre code à observer (`api` dans l'exemple à suivre):

```bash
// in watch.sh
#!/bin/sh
node server.js &
PID=$!

watch () {
    inotifywait -r -m -e close_write "api" | while read f; do kill $PID; node server.js & PID=$!; done
}

watch
```

Et enfin, on lance notre serveur node dans Docker, non pas avec un `node server.js`, mais en appelant le script précédent `./watch.sh`.

```yaml
// in docker-compose.yaml
version: "3.8"

services:
  api:
    build:
      context: .
    volumes:
      - ./:/webapp/:rw
    working_dir: /webapp
    command: "./watch.sh"
```

Vous me direz que c'est un peu de code et que cela oblige à installer `inotify-tool` dans l'image Docker. Oui, mais c'est un mécanisme qui pourra convenir à autre chose que du `node`. Bien sûr, cela fonctionne en dehors de Docker ! Et vous n'aurez pas commencé à creuser un nouveau trou noir `node_modules` sur votre système.
