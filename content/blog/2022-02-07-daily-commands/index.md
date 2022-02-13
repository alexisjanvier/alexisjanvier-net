---
title: "Mes commandes du quotidien"
slug: mes-commandes-du-quotidien
description: "Ce cinquième article de la série sur la console est un peu une liste à la Prévert. Mais il y a tout de même un fil directeur : je me suis limité aux commandes que j'utilise au moins une fois par jour."
date: 2022-02-11
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

## Remplacement de quelques commandes usuelles

Et pour commencer, voici une première catégorie: celle des commandes ayant remplacé (via un alias) quelques commandes natives du Shell.

### df => duf
[duf](https://github.com/muesli/duf) remplace la commande `df`  (pour disk free) permettant d'afficher l'espace disque disponible sur votre système.

{{< imgbig src="df-vs-duf.png" alt="df à gauche, duf à droite" >}}

### du => dust
[dust](https://github.com/bootandy/dust) remplace la commande `du`  (pour disk usage) permettant d'afficher l'occupation disque d'un répertoire.

{{< imgbig src="du-vs-dust.png" alt="dust à gauche, du à droite" >}}

### find => fd
[fd](https://github.com/sharkdp/fd) remplace la commande `find` en la rendant beaucoup plus rapide et plus simple à utiliser. Par exemple, pour rechercher `PATTERN`, on utilise `fd PATTERN` au lieu de `find -iname '*PATTERN*'`.


![La démo officielle de fd](fd.svg)

### ls => lsd
[lsd](https://github.com/Peltoche/lsd) peut remplacer la commande `ls` en la rendant plus graphique (avec des icônes par type de fichier), plus colorée et plus lisible (avec par exemple une conversion du poids de fichiers). La commande est configurable (via un fichier `~/.config/lsd/config.yaml`), et en bonus, on trouve l'option `--tree` qui évite d'avoir à installer ... `tree`.

{{< imgbig src="ls-vs-lsd.png" alt="lsd à gauche, ls à droite" >}}

> Note : l'affichage des icônes nécessite l'installation d'une police Nerd dont j'ai déjà parlé dans l'article sur Kitty.

### top => bottom
[bottom](https://github.com/ClementTsang/bottom) peut remplacer la commande `top` pour donner des renseignements sur l'utilisation des ressources du système.

{{< imgbig src="top-vs-bottom.png" alt="bottom à gauche, top à droite" >}}

## Les commandes dont je ne pourrais plus me passer

Cette seconde catégorie regroupe des commandes devant être ajoutées à celles fournies nativement par le Shell.

### bat
[bat](https://github.com/sharkdp/bat) aurait pu remplacer la commande `cat`. En effet, cette commande est utilisée pour afficher le contenu d'un fichier dans la console, mais de manière plus sophistiquée que `cat` : coloration syntaxique, numéro de ligne, prise en compte des modifications git, pagination ...

{{< imgbig src="bat-vs-cat.png" alt="bat à gauche, cat à droite" >}}

Je n'ai pas fait d'alias `alias cat='bat'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `cat`.

### ripgrep
Tout comme `fd`, [ripgrep](https://github.com/BurntSushi/ripgrep) va permettre de faire une recherche sur un terme. Mais contrairement à `fd`, la recherche ne s'effectue pas sur un nom de fichier ou de répertoire, mais sur le contenu de fichier. Bref, `ripgrep` va chercher récursivement dans le répertoire courant tous les fichiers contenant un PATTERN de recherche. Il existe d'autres outils pour faire cela (`grep`, `git grep`, [`the silver searcher`](https://github.com/ggreer/the_silver_searcher)), mais `ripgrep` le fait très bien, très vite, et il est très configurable.

{{< imgbig src="ripgrep.png" alt="Une recherche simple avec ripgrep" >}}

Tout comme `bat`, je n'ai pas fait d'alias `alias grep='rg'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `grep`.

### fzf
[fzf](https://github.com/junegunn/fzf#3-interactive-ripgrep-integration) va sérieusement améliorer la complétion dans la console. Cette cli agit comme un *fuzzy finder* dans la console. Pas facile de définir ce qu'est un [Fuzzy finder](https://en.wikipedia.org/wiki/Fuzzy_finder), du coup, une petite illustration va rendre la chose plus claire :

{{< mp4 src="fzf-expansion.mp4" alt="Une recherche simple avec ripgrep" >}}

Le principe de fonctionnement par défaut de `fzf` est le suivant : on tape une commande, par exemple `rm` puis `**` puis `tab` pour lancer une complétion *floue* permettant de trouver très rapidement le path d'un fichier.

`fzf` utilise `find` par défaut, mais il est très facile de lui demander d'utiliser par exemple `fd` que nous avons déjà vu.

```config
// in .zshenv
export FZF_DEFAULT_COMMAND='fd --type f'
```

Et sans autre forme de configuration, c'est déjà une cli vraiment canon. Mais en passant un peu de temps, on arrive à faire des interfaces vraiment très pratiques, par exemple en combinant `fzf` avec `ripgrep` et `bat` ! Si cela vous intéresse, je vous conseille la lecture du [ADVANCED.md](https://github.com/junegunn/fzf/blob/master/ADVANCED.md).

Mais c'est surtout sous Vim que j'utilise les fonctionnalités avancées de `fzf`, ce qui sort du cadre de cet article.

### starship
[Starship](https://starship.rs/guide/) est une invite de commande sous stéroïdes, intégralement configurable.

{{< imgbig src="starship.png" alt="L'invite de commande starship" >}}

### tealdeer
[tealdeer](https://github.com/dbrgn/tealdeer) est une implémentation en Rust de `tldr`. `tldr` est une collection de pages d'aide maintenues par la communauté pour les outils en ligne de commande, qui vise à être un complément plus simple et plus accessible que l'aide `man`.

{{< imgbig src="tldr-vs-man.png" alt="L'aide de la cli ln, à gauche avec tldr, à droite avec man" >}}

### procs
[procs](https://github.com/dalance/procs) permet d'afficher les processus en cours, tout comme le fait la commande `ps`, mais en mieux.

{{< imgbig src="procs-vs-ps.png" alt="procs à gauche, ps à droite" >}}

Mais tout comme `bat`, je n'ai pas fait d'alias `alias ps='procs'` parce que j'ai plusieurs scripts sh qui s'appuient sur l'affichage standard de `ps`.

### ctop
[ctop](https://github.com/bcicen/ctop) permet d'afficher des informations de monitoring des conteneurs Docker.

{{< imgbig src="ctop.png" alt="Monitoring Docker avec ctop" >}}

### direnv
[direnv](https://direnv.net/) va permettre de charger et décharger les variables d'environnement en fonction du répertoire courant. Indispensable !

### did
[did](https://alexisjanvier.net/blog/journal-intime-dun-developpeur/) est une cli de prise de notes. Un must-have ^^
