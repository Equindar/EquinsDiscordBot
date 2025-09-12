import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command";
import { isServerOwner } from "../utils/isServerOwner";

let shutdownCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("shutdown")
        .setDescription("Stoppt den Bot (nur Server-Owner)"),
    async execute(interaction) {
        await interaction.reply("Bot wird heruntergefahren...");
        process.exit(0);
    },
};

// Mit Decorator wrappen
shutdownCommand = isServerOwner(shutdownCommand);

export default shutdownCommand;
