import { Icons } from "@dx/ui/icons";
import { ChatPlatformPage } from "@/components/chat-platform-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
    title: "DX for iMessage",
  description:
    "Manage your DX tools from iMessage. Monitor builds, check agent status, and get notifications — all from your favorite messaging app.",
  path: "/chat/imessage",
  og: {
  title: "DX for iMessage",
    description: "Your DX tools, right in Messages",
  },
  keywords: [
    "iMessage dev tools",
    "iMessage development alerts",
    "iMessage build notifications",
    "iMessage project management",
    "DX iMessage",
    "dev chat iMessage",
    "Sendblue",
  ],
});

const config = {
  name: "iMessage",
  slug: "imessage",
  appId: "sendblue",
  icon: <Icons.IMessage size={40} className="h-10 w-10" />,
  description:
    "Connect DX to iMessage and manage your toolchain without leaving your conversations. Check build status, monitor agents, and run commands — DX handles it all through natural conversation.",
  steps: [
    {
      title: "Connect to DX",
      description:
        "Visit our GitHub repository to get started with DX tools and iMessage integration.",
      href: "https://github.com/essence-dx",
    },
    {
      title: "Connect iMessage",
      description:
        "Follow the setup flow to link your phone number. You'll receive a connection code to send from your device.",
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
  settingsPath: "DX \u2192 iMessage \u2192 Settings",
};

export default function Page() {
  return <ChatPlatformPage config={config} />;
}
