import { Client, Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { Command } from "../types/Command";

export async function loadCommands(client: Client) {
    const commandsPath = path.join(__dirname, "..", "commands");
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

    const commands: Command[] = [];
    client.commands = new Collection();

    console.log("Slash Commands werden geladen...");
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = (await import(filePath)).default;

        client.commands.set(command.data.name, command);
        commands.push(command);
        console.log(`Command geladen: ${command.data.name}`);
    }

    // Registriere die Commands bei Discord (global oder für eine Guild)
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

    try {
        console.log("Slash Commands werden registriert...");

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), // Global
            { body: commands.map(cmd => cmd.data.toJSON()) },
        );

        console.log("Slash Commands erfolgreich registriert!");
    } catch (error) {
        console.error(error);
    }
}
