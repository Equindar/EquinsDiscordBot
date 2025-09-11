import { Events, ChatInputCommandInteraction } from 'discord.js';
import { Event } from '../types/Event';
import { Command } from '../types/Command';

const event: Event<typeof Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName) as Command | undefined;

    if (!command) {
      console.error(`Kein Command gefunden für: ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction as ChatInputCommandInteraction);
    } catch (error) {
      console.error(error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply('Beim Ausführen des Commands ist ein Fehler aufgetreten!');
      } else {
        await interaction.reply({ content: 'Fehler beim Command!', ephemeral: true });
      }
    }
  },
};

export default event;
