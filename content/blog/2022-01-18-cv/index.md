---
title: "Pourquoi choisir JSON Resume pour maintenir son CV"
slug: pourquoi-choisir-json-resume-pour-maintenir-son-curriculum-vitae
description: "Maintenir régulièrement à jour son curriculum vitæ dans un secteur d’activité où l’on est (trop ?) souvent amené à changer d’employeurs ou de clients, c’est faire preuve de prévoyance. Mais s’imaginer que ses projets publics sur Github ou son profil LinkedIn suffisent, c’est sans doute un manque de clairvoyance. Une meilleure stratégie pour conserver les traces de son parcours professionnel consiste à investir sur un format dédié et interopérable : le JSON Resume."
date: 2022-01-31
draft: false
in_search_index: true
tags:
- métier
---

## Pourquoi ne pas miser sur ses profils publics

Et bien parce qu’ils sont rarement faits pour cela.

Github est un outil merveilleux permettant d’échanger en ligne avec d’autres développeurs.euses sur une base de code versionnée grâce à un système de gestion de version décentralisé : Git. C’est pour cela que cet outil a été conçu et il le fait très bien. 
Mais les dépôts que vous pourrez laisser publics sur votre profil sont dans peu cas des projets clients. Ces derniers seront certainement privé. En général, les dépôts publics illustreront des POC, des bacs à sable, des forks d'outils open sources… Bref, des choses qui ne caractériseront probablement pas votre réelle expérience professionnelle. Ces projets ouverts seront très utiles pour appuyer des compétences mises en avant sur votre CV, mais encore une fois n’illustreront pas votre vrai parcours.

{{< quoteright "Curriculum vitae, en latin, est une expression signifiant « déroulement de la vie »" >}}

Enfin ce que l'on trouvera sur Github ne sera de toute façon que du code, alors que notre métier ne s'arrête pas à notre capacité à produire du code. Et heureusement, car si notre communauté s'entête à éduquer une IA comme Copilot, et bien nous ne servirions rapidement plus à grand chose.

On pourrait alors se dire que des sites comme LinkedIn restent eux de bons candidats. Et effectivement, un profil LinkedIn bien maintenu rendra compte de votre parcours professionnel, et des éventuels contacts que vous vous y seriez faits. Peut-être. Mais il est possible qu’un moment donné vous ayez très fortement l’impression que le réel objectif de LinkedIn n’est en somme pas de vous aider à perdurer votre CV, mais plutôt d’alimenter une base de données monnayée aux recruteurs. Je ne dis pas que j’ai raison - je ne suis pas contre le fait d’avoir tort - mais si cette impression vous devient un jour insupportable et que vous décidiez de dire « basta, finalement tout cela ne m’apporte que plus de distractions voir de dérangements que d’avantages », vous pourriez claquer la porte. Et donc perdre ce CV sur lequel vous aviez investi du temps.

## Le format JSON Resume

Vous l’aurez compris, je trouve que c’est une meilleure idée de garder son CV indépendant de toute plateforme. Et je vais appliquer les mêmes critères de sélection que pour mes articles de blog pour choisir un format, c’est-à-dire avoir un contenu interopérable (dans le cas du CV, le contenu devra donc être à minima exportable en PDF et HTML) mais aussi autonome de tout outil sophistiqué de stockage (genre base de données).

{{< quoteright "JSON Resume is a community driven open source initiative to create JSON-based standard for resumes." >}}

Et pour cela, l’utilisation d’un simple fichier texte sans balisage complexe est une très bonne option.
Et le format `Markdown` est un bon candidat, simple et efficace ! Mais c'est un balisage de mise en forme graphique. Pour gérer un CV, cela peut-être interressant d'avoir un balisage un peu plus sémantique, comme le format [JSON Resume](https://jsonresume.org/).

### Ecrire son CV
 
La valeur de ce format va être d’identifier et de qualifier dans le contenu plusieurs catégories propres à un CV : biographie, expériences professionnelles, formations, compétences, centres d’intérêt…

Par exemple, voici à quoi ressemble la partie expériences professionnelles :

```json
{
  "work": [{
    "name": "Company",
    "position": "Developer",
    "url": "https://company.com",
    "startDate": "2013-01-01",
    "endDate": "2014-01-01",
    "summary": "Description…",
    "highlights": [
      "A good job"
    ]
  }],
}
```

La [communauté](https://jsonresume.org/team/) derrière JSON Resume, le projet est en open source sous licence MIT, maintient une [`cli`](https://github.com/jsonresume/resume-cli) qui facilite bien la gestion de son CV, à commencer par la création d’un fichier JSON illustré (`$ resume init`) à partir duquel il est facile de mettre en place une première version.

Et si cela vous rebute d’éditer directement ce fichier JSON (vraiment ?), il existe des interfaces graphiques complètes, comme [Profile Studio](https://profilestudio.co).

Ensuite, la `cli` va permettre de valider le fichier en s’appuyant sur un [schéma de validation](https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json) au format [JSON Schema](https://json-schema.org/) (un format quasiment identique à celui d’[Open API](/blog/openapi-un-contrat-pour-vos-apis/)). Du coup, cette validation n’est pas réservée à la `cli` du projet, même si elle le fait bien.

### Exporter son CV

L'étape suivante va consister à publier ce CV. Et la `cli` va permettre de le faire très facilement, aussi bien au format PDF que HTML, en s'appuyant sur des [thèmes](https://jsonresume.org/themes/) dont certain ont un rendu bien plus propre que bien des CV que j'ai eu l'occasion de lire ...

{{< img src="templateStackOverflow.jpg" alt="Un JSON Resume exporté depuis la cli avec un template Stackoverflow" >}}

Mais encore une fois, la `cli` n'est pas obligatoire. Tout d'abord, il existe d'autres projets capables d'importer un fichier JSON Resume pour le rendre disponible en ligne, comme [jsonresume.io](https://jsonresume.io/) ou [Reactive Resume](https://rxresu.me/). Le site du projet maintient d'ailleurs [une liste plus complète](https://jsonresume.org/projects/).

*(Au passage, si vous n'avez pas déjà claqué la porte, vous trouverez des outils permettant d'importer son CV depuis LinkedIn. Mais vous l'aurez compris, je n'ai pas eu l'occasion de les tester ...)*

Ensuite, vous pourrez écrire votre propre parser/convertisseur, ou plus simplement utiliser un autre outil dont j'ai déjà parlé : [Hugo](/blog/pourquoi-choisir-hugo-comme-generateur-de-site-statique/).

### Publier son CV avec Hugo

L'utilisation basique d'Hugo consiste à aller chercher des contenus en HTML ou en Markdown au sein du répertoire `/content` et de leur appliquer des templates pour générer un contenu HTML final.

Et bien, Hugo est aussi capable d'aller chercher [des données](https://gohugo.io/templates/data-templates/#readout) aux formats YAML, JSON, XML ou TOML dans le répertoire `/data`, et de leur appliquer le même traitement. Et donc d'aller charger votre CV au format JSON Resume et de lui appliquer un template d'affichage.

Pour cela, il existe [un module Hugo](https://github.com/schnerring/hugo-mod-json-resume) déjà prêt, mais on peut s'en sortir soit même très facilement.

```html
// in layouts/curriculum-vitae/curriculum-vitae.html
{{ define "main" }}
<div class="post">
    <header class="post-header">
        <h1 class="post-title">Curriculum vitæ</h1>
    </header>
    <div class="post-content">
      {{ partial "json-resume/work.html" . }}
      {{ partial "json-resume/education.html" . }}
      {{ partial "json-resume/volunteer.html" . }}
    </div>
</div>
{{ end }}
```

```html
// in layouts/partials/json-resume/work.html
{{ $cv := index $.Site.Data.curriculum_vitae $.Site.Language.Lang }}
{{ with $cv.work }}
  <section id="experience">
  <h2 class="section-title">Experiences professionnelles</h2>
    {{ range . }}
      <article class="job" itemscope itemtype="http://schema.org/Job">
        <h3 itemprop="name">{{ .position }}</h3>
        <span itemprop="location" itemscope itemtype="http://schema.org/Place">
            {{ if .website }}
              <a itemprop="url" href="{{ .website }}"><span itemprop="name">{{.company}}</span></a>
            {{ else }}
              <span itemprop="name">{{.company}}</span>
            {{ end }}
            {{ if .description }}
              <span> - {{ .description }}</span>
            {{ end }}
            {{ if .location }}
              <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"> -
                <span itemprop="addressLocality"> {{ .location }}</span>
              </span>
            {{ end }}
        </span>
        <br />
        {{ partial "json-resume/duration.html" (dict "context" . "site" $.Site) }}
        {{ with .summary }}
          <p itemprop="description">{{ . }}</p>
        {{ end }}
        {{ with .highlights }}
          <h4>Faits marquants</h4>
          <ul class="highlight-list">
            {{ range . }}
              <li>{{ . }}</li>
            {{ end }}
          </ul>
        {{ end }}
      </article>
    {{ end }}
  </section>
{{ end }}
```

Vous pouvez voir le résultat final sur ... [la page de mon curriculum vitæ](/curriculum-vitae/)

### Ouvrir le CV au Web des données

Si le format JSON Resume apporte des indications sémantiques sur le contenu d'un CV, il n'est malheureusement pas compatible en l'état avec le monde des [linked data](https://en.wikipedia.org/wiki/Linked_data). 

Il n'existe par exemple pas de définition d'un curriculum vitæ (resume) sur [schema.org](https://schema.org/), et dans la mesure de mon ignorance, pas de contexte permettant de générer un fichier [JSON-LD](https://json-ld.org/) à partir du formatage en JSON Resume. 

Une piste consiste alors à faire le mapping de certaines entités sur des entités existantes sur schema.org. Le projet [resumeToJSONLD](https://github.com/bollwyvl/resumeToJSONLD) est sans doute capable d'automatiser cela, mais du fait de son âge, je n'ai pas pris le temps de le tester (il nécessite un node 8 et m'obligeait donc à lancer le projet dans un Docker. Je n'ai pas encore pris le temps de le faire).

Une autre solution consiste à réaliser ce mapping directement dans le HTML via des [Microdata](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata). Pour les plus attentifs, c'est ce que j'ai fait dans mes templates Hugo (`<article class="job" itemscope itemtype="http://schema.org/Job">`).

Mais c'est un sujet intéressant à creuser, car ce serait un vrai plus de pouvoir rendre son CV compatible avec un [Pod Solid](https://inrupt.com/solid).

*Note : je ne suis évidemment pas le seul à m'être fait cette réflexion. Il existe par exemple le projet [JSON-LD Resume](https://jsonldresume.org/), mais il semble être au point mort pour le moment.*

## Conclusion

J’ai bien conscience de faire un brin mon malin en déconseillant de miser sur Github comme référence de son parcours professionnel. Lorsque l’on débute, il y a fort à parier que l’on ait plus de choses à y montrer que dans un CV sans expérience. Mais cela n’empêche pas de prendre les devants et justement de montrer dans ces premiers projets votre CV, même un peu vide, écrit en JSON Resume et automatiquement publié sur … une Github Page.

## Références

- [Why GitHub is not your CV](https://blog.jcoglan.com/2013/11/15/why-github-is-not-your-cv/?utm_source=pocket_mylist)
- [The Ethics of Unpaid Labor and the OSS Community](https://www.ashedryden.com/blog/the-ethics-of-unpaid-labor-and-the-oss-community)
- [Europass Interoperability](https://europa.eu/europass/en/europass-interoperability)
- [JSON Resume](https://jsonresume.org/)
- [Jsonld Resume](https://jsonldresume.org/)
