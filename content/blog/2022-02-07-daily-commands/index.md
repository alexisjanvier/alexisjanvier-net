---
title: "Mes commandes du quotidien"
slug: mes-commandes-du-quotidien
description: "Intro daily commande"
date: 2022-02-03
draft: false
in_search_index: true
tags:
- tooling
---

Cet article de la série sur ma console est un peu une liste à la Prévert. Mais il y a tout de même un petit fil directeur : je me suis limité aux commandes que j'utilise au moins une fois par jour.

## Remplacement de quelques commandes usuelles

J'ai fait une premiére catégorie pour les commande qui ont remplacé (via un alias) quelques commandes usuelles du shell.

### df => duf
[duf](https://github.com/muesli/duf) remplace la commande `df`  (pour disk free) permettant d'afficher l'espace disque disponible sur votre systeme.

![df à gauche, duf à droite](3_travaux/1_travaux-en-cours/la-console/attachments/df-vs-duf.png)

### du => dust
[dust](https://github.com/bootandy/dust) remplace la commande `du`  (pour disk usage) permettant d'afficher l'occupation disque d'un répértoire.

![dust à gauche, du à droite](3_travaux/1_travaux-en-cours/la-console/attachments/du-vs-dust.png)

### find => fd
[fd](https://github.com/sharkdp/fd) remplace la commande `find` en la rendant beaucoup plus rapide et plus simple à utiliser. Par exemple, pour rechercher `PATTERN`, on utilise `fd PATTERN` au lieu de `find -iname '*PATTERN*'`.

![La demo officielle](3_travaux/1_travaux-en-cours/la-console/attachments/fd.svg)

### ls => lsd
[lsd](https://github.com/Peltoche/lsd) peut remplacer la commande `ls` en la rendant plus graphique (avec des icones par type de fichier), plus colorée et plus lisible (avec par exemple une conversion du poids de fichiers). La commande est configurable (via un fichier `~/.config/lsd/config.yaml`), et en bonus, on trouve l'option `--tree` qui evite d'avoir à installer ... `tree`.
*(Note : l'affichage des icones nécessite l'installation d'une police Nerd dont j'ai déja parlé dans l'article sur Kitty)*

![lsd à gauche, ls à droite](3_travaux/1_travaux-en-cours/la-console/attachments/ls-vs-lsd.png)

### top => bottom
[bottom](https://github.com/ClementTsang/bottom) peut remplacer la commande `top` pour donner des renseignements sur l'utilisation des ressources.

![bottom à gauche, top à droite](3_travaux/1_travaux-en-cours/la-console/attachments/top-vs-bottom.png)

## Les commandes dont je ne pourrais plus me passer

### bat
[bat](https://github.com/sharkdp/bat) aurait pû remplacer la commande `cat`. En effet, cette commande est utiliser pour afficher le contenu d'un fichier dans la console, mais de maniére plus sophistiquée que `cat` : coloration syntaxique, numéro de ligne, prise en compte des modification git, pagination ...

![bat à gauche, cat à droite](3_travaux/1_travaux-en-cours/la-console/attachments/bat-vs-cat.png)

Je n'ai pas fait d'alias `alias cat='bat'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `cat`.

### ripgrep
Tout comme `fd`, [ripgrep](https://github.com/BurntSushi/ripgrep) va permettre de faire une recherche sur un terme. Mais contrairement à `fd`, la recherche ne s'effectue pas sur un nom de fichier ou de répertoire, mais sur le contenu de fichier. Bref, `ripgrep` va chercher recurssivement dans le répértoire courant tous les fichiers contenant un PATTERN de recherche. Il existe d'autre outils pour faire cela (`grep`, `git grep`. [`the silver searcher`](https://github.com/ggreer/the_silver_searcher)), mais `ripgrep` le fait trés bien, trés vite et il est trés configurable.

![Une recherche simple avec ripgrep](3_travaux/1_travaux-en-cours/la-console/attachments/ripgrep.png)

Tout comme `bat`, je n'ai pas fait d'alias `alias grep='rg'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `grep`.

### fzf
[fzf](https://github.com/junegunn/fzf#3-interactive-ripgrep-integration) va sérieusement améliorer la completion dans la console. Cette cli agit comme un *fuzzy finder* dans la console. Pas facile de définir ce qu'est un [Fuzzy finder](https://en.wikipedia.org/wiki/Fuzzy_finder), du coup, une petite illustration va rendre le chose plus claire :

![](3_travaux/1_travaux-en-cours/la-console/attachments/fzf-expansion.mp4)

Le principe de fonctionnement par defaut de `fzf` est le suivant : on tappe une commande, par exemple `rm` puis `**` puis `tab` pour lancer une completion *floue* permettant de trouver trés rapidement le path d'un fichier.

`fzf` utilise `find` par default, mais il est trés facile de lui demander d'utiliser par exemple `fd` que nous avons déja vu.

```
// in .zshenv
export FZF_DEFAULT_COMMAND='fd --type f'
```

Et sans autre forme de configuration, c'est déja une cli vraiment canon. Mais en passant un peu de temps, on arrive à faire de interface vraiment trés pratique, par exemple en combinant `fzf` avec `ripgrep` et `bat` ! Si cela vous interesse, je vous conseil la lecture du [ADVANCED.md](https://github.com/junegunn/fzf/blob/master/ADVANCED.md) du projet, ou de jeter un coup d'oeil sur quelque scripts que j'ai mis en place.

| raccourcie                   | fonction                               |
| ---------------------------- | -------------------------------------- |
| <kbd>Ctrl</kbd> <kbd>t</kbd> | lance fzf depuis le répertoire courant | 

Mais c'est surtout sous nvim que j'utilise les fonctionnalités avancées de `fzf`, ce qui sort du scop de cet article.

### starship
[Starship](https://starship.rs/guide/) est une invite de commande sous stéroide, mais intégrallement configurable.

![L'invite de commande starship](3_travaux/1_travaux-en-cours/la-console/attachments/starship.png)

### tealdeer
[tealdeer](https://github.com/dbrgn/tealdeer) est une implementation en Rust de `tldr`. `tldr` est une collection de pages d'aide maintenues par la communauté pour les outils en ligne de commande, qui vise à être un complément plus simple et plus accessible que l'aide `man`.

![L'aide de la cli ln, à gauche avec tldr, à droite avec man](3_travaux/1_travaux-en-cours/la-console/attachments/tldr-vs-man.png)

### procs
[procs](https://github.com/dalance/procs) permet d'afficher les processus en cours, tout comme le fait la commande `ps`, mais en mieux.

![procs à gauche, ps à droite](3_travaux/1_travaux-en-cours/la-console/attachments/procs-vs-ps.png)

Mais tout comme `bat`, je n'ai pas fait d'alias `alias ps='procs'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `ps`.

### ctop
[ctop](https://github.com/bcicen/ctop) permet d'afficher des informations de monitoring des containers Docker.

![Monitoring Docker avec ctop](3_travaux/1_travaux-en-cours/la-console/attachments/ctop.png)



### direnv
[direnv](https://direnv.net/) va permettre de charger et décharger les variables d'environnement en fonction du répertoire courant. Indispensable !

### did
[did](https://alexisjanvier.net/blog/journal-intime-dun-developpeur/) est une cli de prise de notes. Un must-have ^^
