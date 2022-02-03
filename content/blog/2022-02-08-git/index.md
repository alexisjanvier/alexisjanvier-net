---
title: "Mes commandes git"
slug: mes-commandes-git
description: "Intro git"
date: 2022-02-03
draft: false
in_search_index: true
tags:
- tooling
---

Si il est bien un outils devenu presque transparent pour moi tellement il fait parti de mon processus de production, c'est [Git](https://git-scm.com/) et sa cli. Je ne vais bien évidament pas en faire un tutorial dans se dernier article de la série sur la console, mais vous présentez brievement ma configuration à laquelle je suis arrivé aprés plusieurs année de pratique. 

Bien  évidamment, et même si il existe de trés bon outils permettant de gérer ses projets git avec une interface graphique (le pense par exemple à VS Code), nous ne sortirons pas de la console pour gérer les dépôts git.

## alias

Configuration techique. Pas un ninja, mais configuration pragmatique marche bien avec un worflow git simple.

Des alias de raccoucie. On aime ou pas, c'est pas explicite et propre à la tête de chacun , comme les noms des heros dans les romans de sf.

Et des alias métier, en montrer un ou deux

## cli supplementaires

Pas de gitflow ni de git zsh. gitflow parce que fait des choses que j'ai pas demander et impose donc des contraintes. git zsh et bien ... j'avais mes propres alias avant de m'y pencher.

Mais j'ai testé vraiment beaucoup de petit outils facillitant ou améliorant l'experience git sous la console, pour n'en garder finalement que peu.

### delta
[GitHub - dandavison/delta: A syntax-highlighting pager for git, diff, and grep output](https://github.com/dandavison/delta)

### gh
[GitHub - cli/cli: GitHub’s official command line tool](https://github.com/cli/cli)

### gitui
[GitHub - extrawurst/gitui: Blazing 💥 fast terminal-ui for git written in rust 🦀](https://github.com/extrawurst/gitui)

### tokei
[tokei](https://github.com/XAMPPRocky/tokei) va donner des statistiques sur les lignes de code d'un projet.

![Analyse statique d'un projet avec Tokei](3_travaux/1_travaux-en-cours/la-console/attachments/tokei.png)

## scripts

En plus des cli supplementaires, j'ai créé, copié ou modifié un certain nombre de script qui me facilite la vie, des scripts s'appuyant souvent sur des outils évoqué dans l'article précedent xx.

Par exemple, j'ai une fonction qui me permet de basculer sur une branche de maniére interactive en utilisant fzf

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

![Utilisation de la fonction gcb](3_travaux/1_travaux-en-cours/la-console/attachments/gcb.png)

Vous pouvez voir toutes ces fonctions dans le fichier `git`  dans mon dépôt dotfiles.

## gitt

Le probléme avec tous ces oulils supplémentaires et ses fonctions, c'est la difficulté de se rappeller la maniére de les appeller. Pour résoudre ce probléme, j'ai mis en place un petit script qui permet de les appeller facillement avec une syntaxe proche de git et logique à retenir : `gitt COMMANDE`. 
Voici les commandes que j'ai mis en place : 

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

Par exemple,  voici ce que donne `gitt pr` 

![gitt pr : basculer vers la branche d'un pull request en cours sur Github](3_travaux/1_travaux-en-cours/la-console/attachments/gittpr.png)

Ou encore `gitt discover` (qui utlise `tokei`, j'avais bien dit que j'y viendrais ...)

![gitt discover : découvrir un nouveau dépôt](3_travaux/1_travaux-en-cours/la-console/attachments/gittdiscover.png)

Vous pouvez voir le script `gitt` complet dans mon dépôt dotfiles.
