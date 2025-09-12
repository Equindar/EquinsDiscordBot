import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command';
import { errorHandler } from '..';

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Antwortet mit Pong!'),

  async execute(interaction) {
    try {
      await interaction.reply('🏓 Pong!');
    } catch (error) {
      errorHandler.handle(error, 'Fehler im Ping-Command');
    }
  },
};

export default command;
