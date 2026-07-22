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
    let id = 0;
    return this.messages.map((msg) => ({
      id: `msg-${id++}`,
      role: msg.role,
      parts: [{ type: "text" as const, text: msg.content }],
    }));
  }

  transport(_opts?: { delayMs?: number }) {
    return undefined;
  }

  get messagesCount() {
    return this.messages.length;
  }

  next(_messages: unknown[]) {
    if (this.index >= this.messages.length) return undefined;
    const next = this.messages[this.index];
    return {
      id: `msg-${this.index}`,
      role: next.role,
      parts: [{ type: "text" as const, text: next.content }],
    };
  }

  advance() {
    if (this.index < this.messages.length) {
      this.index++;
    }
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
