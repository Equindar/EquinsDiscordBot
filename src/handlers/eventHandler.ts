import { Client } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { Event } from '../types/Event';

function getEventFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // 🔁 Rekursiver Aufruf für Unterordner
      files.push(...getEventFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = getEventFiles(eventsPath);

  try {
    console.log('Events werden geladen...');
    for (const filePath of eventFiles) {
      const event: Event<any> = (await import(filePath)).default;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }

      console.log(`Event geladen: ${event.name} (Quelle: ${path.relative(eventsPath, filePath)})`);
    }
    console.log('Events erfolgreich geladen.');
  } catch (error) {
    console.error(error);
  }
}
