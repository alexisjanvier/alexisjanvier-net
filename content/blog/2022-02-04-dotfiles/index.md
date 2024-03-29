---
title: "Un terminal transposable grâce aux dotfiles"
slug: un-terminal-transposable-grace-aux-dotfiles
description: "Dès que l'on commence à utiliser quotidiennement le terminal, on cherche à l'adapter à ses habitudes via des fichiers de configuration : les dotfiles. Ce second article aborde l'organisation de ces fichiers, mais aussi une stratégie permettant de les sauvegarder et donc de les partager. Et s'il existe plusieurs outils pour effectuer cette tâche, je parle de celui que j'utilise maintenant : Stow."
date: 2022-02-08
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

Prendre l’outil en main est un passage obligé lorsque l’on découvre la console. On va apprendre les clis usuelles et leurs options, faire des alias, en installer de nouvelles, les configurer, les associer dans des scripts… L’un des avantages de notre métier, c’est que cette somme d’expériences de “mise à la main” de l’outil est enregistrable dans de simples fichiers textes fongibles. Cependant, la gestion de ces fichiers implique quelques efforts sous peine de s’y perdre.

## Le principe

Sous Unix, on configure beaucoup de choses, presque tout en fait, via de simples fichiers textes présents dans le répertoire de l'utilisateur.trice. Ces fichiers ou ces dossiers sont généralement cachés par le navigateur du fichier. Leur nom est précédé d’un point — d’où leur nom générique de dotfiles — et on doit demander explicitement leur affichage.

Prenons la configuration de deux outils : [Starship](https://starship.rs/) et [lsd](https://github.com/Peltoche/lsd). Les deux sont configurables via un fichier dans le répertoire `~/.config` :

```bash
.config
├── lsd
│   └── config.yaml
└── starship.toml
```

> Tous les dotfiles ne sont donc pas nécessairement préfixés par un *.dot*, mais considérons que tous les fichiers présents dans `~/.config` sont des dotfiles.

On retrouve aussi beaucoup de ces *dotfiles* directement dans le répertoire `home` de l'utilisateur : `.gitconfig`, `.bashrc`, `.npm`, `.vimrc`, ...

L'idée va être de tous les regrouper au sein d'un unique répertoire, par exemple `~/.dotfiles`, et de versionner ce répertoire avec `git` pour le sauvegarder et pouvoir facilement le partager.

```bash
.dotfiles
├── lsd-config.yaml
└── starship.toml
```

Puis de faire un lien (ou une copie selon la solution choisie) entre ces fichiers versionnés et le chemin où doit se trouver la configuration. Cela donnerait avec des liens symboliques :

```bash
.config
├── lsd
│   └── config.yaml ⇒ ../.dotfiles/dotfiles/lsd-config.yaml
└── starship.toml ⇒ ../.dotfiles/starship.toml
```

## Les gestionnaires de dotfiles

Le premier réflexe lorsque l'on veut partager ou sauvegarder ses dotfiles est de créer [une automatisation du processus](https://www.freecodecamp.org/news/build-your-own-dotfiles-manager-from-scratch/). Et bien évidemment, il existe des programmes pour le faire.

Il existe par exemple [chezmoi.io](https://www.chezmoi.io/), qui fait beaucoup de choses (gestion de multiples environnements, gestion des secrets ...). Trop peut-être, car sa bonne utilisation requiert un apprentissage non négligeable.

Mais il existe aussi en vrac : [yadm](https://yadm.io/), [dotbot](https://github.com/anishathalye/dotbot) ou encore [dot](https://github.com/sds/dot).

Pour ma part, j'ai finalement opté pour [GNU Stow](https://www.gnu.org/software/stow/), une valeur sûre du monde GNU, qui fait une chose (la gestion automatisée de liens symboliques), mais qui le fait bien.

## Stow

GNU Stow est un gestionnaire de ferme de liens symboliques. Mais encore ? Prévu à l'origine pour faciliter l'installation/désinstallation de packages système, Stow va prendre le contenu d'un répertoire source et faire de manière optimum les liens symboliques respectant la même hiérarchie de fichier dans un répertoire cible. 

Par exemple, prenons deux répertoires `source` et `cibles` :

```bash
.~
├── source
│   └── foo
│        └── .bar
└── cible
```

On lance `$ stow --target cible source` et on obtient :

```bash
.~
├── source
│   └── foo
│        └── .bar
└── cible
      └── foo  ⇒ ../source/foo
```

Si l'on n’avait pas renseigné la cible `--target cible`, `stow` aurait pris par défaut la racine de là où est lancée la commande, soit :

```bash
.~
├── source
│   └── foo
│        └── .bar
└── foo  ⇒ ~/source/foo
```

De même, si le répertoire cible avait contenu un répertoire `foo` :

```bash
.~
├── source
│   └── foo
│        └── .bar
└── cible
      └── foo
```

`stow` aurait alors créé un lien sur le fichier `.bar` :

```bash
.~
├── source
│   └── foo
│        └── .bar
└── cible
      └── foo
	  	   └── .bar  ⇒ ../../source/foo/.bar
```

> Remarque : pour que `stow` fonctionne, il ne faut pas que le fichier devant être lié existe dans le répertoire source. Dans notre exemple, si le fichier `~/cible/foo/.bar` avait existé, le lancement de la commande `stow` aurait provoqué une erreur.

Cela donnerait pour reprendre notre premier exemple :

```bash
~
├── .dotfiles
│   └── .config
│          ├── starship.toml
│          └── lsd
│               └── config.yaml
└── .config
```

On lance `$ stow .dotfiles` et on obtient :

```bash
~
├── .dotfiles
│   └── .config
│          ├── starship.toml
│          └── lsd
│               └── config.yaml
└── .config
        ├── starship.toml ⇒ ../.dotfiles/starship.toml
        └── lsd ⇒ ../.dotfiles/lsd
```

Ne reste plus qu'à transformer le répertoire `.dotfiles` en dépôt git, et nous voilà avec une configuration sauvegardée, versionnée et partageable de notre environnement de travail.

## Automatisation

On peut, si on le souhaite et surtout si l’on en a besoin, aller plus loin en automatisant un peu plus les choses. En créant notre ferme de liens symboliques dans le répertoire `. dotfiles`, on a sauvegardé la configuration spécifique et complète de notre environnement de travail courant. Mais on peut aussi avoir besoin d’installer l’intégralité de cet environnement sur une autre machine ou encore une partie seulement sur un serveur sans environnement graphique.

Pour cela, une première bonne pratique va consister à isoler les configurations par outils au sein du répertoire `. dotfiles` :

```bash
.dotfiles
├── starship
│   └── .config
│          └── starship.toml
└── lsd
    └── .config
           └── lsd
                └── config.yaml
```

On va ainsi pouvoir lancer Stow de manière indépendante pour chaque outil :

```bash
$ cd ~/.dotfiles && stow -vSt ~ starship
$ cd ~/.dotfiles && stow -vSt ~ lsd
```

Ensuite, lorsque l'on a beaucoup d'outils, on va pouvoir créer des scripts permettant d'utiliser Stow en une seule commande sur une collection d'outils, par exemple avec un script dans `~/.dotfiles/stow-all-laptop.sh` :

```bash
#!/bin/bash

echo '[*] Removing default configurations ...'
rm rf ~/.config/lsd ~/.config/starship.toml

echo '[*] Stowing starship'
stow -vSt ~ starship
echo '[*] Stowing/ lsd'
stow -vSt ~ lsd
```

On pourra aussi automatiser l'installation des outils eux-mêmes ! Par exemple avec un script `~/.dotfiles/install-cli-tools.sh` :

```bash
#!/bin/bash

# starship minimal, blazing-fast, and infinitely customizable prompt
# https://starship.rs/
echo '[*] Install starship'
sh -c "$(curl -fsSL https://starship.rs/install.sh)"
# ls => lsd - https://github.com/Peltoche/lsd
echo '[*] Install lsd to replace ls'
cargo install lsd
```

Cette commande `install-cli-tools` préssupose la présence de `curl` et de `cargo` : automatisons aussi leur installation avec `~/.dotfiles/install-laptop.sh` :

```bash
#!/bin/bash

echo '[*] Install apt requierements ...'
sudo apt -y install apt-transport-https curl gnupg stow

echo '[*] Install rust ...'
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

echo '[*] Making all installation script executable ...'
chmod +x *.sh

./install-cli-tools.sh
./stow-all-laptop.sh
```

Et voilà, sur un nouveau laptop (dans l'exemple, il faudra tout de même avoir un OS de type Debian), ne reste plus qu'à faire :

```bash
$ cd
$ git clone git@github.com:you/your-dotfiles-repo.git .dotfiles
$ cd .dotfiles
$ ./install-laptop.sh
```

Et normalement, vous devriez vous sentir comme chez vous.

## Des exemples

Les développeurs adorent partager leur dotfiles, comme [YannickSchini](https://github.com/YannickSchini/dotfiles) ou [mlgruby](https://github.com/mlgruby/dotfile). Vous trouverez une liste conséquente de lien sur le sujet sur [Awesome dotfiles](https://project-awesome.org/webpro/awesome-dotfiles).

Et voici les miens : [alexisjanvier/dotfiles](https://github.com/alexisjanvier/dotfiles).
