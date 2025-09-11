import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Antwortet mit Pong!"),

  async execute(interaction) {
    await interaction.reply("🏓 Pong!");
  },
};

export default command;
