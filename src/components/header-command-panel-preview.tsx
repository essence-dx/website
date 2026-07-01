"use client";

import { Icons } from "@dx/ui/icons";
import { MaterialIcon } from "./homepage/icon-mapping";

export function HeaderCommandPanelPreview() {
  const deploy = {
    name: "Production Deploy",
  };

  const alerts = [
    {
      id: 1,
      name: "Alert #BLD-2025-001",
    },
    {
      id: 2,
      name: "Alert #BLD-2024-089",
    },
  ];

  const logs = [
    {
      id: 1,
      name: "Log - Build Server",
    },
    {
      id: 2,
      name: "Log - Build Worker",
    },
  ];

  const files = [
    {
      id: 1,
      name: "Acme_Contract_Q1_2025.pdf",
    },
    {
      id: 2,
      name: "Deploy_Acme_2025-001.pdf",
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-2 bg-background">
      {/* Container with border and dotted pattern */}
      <div
        className="w-full h-full border border-border p-2 relative scale-50 origin-center"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 0.5px, transparent 0)",
          backgroundSize: "6px 6px",
        }}
      >
        {/* Command Panel Container */}
        <div className="w-full h-full border border-border bg-background flex flex-col relative">
          {/* Search Bar */}
          <div className="pt-1 pb-1 border-b border-border flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                value="Acme"
                readOnly
                placeholder="Type a command or search..."
                className="w-full bg-background px-2 py-1 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none rounded-none pr-7"
              />
              <MaterialIcon
                name="search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                size={14}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden px-2 py-2">
            {/* Deploy Section */}
            <div className="mb-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                Deploy
              </div>
              <div className="flex items-center gap-2 pr-2 py-1">
                <MaterialIcon
                  name="list_alt"
                  className="text-muted-foreground flex-shrink-0"
                  size={16}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-foreground">
                    {deploy.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div className="mb-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                Alerts
              </div>
              <div className="space-y-0.5">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center gap-2 pr-2 py-1"
                  >
                    <MaterialIcon
                      name="warning"
                      className="text-muted-foreground flex-shrink-0"
                      size={16}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground">
                        {alert.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs Section */}
            <div className="mb-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                Logs
              </div>
              <div className="space-y-0.5">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-2 pr-2 py-1"
                  >
                    <MaterialIcon
                      name="receipt"
                      className="text-muted-foreground flex-shrink-0"
                      size={16}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground">
                        {log.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Files Section */}
            <div className="mb-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                Files
              </div>
              <div className="space-y-0.5">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 pr-2 py-1"
                  >
                    <MaterialIcon
                      name="pdf"
                      className="text-muted-foreground flex-shrink-0"
                      size={16}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground truncate">
                        {file.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="px-2 py-1.5 border-t border-border flex items-center justify-between">
            <div className="flex items-center">
              <Icons.LogoSmall className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
              >
                <MaterialIcon
                  name="arrow_upward"
                  className="text-muted-foreground"
                  size={12}
                />
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
              >
                <MaterialIcon
                  name="arrow_downward"
                  className="text-muted-foreground"
                  size={12}
                />
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
              >
                <MaterialIcon
                  name="subdirectory_arrow_left"
                  className="text-muted-foreground"
                  size={12}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
