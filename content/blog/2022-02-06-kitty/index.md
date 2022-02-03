---
title: "L’émulateur de terminal Kitty"
slug: lemulateur-de-terminal-kitty
description: "Intro kitty"
date: 2022-02-03
draft: false
in_search_index: true
tags:
- tooling
---

Pour cette quatrième publication au sujet de mon environnement de travail en console, il est temps de parler du choix de l’émulateur de terminal. Un très bon choix serait de partir sur [Rxvt-unicode](http://software.schmorp.de/pkg/rxvt-unicode.html) car il est rapide, stable, recommandé, documenté, publié en licence [GNU](https://fr.wikipedia.org/wiki/Licence_publique_g%C3%A9n%C3%A9rale_GNU)... Bref, un outil fiable et éprouvé !

Mais j’ai choisi [Kitty](https://sw.kovidgoyalthemer.net/kitty/) initialement pour une raison très futile : contrairement à Urxvt, Kitty supporte les ligatures des polices de caractères. Mais au-delà de cette coquetterie, je n’ai absolument pas regretté ce choix.

## Une police nerd avec des ligatures

Commençons donc par cette histoire de ligature. Et tout d’abord, de quoi s’agit-il ? Une image ira plus vite que des mots :

![](3_travaux/1_travaux-en-cours/la-console/attachments/Capture%20d’écran%20de%202021-11-18%2006-41-03.png)

On trouve assez facilement des polices de caractère supportant les ligatures, et notamment des polices monospace bien adapté au code : [FiraCode](https://github.com/tonsky/FiraCode), [JetBrains Mono](https://www.jetbrains.com/lp/mono/?ref=betterwebtype), ...

Pour ma part, j’ai adopté la police [Dank Mono](https://www.thefontsmaster.com/download-dank-mono-2-fonts/) :

![](3_travaux/1_travaux-en-cours/la-console/attachments/dankMono.png)

Maintenant que la question des ligatures est réglée, pourquoi parler d’une [police nerd](https://www.nerdfonts.com) ? Une police nerd est une police qui a été patché pour y ajouter des glyphes (des logos) provenant de projets comme [Font Awesome](https://github.com/FortAwesome/Font-Awesome), [Devicons](http://vorillaz.github.io/devicons/) ou encore [Octicons](https://github.com/github/octicons). Pour faire quoi ? Et bien pour pouvoir afficher des éléments graphiques dans la console, comme avec [Starship](https://starship.rs/) ou [lsd](https://github.com/Peltoche/lsd).

![](3_travaux/1_travaux-en-cours/la-console/attachments/Capture%20d’écran%20de%202021-11-18%2007-12-04.png)

On trouve [plusieurs polices déjà patchées](https://www.nerdfonts.com/font-downloads), mais pas de Dank Mono. Pas grave, il est très facile de patcher soit même une police grâce [aux outils fournis pas le projet nerd-font](https://github.com/ryanoasis/nerd-fonts#font-patcher), comme par exemple une image docker :

```shell
$ docker run -v $PWD/DankMonoInit/OpenType-PS:/in -v $PWD/DankMono:/out nerdfonts/patcher -c
```

Ne restera plus alors qu’à installer la police de caractères patchée sur l’OS, par exemple sous Linux :

```shell
$ mkdir ~/.local/share/fonts
$ mv $PWD/DankMono ~/.local/share/fonts
$ fc-cache -f -v
$ fc-list -b | grep "Dank"
	family: "DankMono Nerd Font"(s)
	fullname: "Dank Mono Bold Nerd Font Complete"(s) "DankMono-Bold"(s)
	file: "/home/alexisjanvier/.local/share/fonts/DankMono/Dank Mono Bold Nerd Font Complete.otf"(s)
	postscriptname: "DankMonoNerdFontComplete-Bold"(s)
	family: "DankMono Nerd Font"(s)
	fullname: "Dank Mono Italic Nerd Font Complete"(s) "DankMono-Italic"(s)
	file: "/home/alexisjanvier/.local/share/fonts/DankMono/Dank Mono Italic Nerd Font Complete.otf"(s)
	postscriptname: "DankMonoNerdFontComplete-Italic"(s)
	family: "DankMono Nerd Font"(s)
	fullname: "Dank Mono Regular Nerd Font Complete"(s) "DankMono-Regular"(s)
	file: "/home/alexisjanvier/.local/share/fonts/DankMono/Dank Mono Regular Nerd Font Complete.otf"(s)
	postscriptname: "DankMonoNerdFontComplete-Regular"(s)
```

Et enfin de configurer kitty pour utiliser cette font, dans le fichier `.config/kitty/kitty.conf` :

```conf
font_family DankMono Nerd Font
bold_font DankMono Nerd Font, Bold
italic_font DankMono Nerd Font, Italic
```

## Les thèmes

Comme dans pas mal d’autres émulateurs de terminal ou d’IDE, il est possible d’utiliser un thème pour [gérer les couleurs d’affichage de kitty](https://sw.kovidgoyal.net/kitty/kittens/themes/?highlight=theme). Il en existe déjà [beaucoup par défaut](https://github.com/kovidgoyal/kitty-themes), dont des set de couleurs classiques comme Dracula, Github, Material ou encore Monokai. Et il en existe bien d’autres [partagés par la communauté](https://github.com/dexpota/kitty-themes). Cela en fait même tellement que ça devient aussi compliquer que de choisir un film sur Netflix.

J’ai pour ma part toujours beaucoup de mal à choisir un thème et mes critères sont finalement limités. Par contre, ce que j’apprécie particulièrement, c’est d’avoir le même thème sur l’ensemble de mes outils, et principalement sur la console et sur vim (qui peut utiliser aussi un principe de thème). Et pour cela, il existe un très bon projet qui va vous permettre de choisir ou de créer un set de couleur, puis de l’exporter en thème compatible pour une grande quantité d’outils : kitty et vim donc, mais aussi Alacritty, GNOME Terminal, Hyper, JetBrains, VS Code, Chrome, Firefox, Tmux ... Il s’agit de [themer](https://themer.dev/). 

![](3_travaux/1_travaux-en-cours/la-console/attachments/Capture%20d’écran%20de%202021-11-20%2008-31-35.png)

## Des onglets et des fenêtres

Tout comme d’autres émulateurs, kitty est capable d’exécuter plusieurs sessions de console organisées en onglets et en fenêtres. Le niveau supérieur d’organisation est l’onglet. Chaque onglet est composé d’une ou plusieurs fenêtres. Les fenêtres peuvent être disposées selon plusieurs dispositions différentes. Tous les raccourcis  claviers  sont toutes personnalisables. Au final, pour les personnes dont j’ai fait parti qui l’utilisait pour justement gérer ces questions d’onglet et de fenêtre, plus besoin de Tmux. On peut même définir des sessions de démarrage incluant les onglets, les fenêtres et les éventuelles clis à lancer, à la tmuxinator.

![](3_travaux/1_travaux-en-cours/la-console/attachments/kitty3.png)

## Des images dans la console

Dernière petite chose, sans doute un peu gadget : il est possible avec kitty d’afficher des images dans la console grâce à [icat](https://sw.kovidgoyal.net/kitty/kittens/icat/?highlight=icat).

![](3_travaux/1_travaux-en-cours/la-console/attachments/Capture%20d’écran%20de%202021-11-20%2009-00-09.png)

## Petit bilan

Kitty n’est pas le seul émulateur dans la place. Ce n’est pas le plus proche de la philosophie *Unix* et sans doute pas le plus technique. Mais il fait fait parfaitement le job et n’a jamais planté depuis plus de 2 ans que je l’utilise au quotidien. Les raccourcis claviers sont simples à retenir (bien plus que tmux je trouve) et il permet d’ajouter une touche graphique au terminal que j’aime bien. Et c’est d’ailleurs beaucoup sur ses capacités graphiques que j’ai orienté ce post. Mais kitty recel bien d’autres spécificités que je vous laisse découvrir si cela vous intéresse sur le site du projet[ ](https://sw.kovidgoyal.net/kitty/kittens/custom/).

## Antisèche

| raccourcie                                                  | fonction                                   |
| ----------------------------------------------------------- | ------------------------------------------ |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>↑</kbd>                | scroll vers le haut                        |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>↓</kbd>                | scroll vers le bas                         |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>t</kbd>                | nouvel onglet                              |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>alt</kbd> <kbd>t</kbd> | renommer l’onglet                          |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>q</kbd>                | fermeture de l’onglet                      |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>←</kbd>                | atteindre l’onglet de gauche               |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>→</kbd>                | atteindre l’onglet de droite               |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>enter</kbd>            | ouvrir une nouvelle fenêtre                |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>]</kbd>                | fenêtre suivante                           |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>[</kbd>                | fenêtre précédente                         |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>1,2,3 ...</kbd>        | atteidre la fenêtre 1,2,3 ...              |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>l</kbd>                | changer le layout d’affichage des fenêtres |
| <kbd>Ctrl</kbd> <kbd>Shit</kbd> <kbd>`</kbd>                | Passer la fenêtre en cours au premier plan |
