import { Icons } from "@dx/ui/icons";
import { ChatPlatformPage } from "@/components/chat-platform-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "DX for WhatsApp",
  description:
    "Manage your DX tools from WhatsApp. Monitor builds, check agent status, and get notifications — all from the messaging app you already use.",
  path: "/chat/whatsapp",
  og: {
    title: "DX for WhatsApp",
    description: "Your DX tools, right in WhatsApp",
  },
  keywords: [
    "WhatsApp dev tools",
    "WhatsApp development alerts",
    "WhatsApp build notifications",
    "WhatsApp project management",
    "DX WhatsApp",
    "dev chat WhatsApp",
  ],
});

const config = {
  name: "WhatsApp",
  slug: "whatsapp",
  appId: "whatsapp",
  icon: <Icons.WhatsApp size={40} className="h-10 w-10 text-[#25D366]" />,
  description:
    "Connect DX to WhatsApp and manage your toolchain without leaving your conversations. Check build status, monitor agents, and run commands — DX handles it all through natural conversation.",
  steps: [
    {
      title: "Connect to DX",
      description:
        "Visit our GitHub repository to get started with DX tools and WhatsApp integration.",
      href: "https://github.com/essence-dx",
    },
    {
      title: "Connect WhatsApp",
      description:
        "Scan the QR code or copy the connection link to start a chat with the DX WhatsApp number.",
    },
    {
      title: "Start chatting",
      description:
        'Send your first message — try forwarding a build log or asking "What is the build status?"',
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
  settingsPath: "DX \u2192 WhatsApp \u2192 Settings",
};

export default function Page() {
  return <ChatPlatformPage config={config} />;
}
