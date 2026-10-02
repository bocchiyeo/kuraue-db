# KuraueDB (kuraue-db)

Yama no Susume DB for mountains the characters climbed

Mountain profiles document identifiable climbs from anime seasons 1–4. OVA
locations are not included unless an actual climb is depicted. Episode numbers
and links to episode or route references are included with each profile.

Each mountain's metadata and article live together in one Markdown file under
`src/data/mountains/`. Add or update a profile there; its JSON-formatted
front matter supplies the card and quick-fact fields, and the Markdown body
supplies the detail-page article. Peak photos from Wikimedia Commons include
a `photoSource` link to the file page for attribution and license details;
unsourced fallback images are identified as illustrative. The detail page links
to official anime episode material instead of embedding screenshots. The app
loads these files through `src/data/mountains/index.js`, so there is no separate
mountain metadata list.

## Requirements

- Node.js (one of the versions listed in `package.json`)
- npm

This is a JavaScript/Vue project. Its dependencies are declared in
`package.json` and locked in `package-lock.json`; it does not use a Python
`requirements.txt`.

## Dependencies

- Runtime: Vue, Vue Router, Quasar, and Quasar Extras
- Development: Quasar's Vite app tooling, ESLint, Prettier, PostCSS, and their
  supporting plugins

## Install and run

Install the locked dependencies:

```bash
npm ci
```

Start the app in development mode:

```bash
npm run dev
```

Other available commands:

```bash
npm run lint
npm run format
npm run build
```

For Quasar configuration details, see
[Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
