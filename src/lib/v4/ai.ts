import type { UIMessage } from "ai"

class ChatStub {
  private messages: { role: string; content: string }[] = [];
  private index = 0;

  user(content: string) {
    this.messages.push({ role: "user", content });
    return this;
  }

  assistant(content: string) {
    this.messages.push({ role: "assistant", content });
    return this;
  }

  sleep(_ms: number) {
    return this;
  }

  get(_index: number) {
    return this.messages.map((msg) => ({
      id: crypto.randomUUID(),
      role: msg.role,
      parts: [{ type: "text" as const, text: msg.content }],
    }));
  }

  transport(_opts?: { delayMs?: number }) {
    return undefined;
  }

  next(_messages: unknown[]) {
    const remaining = this.messages.slice(this.index);
    if (remaining.length === 0) return undefined;
    const next = remaining[0];
    this.index++;
    return {
      id: crypto.randomUUID(),
      role: next.role,
      parts: [{ type: "text" as const, text: next.content }],
    };
  }
}

export function createChat() {
  return new ChatStub();
}

export function getMessageText(message: Pick<UIMessage, "parts">) {
  return message.parts.reduce(
    (text, part) => (part.type === "text" ? text + part.text : text),
    "",
  );
}
