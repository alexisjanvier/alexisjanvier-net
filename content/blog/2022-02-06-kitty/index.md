---
title: "L’émulateur de terminal Kitty"
slug: lemulateur-de-terminal-kitty
description: "Pour cette quatrième publication au sujet de mon terminal, je passe en revue les raisons m'ayant fait choisir Kitty comme émulateur : sa gestion de polices de caractère avec ligature, ses thèmes et sa gestion des onglets et fenêtres."
date: 2022-02-10
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

[Rxvt-unicode](http://software.schmorp.de/pkg/rxvt-unicode.html) est un très bon choix [d’émulateur de terminal](/blog/le-terminal-mon-atelier-de-travail/#les-émulateurs-de-terminaux) car il est rapide, stable, recommandé, documenté, publié en licence [GNU](https://fr.wikipedia.org/wiki/Licence_publique_g%C3%A9n%C3%A9rale_GNU)... Bref, un outil fiable et éprouvé !

Mais j’ai choisi [Kitty](https://sw.kovidgoyalthemer.net/kitty/) initialement pour une raison très futile : contrairement à Urxvt, Kitty supporte les ligatures des polices de caractères. Mais au-delà de cette coquetterie, je n’ai absolument pas regretté ce choix.

## Une police nerd avec des ligatures

Commençons donc par cette histoire de ligature. Et tout d’abord, de quoi s’agit-il ? Une image ira plus vite que des mots :

{{< img src="ligature.png" alt="Quelques exemples de ligature." >}}

On trouve assez facilement des polices de caractère supportant les ligatures, et notamment des polices monospace bien adapté au code : [FiraCode](https://github.com/tonsky/FiraCode), [JetBrains Mono](https://www.jetbrains.com/lp/mono/?ref=betterwebtype), ...

Pour ma part, j’ai adopté la police [Dank Mono](https://www.thefontsmaster.com/download-dank-mono-2-fonts/) :

{{< img src="dankMono.png" alt="La police Dank Mono" >}}

Maintenant que la question des ligatures est réglée, pourquoi parler d’une [police nerd](https://www.nerdfonts.com) ? Une police nerd est une police qui a été patché pour y ajouter des glyphes (des logos) provenant de projets comme [Font Awesome](https://github.com/FortAwesome/Font-Awesome), [Devicons](http://vorillaz.github.io/devicons/) ou encore [Octicons](https://github.com/github/octicons). Pour faire quoi ? Et bien pour pouvoir afficher des éléments graphiques dans la console, comme avec [Starship](https://starship.rs/) ou [lsd](https://github.com/Peltoche/lsd).

{{< imgbig src="nerdInConsole.png" alt="Utilisation d'une police nerd dans l'émulateur de terminal" >}}

On trouve [plusieurs polices déjà patchées](https://www.nerdfonts.com/font-downloads), mais pas de Dank Mono. Ce n'est pas grave, il est très facile de patcher soit même une police grâce [aux outils fournis pas le projet nerd-font](https://github.com/ryanoasis/nerd-fonts#font-patcher), comme par exemple une image docker :

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

{{< img src="themer.png" alt="L'interface de themer" >}}

## Des onglets et des fenêtres

Tout comme d’autres émulateurs, kitty est capable d’exécuter plusieurs sessions de console organisées en onglets et en fenêtres. Le niveau supérieur d’organisation est l’onglet. Chaque onglet est composé d’une ou plusieurs fenêtres. Les fenêtres peuvent être disposées selon plusieurs dispositions différentes. Tous les raccourcis  claviers  sont personnalisables. Pour les personnes (dont j’ai fait parti) qui l’utilisait pour justement gérer ces questions d’onglets et de fenêtres, plus besoin de [Tmux](https://github.com/tmux/tmux/wiki)! On peut même définir des sessions de démarrage incluant les onglets, les fenêtres et les éventuelles clis à lancer, à la [tmuxinator](https://github.com/tmuxinator/tmuxinator).

{{< imgbig src="kitty3.png" alt="Les onglets et les fenêtres de Kitty" >}}

## Des images dans la console

Dernière petite chose, sans doute un peu gadget : il est possible avec kitty d’afficher des images dans la console grâce à [icat](https://sw.kovidgoyal.net/kitty/kittens/icat/?highlight=icat).

{{< img src="zappa.png" alt="Affichage d'une image dans la console" >}}

## Petit bilan

Kitty n’est pas le seul émulateur dans la place. Ce n’est pas le plus proche de la philosophie *Unix* et sans doute pas le plus technique. Mais il fait fait parfaitement le job et n’a jamais lâché depuis plus de 2 ans que je l’utilise au quotidien. Les raccourcis clavier sont simples à retenir (bien plus que tmux, je trouve) et il permet d’ajouter une touche graphique au terminal que j’aime bien. Et c’est d’ailleurs beaucoup sur ses capacités graphiques que j’ai orienté ce post. Mais Kitty possède bien d’autres spécificités que je vous laisse découvrir, si cela vous intéresse, sur [le site du projet](https://sw.kovidgoyal.net/kitty/kittens/custom/).

## Antisèche

| Raccourci                                                  | Fonction                                   |
| ----------------------------------------------------------- | ------------------------------------------ |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="↑" >}}                | scroll vers le haut                        |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="↓" >}}                | scroll vers le bas                         |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="t" >}}                | nouvel onglet                              |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="alt" >}} {{< keyboard key="t" >}} | renommer l’onglet                          |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="q" >}}                | fermeture de l’onglet                      |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="←" >}}                | atteindre l’onglet de gauche               |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="→" >}}                | atteindre l’onglet de droite               |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="enter" >}}            | ouvrir une nouvelle fenêtre                |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="]" >}}                | fenêtre suivante                           |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="[" >}}                | fenêtre précédente                         |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="1,x" >}}        | atteindre la fenêtre 1,x              |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="l" >}}                | changer le layout d’affichage des fenêtres |
| {{< keyboard key="Ctrl" >}} {{< keyboard key="Shift" >}} {{< keyboard key="`" >}}               | Passer la fenêtre en cours au premier plan |
