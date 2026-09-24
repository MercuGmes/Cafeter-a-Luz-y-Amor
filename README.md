<div align="center">
  <img src="./.github/readme-coffee.svg" alt="Ilustración animada de una taza de café de Luz y Amor" width="920" />

  <h1>Luz y Amor</h1>
  <p><strong>Una mesa para volver a ti.</strong></p>
  <p>Cafetería costarricense · café de aquí · calidez para todos</p>

  <p>
    <a href="#el-recorrido">El recorrido</a> ·
    <a href="#ponerlo-a-correr">Ponerlo a correr</a> ·
    <a href="#publicar-en-github-pages">Publicar</a>
  </p>
</div>

<br />

> Hay lugares que no se visitan: se vuelven parte de la rutina bonita.

Luz y Amor es una landing page estática construida para sentirse como abrir el cuaderno de una cafetería: fotografías cálidas, tipografía editorial, pequeños apuntes al margen y una navegación que acompaña sin interrumpir.

No es una plantilla de cafetería. Es una página hecha alrededor de una idea sencilla: que una taza también puede ser una forma de volver a casa.

## El recorrido

| Capítulo | Qué sucede |
| --- | --- |
| **01 · La casa** | La historia de Luz y Amor, su ritmo y su manera de recibir. |
| **02 · La carta** | Menú filtrable por cafés, bebidas, repostería, sándwiches y extras. |
| **03 · La confidencia** | Un menú secreto que aparece solo cuando el visitante decide preguntar. |
| **04 · La mesa** | Galería fotográfica con lightbox y navegación por teclado. |
| **05 · Ven a vernos** | Horario, Instagram, WhatsApp y ubicación. |

### Detalles que hacen la diferencia

- Navegación lateral tipo índice en escritorio.
- Menú móvil de pantalla completa y controles táctiles.
- Revelado progresivo al hacer scroll.
- Transiciones suaves con soporte para `prefers-reduced-motion`.
- Galería con zoom y cierre mediante `Escape`.
- WhatsApp con mensaje prellenado.
- Enlaces directos a Instagram y Google Maps.
- Diseño responsive pensado desde móvil, no solo reducido desde escritorio.

## Verlo

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./screenshots/luz-y-amor-redesign-desktop.jpg" alt="Luz y Amor en escritorio" width="640" />
        <br />
        <sub>Escritorio · la casa completa</sub>
      </td>
      <td align="center">
        <img src="./screenshots/luz-y-amor-redesign-mobile.jpg" alt="Luz y Amor en móvil" width="220" />
        <br />
        <sub>Móvil · una pausa en la mano</sub>
      </td>
    </tr>
  </table>
</div>

## Ponerlo a correr

El sitio vive dentro del monorepo, en `artifacts/luz-y-amor`.

```bash
pnpm install
pnpm --filter @workspace/luz-y-amor run dev
```

Para comprobar que está listo para producción:

```bash
pnpm --filter @workspace/luz-y-amor run typecheck
pnpm --filter @workspace/luz-y-amor run build
```

## Publicar en GitHub Pages

La carpeta [`Subir`](./Subir) es el export estático listo para publicar. Contiene solo:

```text
Subir/
├── index.html
├── .nojekyll
├── favicon.svg
├── assets/
└── images/
```

Las rutas están generadas de forma relativa para que el sitio funcione tanto en el dominio principal como dentro de una subruta de GitHub Pages.

### Opción manual

1. Sube el contenido interno de `Subir/` a la rama o carpeta que uses para GitHub Pages.
2. En GitHub, abre **Settings → Pages**.
3. Selecciona la rama y la carpeta de publicación.
4. Guarda y espera a que GitHub publique el sitio.

No hace falta subir `node_modules`, `src`, archivos de configuración ni el resto del entorno de desarrollo.

## Tecnologías

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/CSS-20382F?style=flat-square&logo=css3&logoColor=white" alt="CSS" />
</p>

- **React + TypeScript** para la interfaz y el estado de las interacciones.
- **Vite** para desarrollo rápido y build estático.
- **CSS escrito para la experiencia**, sin una plantilla visual prefabricada.
- **Lucide React** para iconos ligeros y consistentes.
- **GitHub Pages** como destino de publicación.

## Estructura del proyecto

```text
.
├── artifacts/
│   └── luz-y-amor/
│       ├── public/
│       │   └── images/
│       └── src/
│           ├── App.tsx
│           ├── index.css
│           └── main.tsx
├── screenshots/
├── Subir/                 # export estático para GitHub Pages
└── README.md
```

## Sin backend. A propósito.

La página no necesita servidor, base de datos ni API de contenido. El menú, la galería y el menú secreto forman parte del sitio compilado; los únicos saltos externos son los enlaces de contacto y redes.

Eso mantiene la experiencia rápida, fácil de publicar y sencilla de entregar.

<div align="center">
  <br />
  <sub>Hecho con café, intención y un poco de luz.</sub>
</div>