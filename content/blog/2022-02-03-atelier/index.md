---
title: "La console, mon atelier de travail"
slug: la-console-mon-atelier-de-travail
description: "Premier article d’une série à propos de ce qui est devenu petit à petit mon principal environnement de travail : la console. Mais est-ce juste de parler de console ? Ce premier article va tenter de poser quelques bases pour éviter les abus de langage."
date: 2022-02-07
draft: false
in_search_index: true
tags:
    - outillage
    - terminal
series:
    - Mon terminal
---

Mon écosystème de travail a beaucoup évolué au cours de ma carrière. De mes débuts en PHP avec [Éclipse](https://www.eclipse.org/ide/), à [Sublime Text](https://www.sublimetext.com/) quand je suis passé sous mac, puis [Atom](https://atom.io/) ou encore [Visual Studio Code](https://code.visualstudio.com/) sous Linux, j’ai très souvent pratiqué les éditeurs GUI (pour graphical user interface). 

En parallèle, j’ai dû petit à petit apprendre à manipuler la console, que ce soit pour utiliser des outils uniquement disponibles en cli (command-line interface), du genre [Subversion](https://subversion.apache.org/), [Git](https://git-scm.com/) ou  [gulp.js](https://gulpjs.com/), mais aussi pour gérer des serveurs.

C’est pourtant il n’y a pas si longtemps, avec l’adoption de [vim](https://www.vim.org/)/[Neovim](https://neovim.io/) comme éditeur de code, que la console est définitivement devenue mon environnement de développement. Pour filer la métaphore de l’artisanat du logiciel ([Software Craftsmanship](https://manifesto.softwarecraftsmanship.org/#/fr-fr)), j’aime bien assimiler cette console à mon atelier de travail.

Mais avant d’aller plus loin, de quoi parle-t-on quand on discourt de la console ?

## Le shell

Le Shell est la couche logicielle qui se charge d’interpréter et de transmettre au noyau du système d’exploitation (le kernel) les commandes transmises par l’utilisateur. C’est donc un **interpréteur de commandes**.

Cette appellation est une métaphore (on peut la traduire par coque en français) pour désigner la couche la plus haute des interfaces des systèmes, par opposition à la couche de bas niveau : le noyau.

{{< img src="shell.excalidraw.png" alt="Le shell, à gros traits" >}}

L'utilisateur va interagir avec le shell soit : 
- directement via une **console** sans environnement graphique, dédié uniquement à l'envoi et au retour des commandes,
- soit via un **émulateur de terminal**, aussi appelé **console virtuelle** ou **terminal virtuel**  qui va émuler la console au sein d'un environnement graphique.

### Les shells Unix

Il existe plusieurs shells, les plus courants étant **sh** (appelé Bourne shell), **bash** (Bourne again shell), **csh** (C Shell), **Tcsh** (Tenex C shell), **ksh** (Korn shell) et **zsh** (Zero shell). 

Le premier shell est le **Thompson shell** apparu en 1971 avec la première version d’Unix et écrit par Ken Thompson, l'un des créateurs d'Unix. Il est remplacé par le Bourne shell (**sh**), écrit par Stephen Bourne, en 1977 pour la version 7 d'Unix. 

Le Bourne-Again shell (**bash**) est apparu en 1988. Il est écrit par Brian Fox pour la Free Software Foundation dans le cadre du projet GNU. C'est le shell de nombreuses implémentations libres d'Unix, telles que les systèmes GNU/Linux. Il est compatible avec le Bourne shell dont il se veut une implémentation libre.

Paul Falstad a créé **zsh** en 1990 alors qu'il est étudiant à l'université de Princeton. Ce shell reprend les fonctions les plus pratiques de bash, csh, tcsh. 

Chaque utilisateur possède un shell par défaut, qui sera lancé à l'ouverture d'une invite de commande. Le shell par défaut est précisé dans le fichier de configuration `/etc/passwd`.

### Les shells Mac

À l'origine, l'interpréteur de commandes par défaut était **tcsh**, mais depuis Mac OS X 10.3 Panther jusqu'à macOS Mojave, c'est **bash** qui était utilisé. Depuis macOS Catalina, c'est **zsh** qui est utilisé.

### Les shells Windows

Avec Windows Vista est apparu un nouvel interpréteur de commande, le Windows **PowerShell** . 

## La console

C'est un peu par abus de langage qu'on appelle une fenêtre d'invite de commande contenant un shell un **terminal** ou une **console**. À la base un terminal est un objet physique permettant d'interagir avec l'ordinateur.

{{< img src="terminal.jpeg" alt="Un terminal IRL" >}}

Fondamentalement, une console va gérer les communications des **entrées-sorties** du système. Elle est le plus souvent la seule interface permettant de dialoguer avec la machine en l'absence d'un environnement graphique complet. On voit une console lors du démarrage (boot) de l'ordinateur, on interagit avec le bios via une console. C'est aussi une console qui se lance lors du démarrage d'un OS Unix sans serveur graphique. Dans ce cas, la console démarre une invite de commande sur le shell de l'utilisateur.

{{< img src="archlinux.png" alt="Une console sous Arch Linux" >}}

### Les entrées-sorties standard

L'exécution d'une commande au sein d'une console va créer un **processus**, qui ouvrira trois flux :

1. **stdin** permettant au processus de lire les données d'entrée. Par défaut, _stdin_ correspond au clavier.
2. **stdout** permettant au processus d'écrire les données de sortie. Par défaut, _stdin_ correspond à l'écran.
3. **stderr** permettant au processus d'envoyer un message en cas d'erreur. Par défaut, _stderr_ correspond à l'écran.

{{< img src="std-in-out-error.excalidraw.png" alt="Les entrées-sorties standard" >}}

### Les redirections

Les système de type Unix possèdend des mécanismes permettant de rediriger les entrées-sorties standards vers des fichiers.

Ainsi, l'utilisation du caractère `>` permet de rediriger la sortie standard d'une commande située à gauche vers le fichier situé  à droite :  

```shell
ls -al /home/alexisjanvier/code/ > mesprojets.txt
```

L'emploi d'un double caractère `>>` permet de concaténer la sortie standard vers le fichier, c'est-à-dire ajouter la sortie à la suite du fichier, sans l'écraser.

De manière analogue, le caractère `<` indique une redirection de l'entrée standard. La commande suivante envoie le contenu du fichier mesprojets.txt en entrée de la commande `cat`, dont le seul but est d'afficher le contenu sur la sortie standard :  

```shell
cat < mesprojets.txt
```

### Les pipes

Les **pipes** (tuyaux en français), symbolisé par une barre verticale `|`, permettent d'affecter la sortie standard d'un processus à l'entrée standard d'un autre.

Ainsi dans l'exemple suivant, la sortie standard de la commande `ls -al`  est envoyée sur le programme `sort` chargé de trier le résultat par ordre alphabétique :  

```shell
ls -al | sort
```

## Les multiplexeurs de terminaux

Un multiplexeur de terminal va permettre de lancer et de persister plusieurs sessions de shell au sein de la même console.

C'est très pratique pour lancer plusieurs processus lorsque l'on n’a pas d'environnement graphique permettant d'ouvrir plusieurs fenêtres. C'est aussi très utile pour persister ses processus en cours lorsque l'on quitte la console (par exemple lorsque l'on se déconnecte d'un serveur distant, volontairement ou non).

Les multiplexeurs les plus connus sont [GNU Screen](https://savannah.gnu.org/projects/screen/) et [tmux](https://github.com/tmux/tmux/wiki).

## Les émulateurs de terminaux

L'émulateur de terminal va lui ... émuler une console système au sein d'un environnement graphique. L'émulateur va lancer l'invite de commande du shell de l'utilisateur lui permettant de faire tout ce qui est faisable depuis une console.

Il peut aussi profiter de fonctionnalités de l'interface graphique au sein duquel il est lancé : gestion des couleurs, des polices de caractères, du presse papier, du multifenêtrage ... 

Sous Linux on trouve par exemple [GNOME Terminal](https://help.gnome.org/users/gnome-terminal/stable/), l'émulateur de terminal de GNOME ou encore [rxvt](http://freshmeat.sourceforge.net/projects/rxvt/) et [urxvt (rxvt-unicode)](https://wiki.archlinux.fr/Urxvt). Mais aussi des projets plus récent comme [kitty](https://sw.kovidgoyal.net/kitty/) écrit en Python, ou [alacritty](https://github.com/alacritty/alacritty) écrit en Rust.

Si le sujet vous passionne et que vous souhaitez aller plus loin, je vous conseille la lecture de cet article très complet : [Anatomy of a Terminal Emulator](https://www.poor.dev/blog/terminal-anatomy/)

## Les command-line interfaces (cli)

Lorsque l'on interagit avec le shell via une console, on renseigne après l'invite de commande - le prompt - une commande à exécuter.

Ces commandes sont des petits programmes qui vont utiliser les paramètres donnés en entrée et afficher le résultat sur la sortie du processus lancé par le shell.

Généralement, ce sont des programmes très simples - et bien souvent très rapide - qui font une seule chose, mais la font très bien. 

[Douglas McIlroy](https://fr.wikipedia.org/wiki/Douglas_McIlroy), l'inventeur des pipes `|`, résume la philosophie Unix comme suit :

{{< quoteright "Voici la philosophie d'Unix : 1) Écrivez des programmes qui effectuent une seule chose et qui le font bien. 2) Écrivez des programmes qui collaborent. 3) Écrivez des programmes pour gérer des flux de texte  car c'est une interface universelle." >}}

Voici la philosophie d'Unix :

- Écrivez des programmes qui effectuent une seule chose et qui le font bien.
- Écrivez des programmes qui collaborent.
- Écrivez des programmes pour gérer des flux de texte  car c'est une interface universelle. 
 
Et une cli répond parfaitement à cette philosophie puisqu’elle est prévue pour interagir via du texte (en entrée et en sortie de console) et qu'elle est collaborative puisque l'on peut chainer ses sortie/entrée via le pipe `|` à d'autres cli.

Par exemple, vous pouvez utiliser ensemble les cli `history`, `grep`, `sort`, `uniq` et `head` pour afficher les cli que vous utilisez le plus ou la fréquence de leur utilisation.

```shell
~ 
➜  history | sed -e 's/ *[0-9][0-9]* *//' | sort | uniq -c | sort -rn | head -10
    405 git st
    334 git aa
    237 code .
    227 make start
    219 exit
    185 make stop
    180 git prb
    147 git push
    119 git cleanup
    109 git co develop
~ 
➜  history | awk '{print $2;}' | sort | uniq -c | sort -rn | head -10
   4117 git
   1375 make
    467 sudo
    446 g
    349 cd
    262 code
    221 exit
    216 npm
    214 ls
    167 ssh
```

## La suite

Passé cette (un peu longue, mais je l'espère instructive et contextualisant) introduction, je vais maintenant m'essayer à vous présenter ce qui fait que ma console est mon atelier de travail, façonné par mes préférences et mes habitudes. Je parlerais du mon choix de shell et d'émulateur de terminal, mais aussi des cli que j'apprécie le plus. Ce ne sera pas forcément votre atelier idéal, mais je souhaite qu'il puisse vous servir d'inspiration ou vous faire découvrir quelques bons outils.

Cette suite se décomposera en 6 articles :

1. [Un atelier ouvert et transposable grâce aux dotfiles](/blog/un-atelier-ouvert-et-transposable-grace-aux-dotfiles)
2. Pourquoi j'ai choisi le shell zsh
3. L'émulateur de terminal kitty
4. Mes commandes du quotidien
5. Mes commandes git

## Références

- [Linux - Le shell - Comment Ça Marche](https://www.commentcamarche.net/contents/645-linux-le-shell)
- [Shell Unix — Wikipédia](https://fr.wikipedia.org/wiki/Shell_Unix)
- [Anatomy of a Terminal Emulator](https://www.poor.dev/blog/terminal-anatomy/)
