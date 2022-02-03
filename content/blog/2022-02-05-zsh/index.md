---
title: "Pourquoi j'ai choisi le shell zsh"
slug: pourquoi-jai-choisi-le-shell-zsh
description: "Intro zsh"
date: 2022-02-03
draft: false
in_search_index: true
tags:
- tooling
---

Rassurez-vous, je ne vais pas ici me lancer dnas une grande comparaision entre `bash` et `zsh`. Et entre autre pour une bonne raison : je  n'ai moi-même pas utilisé `zsh` sur un choix raisonné et éclairé, mais juste parce que quelqu'un qui connaissait les outils console beaucoup mieux que moi me l'avait conseillé.

Donc ce post de blog ne traitera pas du pourquoi - et oui du coup le titre est un peu mensongé - mais plutôt des choses qui font que j'ai continué à l'utiliser et qui pourrait me servir d'arguments pour à mon tour vous le conseiller.

## Les fichiers de configuration

Cette première partie n'est pas un argument en faveur de `zsh`, c'est juste que pour la suite, je donnerais des exemples de configuration, et pour cela, il me semblait plus logique de commencer par un petit point sur ces fichiers de configuration et sur ma propre organisation.

Donc à minima, on va avoir un fichier `~/.zshrc`, tout comme on trouve un `~/.bashrc` lorsque l'on utilise `bash`. Mais officiellement, `zsh` va chercher dans 5 fichiers de configuration dans un ordre spécifique :

1. `~/.zshenv` - Ce fichier va contenir les variables d'environnement de l'utilisateur. Il est lû en premier, et les variables d'environnement déclarée pouront donc être utilisées dans le fichiers suivant.
2. `~/.zprofile` - Ce fichier va pouvoir contenir des commandes qui seront lancée à la connexion de l'utilisateur.
3. `~/.zshrc` - Il s'agit du fichier principale de configuration du shell. C'est le seul obligatoire, et dans l'absolue, il pourrait contenir les autres fichiers (déclartion des variables d'environnement, des commandes, ...)
4. `~/.zlogin` - Ce fichier va pouvoir contenir des commandes qui seront lancée à la connexion de l'utilisateur, tout comme le `~/.zprofile`. Mais contrairement à ce dernier, il est lû aprés le `~/.zshrc`.
5. `~/.zlogout` - Ce fichier va pouvoir contenir des commandes qui seront lancée à la déconnexion de l'utilisateur.

Pour ma part, et parce que pour tout dire je ne serrais pas quoi mettre dans les autres, je n'utilise que `~/.zshenv` et `~/.zshrc`. Par contre, j'ai découpé l'organisation de ces fichiers en quelques sous fichiers, pour par exemple avoir un fichier dédié aux alias ou encore un fichier de variables d'environnement privées que je ne souhaite pas partager dans mes `dotfiles`. Voila ce que cela donne :

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

Et par exemple, voila ce qu'on trouve dans mon `~/.zshenv` :

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

## L'auto-completion
L'auto-completion est clairement un des points forts de `zsh`. Il faut avant tout l'activer :

```shell
# in ~/.zshrc
autoload -Uz compinit && compinit
```

Ceci fait, il ne reste plus qu'à utiliser la touche <kbd>tab</kbd> lorsque l'on tappe une commande pour mettre en route l'auto-completion.

Ce serait très long de parler de toutes les fonctionnalités d'autocompletion offertes par `zsh`, mais voila celles qui me semble les plus parlantes.

- l'auto-completion simple : si l'on tappe  `$ cd /user/lo` + <kbd>tab</kbd>, on obtient  `$ cd /usr/local`,
- l'expansion récursive du chemin : si l'on tappe  `$ cd /u/lo/b` + <kbd>tab</kbd>, on obtient  `$ cd /usr/local/bin`.

`zsh` posséde aussi nativement une auto-completion sur les clis les plus usuelles. Par exemple, si l'on tappe  `$ cp -` + <kbd>tab</kbd>, on obtient :

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

Et si l'auto-completion de votre cli préférée n'est pas disponible, c'est assey facile car bien documenté de la faire soit même. Et en fait, il est fort probable que quelqu'un l'ai déja fait pour vous. En effet, `zsh` étant trés configurable et extensible, il existe plusieurs projets centralisant toutes ces extentions jugées suffisament communes pour être partagées. Et l'une des plus connue est [Oh My Zsh - a delightful & open source framework for Zsh](https://ohmyz.sh/)

## Oh-my-zsh
Oh-my-zsh donne accés à beaucoup de chose : des [thémes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) permettant de modifier completement l'aspet du terminal et/ou du prompt, d'ajouter des alias sur les commandes les plus usuelles, des auto-completions ...

De mon côté - même si je l'ai longtemps fait - je n'utilise pas de themes. Par contre, j'utilise plusieurs plugins natifs, comme :

- [docker-compose](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose): des auto-completions pour `docker` et `docker-compose`,
- [safe-paste](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/safe-paste) : empêcher l'exécution de tout code pendant le collage, afin qu'on puisse vérifier ce qui a été collé avant de l'exécuter,
- [vi-mode](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vi-mode) : voir la "le mode vi".

 Et j'en ai installé plusieurs autres :
 
 - [zsh-completions](https://github.com/zsh-users/zsh-completions) : améliore les auto-completion native de `zsh`
 - [zsh-kitty](https://github.com/redxtech/zsh-kitty) : une auto-completion pour `kitty`,
 - [zshmarks](https://github.com/jocelynmallon/zshmarks) : un plugin simple de mise en favoris des lignes de commande, pour oh-my-zsh

## Le mode vi

Cette fonctionnalité n'interressera sans-doute que les utilisateurs de  `vim` (ou d'`emacs` puisqu'il existe aussi un mode emacs), mais il est possible d'activer le mode vi :

```shell
# in ~/.zshrc
bindkey -v
```

Couplé au plugin Oh-my-zsh [vi-mode](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vi-mode), on va maintenant pouvoir en appuyant sur <kbd>Esc</kbd>  passer en mode `normal` de vim et utiliser les raccourcies standard (h, l, e, E ...) pour se déplacer et éditer la commande en cours.

## Alias global et alias de suffixe

Si on peut créer des aliases avec `bash`, on ne peut les utiliser qu'en début de commande. Avec `zsh`, on va pouvoir déclarer un aliase global `-g` utilisables n'importe ou dans la ligne de commande. Par exemple :

```shell
# in ~/.config/zsh/aliases
alias -g L='|less'
```

On va pouvoir lancer la commande `$ ls -la /etc L`

Les alias de suffixes `-s` vont eux permettent d'indiquer à zsh d'ouvrir les fichiers avec certaines extensions. Par exemple  :

```shell
# in ~/.config/zsh/aliases
alias -s js="nvim"
```

Maintenant, en tappant la commande `$ ./index.js`, cela ouvrira le fichier directement dans vim.

## L'auto-correction

J'ai tout d'abord découvert cette fonctionnalité avec [thefuck](https://github.com/nvbn/thefuck), et je ne crois pas que ce soit un *must-have*. N'en reste pas moins que c'est disponible nativement dans `zsh` :

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

Je n'ai fait qu'effleurer le potentiel de `zsh` en me focalisant sur les points les plus ... ergonomiques. Mais c'est déja pas mal. Pour tout de même donner un début de réponse à la question titre de ce post, *"Pourquoi j'ai choisi le shell zsh"*, je résumerais donc par : parce que c'est un shell utra configurable et personnalisable, personnalisation rendue d'autant plus facile par l'existance de projets comme Oh-my-zsh. Il offre aussi des fonctionnalités de (auto-)complétion trés poussées, une gestion des alias améliorées et, pour qui connait vim, un mode vi vraiment pratique dés que l'on doit tapper des commandes un peu longue.
