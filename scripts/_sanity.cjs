/**
 * Gemeinsame Basis für alle Seed-/Cleanup-Skripte: Env lesen, Guards, Client,
 * Bild-Upload. Vorher stand das (inkl. uploadImage) in jedem Skript nochmal.
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN
 * (sanity.io/manage -> API -> Tokens -> "Editor").
 *
 * Nutzung:  const { client, uploadImage, PUBLIC, projectId, dataset } = require('./_sanity.cjs')('npm run seed');
 */
const path = require('path');
const fs = require('fs');
const { createClient } = require('@sanity/client');

const PUBLIC = path.join(__dirname, '..', 'public');

/** @param startCmd Aufrufbefehl, erscheint in der Fehlermeldung wenn die Env fehlt. */
module.exports = function sanity(startCmd = 'node --env-file=.env.local <skript>') {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    console.error(`FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Mit --env-file=.env.local starten (${startCmd}).`);
    process.exit(1);
  }
  if (!token) {
    console.error('FEHLER: SANITY_API_WRITE_TOKEN fehlt in .env.local. Token in sanity.io/manage -> API -> Tokens (Editor) anlegen.');
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  /** Lädt public/<relPath> hoch und gibt das fertige image-Feld zurück. */
  async function uploadImage(relPath) {
    const abs = path.join(PUBLIC, relPath);
    const stream = fs.createReadStream(abs);
    const asset = await client.assets.upload('image', stream, { filename: path.basename(abs) });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  }

  return { client, uploadImage, PUBLIC, projectId, dataset };
};
