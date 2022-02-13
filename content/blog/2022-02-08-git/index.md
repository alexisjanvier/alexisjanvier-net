---
title: "Mes commandes Git"
slug: mes-commandes-git
description: "Ce sixième et dernier article de la série sur mon terminal aborde la commande que j'utilise le plus : git. Je fais le tour de mes alias, des cli et des scripts que j'ai pu ajouter au cours de mes années de pratique quotidienne, et d'un script unifiant se foisonnement de commandes devenues hétérogènes : gitt."
date: 2022-02-12
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

Bien  évidemment, et même s’il existe de très bons outils permettant d'utiliser [Git](https://git-scm.com/) avec une interface graphique (je pense par exemple à VS Code), je ne sortirais pas de la console.

## La configuration de Git

La configuration de Git se fait dans le fichier `~/.gitconfig`. On y trouve les paramètres nécessaires au bon fonctionnement de Git (sur l'utilisateur, l'éditeur par défaut, la signature des commits, ...), mais c'est aussi dans ce fichier que l'on peut personnaliser la cli, à commencer par la création d'alias.

Je classerais mes alias en deux catégories.

### Les alias de raccourci

Ce sont les alias permettant de raccourcir une commande git d'origine, par exemple `git co` au lieu de `git checkout`, ou alors ceux permettant de ne pas avoir à se souvenir d'options compliquées, comme `git lg` à la place de `log --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative --graph`

Les noms donnés à ces alias dépendent de chacun. Ils n'ont pas forcément besoin d'être explicites, mais ils seront courts, l'important étant qu'ils deviennent automatiques.

```conf
# in ~/.gitconfig
[alias]
  # Shortcuts
  aa = add .
  ci = commit
  co = checkout
  st = status
  br = branch
  lg = log --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative --graph
  prb = pull --rebase=merges
```

### Les alias métiers

Je ne suis pas très convaincu du terme métiers, mais je n'en trouve pas d'autres. Il s'agit de mes alias qui simplifient une suite d'action git que je réalise régulièrement sous une commande simple et explicite (tout du moins pour moi).

J'ai par exemple un `git fixup` qui va ajouter automatiquement une modification dans le commit précédent en une seule commande. C'est très utile quand on se rend compte d'une bête typo faite dans un fichier. Ou encore un `git repo-top10` pour lister les 10 principaux contributeurs d'un dépôt.

```conf
[alias]
  # ...
  # Daily
  fixup = "!git add -p && git commit --amend --no-edit"
  please = push --force-with-lease
  
  # Repo views
  repo-branches-and-tags = log --all --graph --decorate --oneline --simplify-by-decoration
  repo-current-status = log --graph --abbrev-commit --decorate --all --format=format:\"%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(dim white) - %an%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n %C(white)%s%C(reset)\"
  repo-top10 = "!f() { git shortlog --numbered --summary HEAD | head -10; }; f"
  repo-who-worked-on = shortlog -sn
  repo-this-week = "!f() { git shortlog --after=\"1 week ago\" --before=\"today\" --pretty=format:\"%ar%n %h - %s %n\"; }; f"
  repo-yesterday = "!f() { git diff --shortstat --since=\"1 day ago\"; }; f"
  repo-yesterday-commit = "!f() { git shortlog --since=\"1 day ago\" --pretty=format:\"%ar%n %h - %s %n\"; }; f"; f"

  # Maintenance
  delete-merged-branches-on-master = "!git co master && git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d"
  delete-merged-branches-on-develop = "!git co develop && git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d"
  delete-merged-branches-on-main = "!git co main && git branch --merged | grep -v '\\*' | xargs -n 1 git branch -d"
  cleanup = "!git remote update --prune origin && git repack && git gc"
  conflicts = "!f() { git ls-files -u | cut -f 2 | sort -u; }; f"
  keep-mine = checkout --ours --
  keep-theirs = checkout --theirs --

  # Other
  it = "!git init && git commit -m 'chore: the very first commit' --allow-empty"
  show-aliases = "!git config --get-regexp alias|sed \"s/alias.\\([a-zA-Z-]*\\) \\(\\.\\)*/$(tput setaf 2)\\1 $(tput setaf 8)\\2/\""
```

## Des cli supplementaires

On trouve énormément de projets dont l'objectif est d’améliorer la cli native de Git, à commencer par `Oh My Zsh` dont j’ai déjà parlé. Mais les fonctionnalités ou les raccourcis offerts ne m’ont que rarement paru probant par rapport à ce que l’on peut mettre soit même dans son `. gitconfig`.

Un outil dont j'ai souvent eu à discuter est [gitflow](https://github.com/petervanderdoes/gitflow-avh). Et pour faire court, je le déteste. Tout d'abord, il impose des sortes d'alias métier qui ne sont pas les miens (je n'aime pas qu'un outil lance des commandes git les branches ou les tags du dépôt à ma place), et je trouve son modèle de branche bien trop compliqué. Sur les petits projets, j'aime travailler avec une unique branche `main` (je dois confesser que `main` se prononce encore `master` dans ma tête, mais j'aime beaucoup l'argument qui dit que `main` est bien plus inclusif !). Et pour des projets plus conséquents, incluants par exemple un environnement de staging, une branche `main` et une branche `develop`. Au-delà, je suis persuadé que la complexité nuit à la fluidité.

Pour autant, certain de ces projets apportent un réel confort par rapport aux possibilités offertes nativement par Git. Voici ceux que j'utilise.

### delta
[delta](https://github.com/dandavison/delta) améliore l'affichage des commandes `git diff` et `git blame`.

{{< img src="delta.png" alt="un git blame affiché avec delta" >}}

### gh
[gh](https://github.com/cli/cli) est la cli officielle de Github. Et ce n'est pas facile aujourd'hui de travailler en se passant de Github, tant cet outil est incroyablement puissant (outils de revue de code, les Github actions, les webhooks, la gestion de packages, la gestion des releases...). Il est aussi largement utilisé par la communauté open source et par notre industrie. Ce n'est pas impossible de travailler sans, Github n'est pas Git. Mais si au moins une partie de vos projets sont sur Github, et que vous y utilisez des fonctionnalités un petit peu avancées, la cli officielle est un incontournable.

{{< img src="gh-worflow.png" alt="Visualiser un workflow github action depuis sa console" >}}


### gitui
L'objectif de [gitui](https://github.com/extrawurst/gitui) est d'apporter l'ergonomie d'une interface graphique complète de gestion de dépôt git, mais dans la console.

{{< mp4 src="gitui.mp4" alt="gitui en action (demo officielle)" >}}

Dans l'absolue, on doit pouvoir gérer tout son flux git en restant dans gitui. À mon avis, si c'est ce qui est recherché, mieux vaut utiliser une vraie interface graphique du type [Sourcetree](https://www.sourcetreeapp.com/) ou [GitKraken](https://www.gitkraken.com/). Mais j'aime tout de même bien avoir gitui sous la main pour découvrir rapidement un nouveau dépôt ou faire un peu d'archéologie sur un vieux projet.

### tokei
[tokei](https://github.com/XAMPPRocky/tokei) génère une analyse statique des lignes de code d'un projet.

{{< img src="tokei.png" alt="Analyse statique d'un projet avec Tokei" >}}

Oui, tokei n'a pas de rapport direct avec Git, mais j'y reviendrais un peu plus tard.

## Des scripts

En plus des cli supplémentaires, j'ai créé, copié ou modifié un certain nombre de scripts et de fonctions qui me facilitent la vie. Ces scripts s'appuient souvent sur des outils évoqués dans l'article précédent "Mes commandes du quotidien'.

J'ai par exemple une fonction qui me permet de basculer d'une branche à l'autre de manière interactive, en utilisant fzf :

```shell
_gcb() {
  selectedb=$(
    is_in_git_repo || return
    git branch -a --color=always | grep -v '/HEAD\s' | sort |
    fzf-down --ansi --multi --tac --preview-window right:70% \
      --preview 'git log --oneline --graph --date=short --color=always --pretty="format:%C(auto)%cd %h%d %s" $(sed s/^..// <<< {} | cut -d" " -f1)' |
    sed 's/^..//' | cut -d' ' -f1 |
    sed 's#^remotes/##'
  )

  if [ -n "$selectedb" ]; then 
    git checkout $selectedb
  fi
}
```

{{< imgbig src="gcb.png" alt="Utilisation de la fonction gcb" >}}

Vous pouvez découvrir toutes ces fonctions dans le fichier [`git`](https://github.com/alexisjanvier/dotfiles/blob/main/dotfiles/zsh/.config/zsh/git)  dans mon dépôt dotfiles.

## gitt

{{< quoteright "un petit script pour les gouverner tous" >}}

Le problème avec tous ces outils supplémentaires et ses fonctions, c’est la difficulté à se rappeler qu’ils existent, mais aussi se souvenir de leur syntaxe et de leurs options. Pour résoudre ce problème, j’ai mis en place un petit script "pour les gouverner tous". Ce script permet d’appeler ces outils hétérogènes à travers une syntaxe unifiée, proche de git, avec des commandes signifiantes (encore une fois, signifiantes pour moi) : `gitt COMMANDE`. 

Voici les commandes que j'ai mises en place : 

```bash
-------------------------------
- gitt : commandes git custo. -
-------------------------------

 * br : selectionner une branche avec fzf
 * daily : des informations pour le daily
 * delete : selectionner une branche à supprimer (force) avec fzf
 * discover : découvrir le repo git
 * pr : passer sur la branche d'une PR Github avec fzf
 * remotes : afficher les remotes avec fzf
 * stash : afficher les patchs de stash avec fzf
 * tags : afficher les tags avec fzf
 * top : explorer le repo avec gitui
```

Par exemple,  voici ce que donne `gitt pr` :

{{< imgbig src="gittpr.png" alt="gitt pr : basculer vers la branche d'un pull request en cours sur Github" >}}

Ou encore `gitt discover`. Cette commande utilise entre autres `tokei`, d'ou se présence dans ma liste des cli supplémentaires.

{{< imgbig src="gittdiscover.png" alt="gitt discover : découvrir un nouveau dépôt" >}}

Vous pouvez voir le script [`gitt.sh`](https://github.com/alexisjanvier/dotfiles/blob/main/dotfiles/zsh/.config/zsh/gitt.sh) complet dans mon dépôt dotfiles.
