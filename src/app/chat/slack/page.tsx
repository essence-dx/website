import { Icons } from "@dx/ui/icons";
import { ChatPlatformPage } from "@/components/chat-platform-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
    title: "DX for Slack",
  description:
    "Manage your DX tools from Slack. Monitor builds, check agent status, and get notifications — without leaving your workspace.",
  path: "/chat/slack",
  og: {
  title: "DX for Slack",
    description: "Your DX tools, without leaving Slack",
  },
  keywords: [
    "Slack dev tools",
    "Slack development alerts",
    "Slack build notifications",
    "Slack project bot",
    "Slack dev updates",
    "DX Slack",
  ],
});

const config = {
  name: "Slack",
  slug: "slack",
  appId: "slack",
  icon: <Icons.Slack size={40} className="h-10 w-10" />,
  description:
    "Connect DX to Slack and manage your toolchain without leaving your workspace. Check build status, monitor agents, run commands — DX works right in your DMs or a shared channel.",
  steps: [
    {
      title: "Connect to DX",
      description:
        "Visit our GitHub repository to get started with DX tools and Slack integration.",
      href: "https://github.com/essence-dx",
    },
    {
      title: "Install to your workspace",
      description:
        "Click Connect and authorize DX in your Slack workspace. Choose a channel or use direct messages.",
    },
    {
      title: "Start chatting",
      description:
        'Send your first message — try asking "What is the build status?" or "Run a deploy check".',
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
    "Deploy and check DX www sites in Slack",
    "Ask questions about your toolchain in plain language",
    "Get real-time notifications for builds, deploys, and workflows",
  ],
  settingsPath: "DX \u2192 Slack \u2192 Settings",
};

export default function Page() {
  return <ChatPlatformPage config={config} />;
}
