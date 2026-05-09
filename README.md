# amal_sreena_wedding

Angular wedding website for Amal & Sreena.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open the app in your browser at `http://localhost:4200`

## Notes

- The site includes ceremony and reception details.
- Replace the placeholder Google Drive URL in `src/app/app.component.ts` with your actual upload folder link.

## Hosting

This project is configured to deploy to GitHub Pages on the `main` branch.

To build and preview locally:

```bash
npm run build:prod
npx http-server ./dist/amal-sreena-wedding -p 8080
```

Once deployed, the app should be available at:

`https://amalvijayan25.github.io/amal_sreena_wedding/`

