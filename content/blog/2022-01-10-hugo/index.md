---
title: "Pourquoi choisir Hugo comme générateur de site statique"
slug: pourquoi-choisir-hugo-comme-generateur-de-site-statique
description: "Un générateur statique de site est un peu le chainon entre un site écrit de A à Z en HTML/CSS à la main, et un site dynamique nécessitant un serveur et une technologie spécifique (PHP, Python, JavaScript, Elixir ...). Parmi l'offre pléthorique de générateur de ce type, pourquoi choisir Hugo ?"
date: 2022-01-10
draft: false
in_search_index: true
tags:
- web
---

## Mes critères de sélection d'un générateur de site statique

{{< quoteright "Il faut une séparation des contenus (interopérables et indépendants de tout outil sophistiqué de stockage) et de leur présentation finale" >}}

Contrairement à une publication de contenu HTML/CSS à la main, ce que j’attends d'un générateur statique de site, c'est une séparation des contenus et de leur présentation finale. Mais je veux aussi que ce contenu soit interopérable (c'est à dire mobilisable sur différents générateurs de site) et indépendant de tout outil sophistiqué de stockage (genre base de données). Et pour cela, l'utilisation d'un simple fichier texte sans balisage complexe est une très bonne option. Tous les générateurs de site que j'ai pu tester en sont capables grâce aux fichiers formatés en [Markdown](https://daringfireball.net/projects/markdown/syntax). J'enfonce une porte ouverte, tous les générateurs répondent à cette problématique, ils sont faits pour cela. Certains peuvent se connecter à d'autres sources de donnée (base de données, API ...), mais tous sont capables de lire des contenus stockés en Markdown. Hugo ne se distingue donc pas des autres selon ce critère.

{{< quoteright "Il faut la possibilité de générer des contenus finaux n'utilisant que du HTML et du CSS." >}}

Le second critère guidant mon choix est la possibilité de générer des contenus finaux n'utilisant que du HTML et du CSS. Il faut que le contenu publiable puisse être le plus léger possible. Cela veut dire qu'on doit pouvoir se passer de JavaScript. On devra évidemment pouvoir l'utiliser, mais cela ne devra pas être imposé par le générateur. Et là, on commence à raccourcir sérieusement ma liste des prétendants : plus de [Next.js](https://nextjs.org/) (du moins dans son utilisation classique), de [Gatsby](https://www.gatsbyjs.com/), de [Docusaurus](https://docusaurus.io/) et autre [docsify](https://docsify.js.org/#/) ...

{{< quoteright "Il faut que l'outil soit simple à installer." >}}

Troisième critère : il faut que l'outil soit simple à installer. Je ne veux ni de dépendances compliquées ni devoir installer un environnement de développement pour un langage spécifique. Cela exclu définitivement [Next.js](https://nextjs.org/docs/advanced-features/static-html-export) (dépendance à Node/npm), [Jekyll](https://jekyllrb.com/) (dépendance à Ruby/gem), [obelisk](https://github.com/BennyHallett/obelisk)  (dépendance à Elixir/mix) ou encore [Pelican](https://blog.getpelican.com/) (dépendance à Python/pip).

{{< quoteright "Il faut que l'outil soit simple." >}}

Ne reste plus dans ma liste que trois candidats : [Pandoc](https://pandoc.org/), [Hugo](https://gohugo.io/) et [Zola](https://www.getzola.org/). Les trois peuvent en effet être installés sous la forme d'un simple exécutable.

[Pandoc](https://www.ordecon.com/2020/07/pandoc-as-a-site-generator.html) ne passe pas le quatrième critère : il faut que l'outil soit simple.

Entre les deux derniers finalistes, Zola est celui qui m'attire le  plus. En effet, *hype* oblige (mais aussi à cause d'[Emmanuel](https://caen.camp/talks/rust-ou-le-plaisir-de-coder)), je préfère partir sur un outil codé en Rust plutôt qu'en Go, dans le cas ou il faudrait mettre un jour les mains sous le capot. Mais ce n'est pas franchement un critère valable : je ne code ni en Rust ni en Go au jour où j'écris ce billet.

Du coup, c'est la maturité du projet et la communauté qu'il y a derrière qui départagent les deux derniers concurrents. Et le gagnant est Hugo.

{{< img src="hugoVsZola.jpg" alt="Hugo Vs Zola sur Github" >}}

Source : [Github Compare](https://www.githubcompare.com/gohugoio/hugo+getzola/zola)

## Post-scriptum

Je pensais au départ faire ce post de blog sur le mode tutoriel. Mais je crois bien n'avoir rien à apporter de plus sur ce mode que ce qui existe déjà. La [documentation officielle](https://gohugo.io/documentation/) est bien fournie. L'utilisation d'Hugo est très classique, et hormis la syntaxe des templates, si vous avez précédemment utilisé Jekyll, Zola ou même Gatsby, vous retrouverez vite vos marques.

J'avais envie de faire un focus sur quelques points qui m'ont demandé un peu de recherches, comme l'extraction de contenus sur la page d'accueil ([mise en avant du dernier article, puis une liste des deux suivants](https://gist.github.com/alexisjanvier/66aa5f417f9429b0cd73337a20ba399c#file-index-html)), l'utilisation de la [configuration](https://gist.github.com/alexisjanvier/66aa5f417f9429b0cd73337a20ba399c#file-config-toml) pour déterminer [l'entrée active du menu](https://gist.github.com/alexisjanvier/66aa5f417f9429b0cd73337a20ba399c#file-menu-html), ou encore l'écriture d'un [`shortcode` pour les images](https://gist.github.com/alexisjanvier/66aa5f417f9429b0cd73337a20ba399c#file-img-html).

{{< quoteright "Les shortcodes constituent selon moi le plus gros défaut de Hugo." >}}

Mais je me contenterais d'une remarque sur les shortcodes justement, qui constituent à mon sens le plus gros défaut de Hugo. Hugo ne supporte pas les balises HTML au sein de la syntaxe Markdown. Les balises HTML sont simplement ignorées. Pour pouvoir mettre du HTML, ce qui peut être nécessaire quand le Markdown ne suffit plus (par exemple pour inclure une vidéo ou mettre une balise picture HTML), on doit écrire un code spécifique : un [`shortcode`](https://gohugo.io/content-management/shortcodes/).

Voici un exemple permettant de mettre mes `blockquote` en *float right* (*remarque : j'ai dû échapper la balise d'ouverture du shortcode `{{` pour empêcher sa conversion par Hugo*) :

```markdown
\{\{< quoteright "Les shortcodes constituent selon moi le plus gros défaut de Hugo." >}}
```

Celui-ci sera interprété en HTML par Hugo. 

```html
<figure class="floatRight">
    <blockquote>
        <p>Les shortcodes constituent selon moi le plus gros défaut de Hugo.</p>
    </blockquote>
</figure>
```

Les shortcodes sont diablement pratiques et puissants, mais ils ont un effet de bord : on se retrouve avec un balisage du contenu propre à Hugo (et même de la personne ayant écrit le shortcode), au détriment du critère d'interopérabilité et du standard Markdown. Dommage.

On devra, pour importer du contenu existant ou exporter du contenu Hugo, utiliser un outil comme `sed` sur les fichiers markdown. Voici un extrait du script que j'ai utilisé pour importer mes articles de blog existant sur mon nouveau blog généré par Hugo, afin de transformer le balisage standard des images `![]()` en un shortcode `figure` :

```bash
for folderpath in `ls -d ./blog/*/`; do
	sed -i 's|\!\[\(.*\)\](\(.*\))|\{\{<figure src="\2" alt="\1" >\}\}|g' ${folderpath}/index.md
done
```
{{< quoteright "The world’s fastest framework for building websites." >}}

N'en reste pas moins que Hugo reste un excellent outil, avec une caractéristique qui lui a valu sa baseline : **il est incroyablement rapide**. Pour donner un ordre d'idée, j'ai travaillé sur une étude de faisabilité de la migration d'un gros blog (plus de 390 articles) de Gatsby vers Hugo. Et bien, lorsque Gatsby mettait un peu plus de 15 min à générer tout le blog, avec redimensionnement des images, Hugo (avec un template plus simple) mettait lui, toujours avec le redimensionnement des images, un peu moins de 15 ... secondes. Il s'agit bien sûr d'un benchmark à la grosse louche, mais il donne un bon ordre d'idée.

{{< quoteright "profiter de la sobriété d'un hébergement statique" >}}

Je conseille à tous les développeurs d'avoir un de ces générateurs de site statique dans sa boite à outils, et Hugo me semble définitivement un très bon choix. Que ce soit pour un site perso, pour aider un collectif sans moyen ou même pour des projets clients qui parfois pourraient (et sans doute devraient) profiter de la sobriété d'un hébergement statique tout en étant capable créer et éditer les contenus sans difficulté grâce à la la syntaxe Markdown. Et pour les plus allergiques à ce type de rédaction, il sera toujours possible d'ajouter un outil d'édition en CMS Headless du genre [Netlify CMS](https://www.netlifycms.org/).

## Références

- [Static Site Generators | Jamstack](https://jamstack.org/generators/)
- [Headless CMS | Jamstack](https://jamstack.org/headless-cms/)
