# Luz y Amor — Cafetería

Sitio estático de Luz y Amor, una cafetería costarricense. Página única en HTML, CSS y
JavaScript sin dependencias ni paso de build: se edita directo y se publica tal cual.

## Estructura
```
├── index.html      # toda la página: markup, estilos y comportamiento
├── favicon.svg      # ícono del sitio
├── images/          # fotografías
└── .nojekyll        # evita que GitHub Pages procese la carpeta con Jekyll
```

## Editar el menú
Los productos viven directo en `index.html`, dentro de las constantes `menu` y
`secretMenu` en la etiqueta `<script>` al final del archivo. Cada uno es
`{name, desc, price}` — edita, agrega o quita líneas ahí.

## Publicar con GitHub Pages
1. Sube estos archivos al repositorio (reemplazando todo lo anterior).
2. Settings → Pages → Source: rama `main`, carpeta `/(root)`.
3. El sitio queda en `https://<tu-usuario>.github.io/<nombre-repo>/`.
