export * from "@shadcn/helpers/ai-sdk";
export function getMessageText(message) {
    return message.parts.reduce((text, part) => (part.type === "text" ? text + part.text : text), "");
}
