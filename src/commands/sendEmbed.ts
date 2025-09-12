import { EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js';
import { Command } from '../types/Command';
import { isServerOwner } from '../utils/isServerOwner';

let command: Command = {
    data: new SlashCommandBuilder()
        .setName("blabla")
        .setDescription('Sendet ein Embed (nur Server-Owner)'),
    async execute(interaction) {
        const channel = (await interaction.client.channels.fetch(
            process.env.STATUS_CHANNEL_ID!
        )) as TextChannel;

        await channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Server Status')
                    .addFields({ name: 'Status', value: 'undefined', inline: true })
                    .setTimestamp()
            ],
        });
    },
};

// Mit Decorator wrappen
command = isServerOwner(command);

export default command;
