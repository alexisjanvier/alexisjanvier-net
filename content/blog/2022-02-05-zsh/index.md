---
title: "Pourquoi j'utilise le shell zsh"
slug: pourquoi-j-utilise-le-shell-zsh
description: "Ce troisième article de la série sur ma console pourrait être très technique, tant les discussions sur les différents Shell peuvent être polémiques et pointues (et barbantes). Mais il ne l'est pas, car je m'y borne à parler de la configuration de zsh et des quelques points ayant emporté mon adhésion : la complétion, Oh My Zsh et les alias."
date: 2022-02-09
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

J’utilise dans ce billet plusieurs exemples de configuration. C'est pourquoi (et pour faire suite à [l’article sur les `dotfiles`](blog/un-terminal-transposable-grace-aux-dotfiles/)) je ne vais pas commencer par des fonctionnalités de zsh mais plutôt aborder sa configuration.

## Les fichiers de configuration

À minima, il faut un fichier`~/.zshrc`, tout comme on trouve un `~/.bashrc` lorsque l'on utilise `bash`. Mais `zsh` s'appuie en fait sur 5 fichiers de configuration qu'il va essayer de lire dans un ordre spécifique :

1. **`~/.zshenv`** - Ce fichier va contenir les variables d'environnement de l'utilisateur. Il est lu en premier, et les variables d'environnement déclarées pourront donc être utilisées dans le fichier suivant.
2. **`~/.zprofile`** - Ce fichier va pouvoir contenir des commandes qui seront lancées à la connexion de l'utilisateur.
3. **`~/.zshrc`** - Il s'agit du fichier principal de configuration du Shell. C'est le seul obligatoire, et dans l'absolue, il pourrait contenir les autres fichiers (déclaration des variables d'environnement, des commandes ...)
4. **`~/.zlogin`** - Ce fichier va pouvoir contenir des commandes qui seront lancées à la connexion de l'utilisateur, tout comme le `~/.zprofile`. Mais contrairement à ce dernier, il est lu après le `~/.zshrc`.
5. **`~/.zlogout`** - Ce fichier va pouvoir contenir des commandes qui seront lancées à la déconnexion de l'utilisateur.

Pour ma part, et parce que pour tout dire je ne saurais pas quoi mettre dans les autres, je n'utilise que `~/.zshenv` et `~/.zshrc`. Par contre, j'ai découpé l'organisation de ces fichiers en quelques sous-fichiers, pour par exemple avoir un fichier dédié aux alias ou encore un fichier de variables d'environnement privées que je ne souhaite pas partager dans mes `dotfiles`. Voilà ce que cela donne :

```shell
~
├── .dotfiles
│   └── zsh
│        ├── .zshenv
│        ├── .zshrc
│        └── .config
│             └── zsh
│             	   └── aliases
├── .dotfiles-private
│   └── zsh
│        └── env
├── .zshenv ⇒ .dotfiles/zsh/.zshenv
├── .zshrc  ⇒ .dotfiles/zsh/.zshrc
├── .config
│       └── zsh ⇒ ../.dotfiles/.config/zsh
└── .config-private ⇒ .dotfiles-private
```

Et voici un extrait de ce que l'on trouve dans mon `~/.zshenv` :

```shell
######
# ZSH
######
export ZDOTDIR="$HOME/.config/zsh"
export ZPRIVATEDOTDIR="$HOME/.config-private/zsh"
if [ -f "$ZPRIVATEDOTDIR/env" ] ; then
  source "$ZPRIVATEDOTDIR/env"
fi
```

Ou encore dans mon `~/.zshrc`

```shell
if [ -f "$ZDOTDIR/aliases" ] ; then
  source "$ZDOTDIR/aliases"
fi
```

## La complétion

La complétion est clairement l'un des points forts de `zsh`. Il faut avant tout l'activer :

```shell
# in ~/.zshrc
autoload -Uz compinit && compinit
```

Ceci fait, il ne reste plus qu'à utiliser la touche {{< keyboard key="tab" >}} lorsque l'on tappe une commande pour la mettre à contribution.

Ce serait très long de parler de toutes les facettes d'autocompletion offertes par `zsh`, mais en voici quelque unes qui me semblent significatives :

- la completion simple : si l'on tappe  `$ cd /user/lo` + {{< keyboard key="tab" >}}, on obtient  `$ cd /usr/local`,
- l'expansion récursive du chemin : si l'on tappe  `$ cd /u/lo/b` + {{< keyboard key="tab" >}}, on obtient  `$ cd /usr/local/bin`.

`zsh` posséde aussi nativement une completion sur les clis les plus usuelles. Par exemple, si l'on tappe  `$ cp -` + {{< keyboard key="tab" >}}, on obtient :

```shell
$ cp -
 -H  -- follow symlinks on the command line in recursive mode
 -L  -- follow all symlinks in recursive mode
 -P  -- do not follow symlinks in recursive mode (default)
 -R  -- copy directories recursively
 -X  -- do not copy extended attributes or resource forks
 -a  -- archive mode, same as -RpP
 -f  -- force overwriting existing file
 -i  -- confirm before overwriting existing file
 -n  -- do not overwrite existing file
 -p  -- preserve timestamps, mode, owner, flags, ACLs, and extended attributes
 -v  -- show file names as they are copied
```

Mais si la complétion de votre cli préférée n'est pas disponible, c'est assez facile, car bien documenté, de la faire soit même. En fait, il est fort probable que quelqu'un l'ait déjà fait pour vous. De par sa nature très configurable et extensible, `zsh` a inspiré plusieurs projets centralisant toutes ces préconfigurations jugées suffisamment communes pour être partagés. Et l'une des plus connues est [Oh My Zsh - a delightful & open source framework for Zsh](https://ohmyz.sh/)

## Oh My Zsh

{{< quoteright "Oh My Zsh est un charmant framework, open source, piloté par la communauté, pour gérer votre configuration Zsh. Il est livré avec des milliers de fonctions utiles, d'aides, de plugins, de thèmes, et quelques trucs qui vous font crier... 'Oh My ZSH!'" >}}

`Oh My Zsh` donne accés à beaucoup de chose : des [thèmes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) permettant de modifier completement l'aspet du terminal et/ou du prompt, d'ajouter des alias sur les commandes les plus usuelles, des completions ...

De mon côté - même si je l'ai longtemps fait - je n'utilise pas de thèmes. Par contre, j'utilise quelques plugins natifs, comme :

- [docker-compose](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose): des completions pour `docker` et `docker-compose`,
- [safe-paste](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/safe-paste) : empêcher l'exécution de tout code pendant le collage, afin qu'on puisse vérifier ce qui a été collé avant de l'exécuter,
- [vi-mode](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vi-mode) : voir la "le mode vi".

 Et j'ai installé plusieurs plugins externes au projet :
 
 - [zsh-completions](https://github.com/zsh-users/zsh-completions) : améliore les completion native de `zsh`
 - [zsh-kitty](https://github.com/redxtech/zsh-kitty) : une completion pour `kitty`,
 - [zshmarks](https://github.com/jocelynmallon/zshmarks) : un plugin de mise en favoris des répertoires. Indispensable pour naviguer rapidement d'un projet à l'autre !

## Le mode vi

Cette fonctionnalité n'intéressera sans doute que les utilisateurs de  `vim` (ou d'`emacs` puisqu'il existe aussi un mode emacs), mais il est possible d'activer le mode vi :

```shell
# in ~/.zshrc
bindkey -v
```

Couplé au plugin Oh-my-zsh [vi-mode](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vi-mode), on peut alors en appuyant sur {{< keyboard key="Esc" >}} passer en mode `normal` de vim et utiliser les raccourcies standard (h, l, e, E ...) pour se déplacer et éditer la commande en cours.

## Alias global et alias de suffixe

Si l'on peut créer des alias avec `bash`, on ne peut les utiliser qu'en début de commande. Avec `zsh`, on peut déclarer un alias global `-g` utilisable n'importe où dans la ligne de commande. Prenons un exemple :

```shell
# in ~/.config/zsh/aliases
alias -g L='|less'
```

Cela permet maintenant de lancer la commande `$ ls -la /etc L`

Dans la même veine, les alias de suffixes `-s` vont permettent d'indiquer à zsh d'ouvrir les fichiers avec un éditeur configuré pour certaines extensions. Prenons un exemple  :

```shell
# in ~/.config/zsh/aliases
alias -s js="nvim"
```

Dorénavant, la commande `$ ./index.js` ouvre le fichier directement dans vim.

## L'autocorrection

J'ai découvert cette fonctionnalité avec [thefuck](https://github.com/nvbn/thefuck) et je ne crois pas que ce soit un *must-have*. N'en reste pas moins que c'est disponible nativement dans `zsh` :

```shell
# in ~/.zshenv
export SPROMPT='Fix %R to %r ? [y:Yes, n:No, a:Abord, e:Edit]'
```

```shell
# in ~/.zshrc
setopt correct
```

Ce qui donnera :

```shell
$ eco "plop"
Fix eco to echo ? [y:Yes, n:No, a:Abord, e:Edit]
```

## Petit bilan

Je n'ai fait que survoler le potentiel de `zsh`, en me focalisant sur les points les plus ... ergonomiques. Ceux que je connais le mieux en fait.

Mais si le titre de cet article avait été une question *"Pourquoi j'utilise le Shell zsh ?"*, je répondrais en guise de conclusion : 

- parce que c'est un Shell utra configurable et personnalisable,
- cette personnalisation est facilitée par l'existence de projets comme Oh-my-zsh,
- il offre des fonctionnalités de complétion très poussées (entre autres dans l'historique de la console),
- il offre une gestion des alias améliorée,
- pour qui connait vim, il offre un mode vi vraiment pratique dès que l'on doit taper des commandes un peu longues.
