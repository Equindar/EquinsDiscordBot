import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { Event } from "../types/Event";

export async function loadEvents(client: Client) {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    try {
        console.log("Events werden geladen...");
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event: Event<any> = (await import(filePath)).default;

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            console.log(`Event geladen: ${event.name} (Quelle: ${file.toString()})`);
        }
        console.log("Events erfolgreich geladen!");
    } catch (error) {
        console.error(error);
    }

}
