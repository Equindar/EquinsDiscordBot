import { MessageAnalyzer } from "../../types/MessageAnalyzer";

const keywords: string[] = ["hilfe", "admin", "server", "offline"];

export const keywordAnalyzer: MessageAnalyzer = {
    name: "keywordAnalyzer",
    analyze(message) {
        keywords.forEach(item => {

            if (message.content.toLowerCase().includes(item)) {
                console.log(
                    `Keyword '${item}' erkannt in Guild "${message.guild?.name}" (${message.guildId}) von User ${message.author.tag}`
                );
            }
        });
    },
};
