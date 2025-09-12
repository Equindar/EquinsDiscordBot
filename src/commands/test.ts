import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command";
import { isGuild } from "../utils/isGuild";

const { EGS } = process.env;

// Beispiel: nur in Guild mit ID "123456789" oder Name "MeinServer"
let testCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Nur in ausführbar"),
    async execute(interaction) {
        await interaction.reply("✅ Richtig! Dieser Command darf hier ausgeführt werden.");
    },
};

testCommand = isGuild(EGS!)(testCommand);
// oder: testCommand = isGuild("MeinServer")(testCommand);

export default testCommand;
