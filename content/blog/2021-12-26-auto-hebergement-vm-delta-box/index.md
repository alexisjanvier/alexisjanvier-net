---
title: "Auto-hébergement avec une machine virtuelle Freebox"
description: "Plutôt que d'avoir à alimenter un serveur dédié, pourquoi ne pas utiliser directement ma box - qui devra  être allumée quoi qu'il se passe - pour faire mon auto-hébergement web ?"
date: 2021-12-27
draft: false
in_search_index: true
tags:
- self-hosting
---

J'aime le principe de [l'auto-hébergement](https://framacloud.org/fr/auto-hebergement/intro.html). Ce n'est pas le sujet de ce post. Ce n'est pas non plus la solution à tous nos problèmes (contrôle de ses données, centralisation du web, tracking, ...). Le principe de mutualisation est tout aussi important. Mais pour faire court, j'ai envie de faire vivre à mon échelle cette idée que les contenus - ou tout au moins une partie - disponibles sur le web devraient provenir des personnes/ordinateurs constituant le réseau. D'ailleurs, c'est l'occasion de faire une première remarque : dans cet article, je parlerais d'auto-hébergement web, pas de services du type serveur d'email, partage de fichiers ou d'agenda.

{{< img src="30-ans-du-web-02.jpg" alt="Document de travail 'Propositions pour mieux gérer l’information' de Tim Berners-Lee" >}}

{{< quoteright "Dans ce post, je parlerais d'auto-hébergement web, pas de services du type serveur d'email, partage de fichiers ou d'agenda." >}}

La première brique pour faire du partage de contenu web à la maison est d'avoir une IP fixe. C'est la raison pour laquelle j'ai choisi Free comme FAI. Ensuite, il faut trouver un serveur physique. Il n'a pas besoin d'être très puissant, car il ne s'agit pas d'héberger un service compliqué, mais principalement de servir des contenus statiques ([The small web is beautiful](https://benhoyt.com/writings/the-small-web-is-beautiful)). Le premier réflexe est de recycler un vieux PC, ou encore mieux, un de ces (trop - *mea-culpa*) "vieux" Raspberry Pi 2 ou 3 alourdissant ma dette "matériel électronique" dans le fond d'un tiroir. Mais finalement, plutôt que d'alimenter un appareil supplémentaire aussi peu énergivore soit-il, pourquoi ne pas utiliser le matériel qui devra quoiqu'il se passe rester allumé : la box. En effet, mon modem/routeur contestable (voir [Pour la liberté de choisir sa connexion à Internet – La Quadrature du Net](https://www.laquadrature.net/2021/09/27/pour-la-liberte-de-choisir-sa-connexion-a-internet/)) fourni par Free est une box [Delta](https://www.free.fr/freebox/freebox-delta/). Il est plus puissant qu'un Raspberry et offre nativement une gestion de machines virtuelles.

## L'installation de la VM

Je ne vais pas faire ici un tuto sur la procédure, elle est déjà suffisamment documentée sur le web, comme par exemple sur cet article : ["Tutoriel Freebox Delta : comment installer une machine virtuelle"](https://www.universfreebox.com/article/52276/Tutoriel-Freebox-Delta-comment-installer-une-machine-virtuelle).

Pour ma part, j'ai installé l'image `Ubuntu 20.04`. Ne restait plus qu'à y installer le serveur Nginx (`sudo apt update` puis `sudo apt install nginx`) pour avoir un serveur web fonctionnel.

Ensuite, après avoir attribué un bail dhcp à cette vm afin de s'assurer que son IP au sein de mon réseau soit fixe, j'ai activé le firewall [ufw](https://doc.ubuntu-fr.org/ufw):

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable
```

Dernière chose à faire avant de se lancer dans la configuration du serveur : installer [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) pour générer les certificats https. Et j'avoue avoir utiliser l'installation standard Ubuntu en passant par `snap`. Mais je n’aime pas trop bien ça utiliser snap ...

Ultime petit test : relancer la Freebox pour vérifier que la VM redémarrera aussi automatiquement (je n'avais pas vu d'option de configuration particulière sur le sujet). Bonne nouvelle, c'est bien le cas !

## Configuration des domaines et sous-domaines

Ayant plusieurs sites statiques à héberger et plusieurs redirections à faire vers des services tournant sur d'autres serveurs (et oui, je mutualise un peu mon auto-hébergement), j'ai dans un premier temps configuré tous les domaines et sous-domaines comme de simples sites statiques sur le modèle :

```nginx
server {
    root /var/www/domaine/;
    index index.html;
    server_name domain;

    access_log /var/log/nginx/domain_access.log;
    error_log /var/log/nginx/domain_error.log;

    listen 80;
    listen [::]:80;
}

server {
    if ($host = www.domaine) {
        return 301 http://domaine;
    }
    server_name www.domaine;
    listen 80;
    listen [::]:80;
    return 404;
}
```

{{< quoteright "Pensez à bien faire pointer le root à l'intérieur de `/var/www` afin d'éviter les problèmes de droits et donc de 403 avec Nginx ..." >}}

Chaque domaine possède donc sa configuration `domaine` dans le répertoire `/etc/nginx/site-available`. Après avoir créé un lien symbolique des fichiers de configuration dans le répertoire `/etc/nginx/site-enable` :

```bash
ln -s /etc/nginx/sites-available/domaine /etc/nginx/sites-enabled/
```

Il reste à valider les configurations `sudo nginx -t` et si tout est bon, à relancer Nginx avec `sudo service nginx restart`.

Je conseille de faire un premier test sur le serveur par défaut en y accédant par l'IP privée de la VM `http://192.168.1.?`. Et si le serveur répond bien, il faut maintenant configurer la Freebox pour rediriger les appels en `http` et `https` vers la VM.

{{< img src="Freebox-redirection.jpg" alt="Redirection des ports vers le VM Freebox" >}}

{{< quoteright "Attention, Certbot n'active pas le http2  par défaut." >}}

Maintenant, si tous les domaines configurés sont accessibles en `http`, il ne vous reste plus qu'à générer et configurer tous les certificats SSL, et tout cela en une simple commande (merci Let's encrypt et Certbot) :

```bash
sudo certbot --nginx
```

Si vous voulez faire activer le `http2`, il faut changer à la main les configurations des serveurs Nginx en remplaçant

```bash
listen 443 ssl; 
listen [::]:443 ssl;
```

par

```bash
listen 443 ssl http2;
listen [::]:443 ssl http2;
```

## Configuration des hébergements statiques

Afin d'améliorer les hébergements statiques, il faut rajouter un peu de configuration Ngninx (compression, cache, sécurité ... ). Par exemple :

```nginx
server {
    ...

    # Compression
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6; # 1 par défaut (le plus bas), 9 étant le plus élevé
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256; # taille minimale du fichier à compresser
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/rss+xml text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/jpeg image/png image/svg+xml image/x-icon;

    # Security headers
    add_header X-XSS-Protection          "1; mode=block" always;
    add_header X-Content-Type-Options    "nosniff" always;
    add_header X-Frame-Options           "deny" always;
    add_header Referrer-Policy           "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy   "default-src 'self' http: https: data: blob: 'unsafe-inline'; frame-ancestors 'self';" always;
    add_header Permissions-Policy        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Expire rules for static content
    location ~* \.(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid|midi|wav|bmp|rtf)$ {
        expires 365d;
        log_not_found off;
        access_log off;
    }

    ...
}
```

## Configuration des reverses proxy

Nginx offre de puissantes fonctionnalités de reverse-proxy. Voici un exemple de configuration :

```nginx
location / {
        proxy_pass         http://192.168.1.666:8080;
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;

        proxy_http_version                 1.1;
        proxy_cache_bypass                 $http_upgrade;
        proxy_headers_hash_max_size        512;
        proxy_headers_hash_bucket_size     64;

        # Proxy headers
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-Port  $server_port;

        # Proxy timeouts
        proxy_connect_timeout              60s;
        proxy_send_timeout                 60s;
        proxy_read_timeout                 60s;
    }
```

## Conclusion

Les exemples de configuration donnés dans ce post ne sont que des exemples. Pour s'aider à faire de "jolies" configurations Nginx adaptées à vos besoins, vous pouvez utiliser le [configurateur Nginx de DigitalOcean](https://www.digitalocean.com/community/tools/nginx).

Il n'en reste pas moins que l'utilisation d'une VM Freebox est satisfaisante et répond très bien à mes besoins. Et si vous lisez ces lignes, c'est grâce à une machine virtuelle tournant sur ma Freebox Delta.

## Bookmarks

- [L’auto-hébergement, pour qui ? pourquoi ? 89 personnes me répondent](https://serveur410.com/lauto-hebergement-pour-qui-pourquoi-89-personnes-me-repondent/)
- [Pour la liberté de choisir sa connexion à Internet – La Quadrature du Net](https://www.laquadrature.net/2021/09/27/pour-la-liberte-de-choisir-sa-connexion-a-internet/)
- [The small web is beautiful](https://benhoyt.com/writings/the-small-web-is-beautiful)
- [Tutoriel Freebox Delta : comment installer une machine virtuelle](https://www.universfreebox.com/article/52276/Tutoriel-Freebox-Delta-comment-installer-une-machine-virtuelle)
- [Certbot | Certbot](https://certbot.eff.org/)
- [Hardening your HTTP response headers](https://scotthelme.co.uk/hardening-your-http-response-headers)
- [Analyse your HTTP response headers](https://securityheaders.com/)
- [HTTP Headers - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [NGINXConfig | DigitalOcean](https://www.digitalocean.com/community/tools/nginx)
