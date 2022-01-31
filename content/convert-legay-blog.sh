for f in `find . -iname '*.mdx' -type f -print`;do mv "$f" ${f%.mdx}.md; done

for folderpath in `ls -d ./blog/*/`; do
    folder=$(echo $folderpath | cut -c 8-)
    postdate=$(echo $folder | cut -c -10)
    slug=$(echo $folder | cut -c 12- | head --bytes -2)
    formatedate="$(date -d $postdate +%Y-%m-%dT%H:%M:%S%:z)"
    urldate="$(date -d $postdate +%Y/%m/%d)"
    frontmatter="slug: ${slug}\ndate: ${formatedate}\nurl: /blog/${urldate}/${slug}.html"
    sed -i '3i\'"$frontmatter" ${folderpath}index.md
    sed -i 's|\!\[\(.*\)\](\(.*\))|\{\{<figure src="\2" alt="\1" >\}\}|g' ${folderpath}/index.md
done

[sociétaire](https://fr.wikipedia.org/wiki/Soci%C3%A9t%C3%A9_coop%C3%A9rative_et_participative#Soci.C3.A9tariat)
