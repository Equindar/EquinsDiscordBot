import { Message } from "discord.js";

type PartialMessage = Partial<Omit<Message, "author">> & {
    author: { bot: boolean; id?: string; username?: string };
    content: string;
};

export function mockMessage(
    content: string,
    options: { bot?: boolean; authorId?: string; username?: string } = {}
): PartialMessage {
    return {
        content,
        author: {
            bot: options.bot ?? false,
            id: options.authorId ?? "123456",
            username: options.username ?? "TestUser",
        },
        reply: jest.fn(),
        channel: {
            send: jest.fn(),
        },
    } as unknown as Message;
}
