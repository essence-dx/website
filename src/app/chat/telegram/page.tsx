import { Icons } from "@dx/ui/icons";
import { ChatPlatformPage } from "@/components/chat-platform-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
    title: "DX for Telegram",
  description:
    "Manage your DX tools from Telegram. Monitor builds, check agent status, and get notifications — all from the messaging app you already use.",
  path: "/chat/telegram",
  og: {
  title: "DX for Telegram",
    description: "Your DX tools, right in Telegram",
  },
  keywords: [
    "Telegram dev tools",
    "Telegram development alerts",
    "Telegram build notifications",
    "Telegram project bot",
    "Telegram dev updates",
    "DX Telegram",
  ],
});

const config = {
  name: "Telegram",
  slug: "telegram",
  appId: "telegram",
  icon: <Icons.Telegram size={40} className="h-10 w-10" />,
  description:
    "Connect DX to Telegram and manage your toolchain without leaving your conversations. Check build status, monitor agents, and run commands — DX handles it all through natural conversation.",
  steps: [
    {
      title: "Connect to DX",
      description:
        "Visit our GitHub repository to get started with DX tools and Telegram integration.",
      href: "https://github.com/essence-dx",
    },
    {
      title: "Connect Telegram",
      description:
        "Click the link to open a chat with the DX bot, then send the connection code to link your account.",
    },
    {
      title: "Start chatting",
      description:
        'Send your first message — try asking "What is the build status?" or "Run a deploy check"',
    },
  ],
  notifications: [
    "Build status updates from DX Build",
    "Agent task completions and status changes",
    "Deployment notifications from DX www",
    "Workflow progress from DX Flow",
  ],
  capabilities: [
    "Run build commands and check compilation status",
    "Monitor and manage DX Agent tasks",
    "Deploy and check DX www sites through conversation",
    "Ask questions about your toolchain in plain language",
    "Get real-time notifications for builds, deploys, and workflows",
  ],
  settingsPath: "DX \u2192 Telegram \u2192 Settings",
};

export default function Page() {
  return <ChatPlatformPage config={config} />;
}
