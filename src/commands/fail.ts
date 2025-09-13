import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command';
import { errorHandler } from '../index';

const command: Command = {
  data: new SlashCommandBuilder().setName('fail').setDescription('Simuliert einen Fehler'),

  async execute(interaction) {
    try {
      throw new Error('Testfehler 🚨');
    } catch (err) {
      await errorHandler.handle(err, this.data.name);
      await interaction.reply({ content: 'Es ist ein Fehler aufgetreten!', ephemeral: true });
    }
  },
};

export default command;
