import event from "@/events/messageCreate";
import { mockMessage } from "test/mocks/mockMessage";
import { Message } from "discord.js";
import { logger } from "@/utils/logger";

// Logger mocken, damit keine echten Logs geschrieben werden
jest.mock("@/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

describe("messageCreate Event", () => {
  it("should log share ID from message", async () => {
    const message = mockMessage("Hier der Link: https://test.com/share/abc123");

    await event.execute(message);

    expect(logger.debug).toContain("abc123");
  });

  it("should ignore bot messages", async () => {
    const mockMessage = {
      author: { bot: true },
      content: "/share/xyz",
    } as unknown as Message;

    await event.execute(mockMessage);

    expect(logger.info).not.toHaveBeenCalled();
  });
});
