# Entrenaitor · App de clientes

App instalable (PWA) para que los clientes de Entrenaitor vean su rutina y apunten sus series.
Los datos viven en Google Sheets; esta web solo es la "cara" de la app y habla con Google Apps Script.

- `index.html`: la app
- `manifest.webmanifest` + `icons/`: lo que permite instalarla en el móvil
- `sw.js`: hace que abra rápido y funcione aunque la cobertura sea mala
