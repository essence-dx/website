"use client";

import { track } from "@dx/events/client";
import { LogEvents } from "@dx/events/events";
import Link from "next/link";

export function TimeSavingsSection() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-2xl sm:text-2xl text-foreground">
            Less admin. More focus.
          </h2>
          <p className="hidden sm:block font-sans text-base text-muted-foreground leading-normal max-w-2xl mx-auto">
            DX removes manual work so you can spend time on what actually
            matters.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <article className="group relative overflow-hidden bg-background border border-border p-4 sm:p-5 hover-bg hover-border transition-all duration-200 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="hidden sm:block text-xs  tracking-wide text-muted-foreground">
                    Building pipelines
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg text-foreground">
                    1–2 hours per week
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Writing and debugging build, test, and deploy pipelines from
                    scratch.
                  </p>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden bg-background border border-border p-4 sm:p-5 hover-bg hover-border transition-all duration-200 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="hidden sm:block text-xs  tracking-wide text-muted-foreground">
                    Context switching
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg text-foreground">
                    1 hour per week
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Jumping between disconnected tools that don't share data or
                    state.
                  </p>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden bg-background border border-border p-4 sm:p-5 hover-bg hover-border transition-all duration-200 cursor-pointer hidden xl:block">
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="hidden sm:block text-xs  tracking-wide text-muted-foreground">
                    Preparing builds
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg text-foreground">
                    1–2 hours per week
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Creating builds, checking deploys, and answering questions.
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 gap-3 sm:gap-4">
            <Link
              href="/file-storage"
              className="group relative overflow-hidden bg-background border border-border p-4 sm:p-5 hover-bg hover-border transition-all duration-200 xl:col-span-3 touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="hidden sm:block text-xs  tracking-wide text-muted-foreground">
                    Dependency management
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg text-foreground">
                    1 hour per week
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Resolving version conflicts and keeping dependencies up to
                    date.
                  </p>
                </div>
              </div>
            </Link>

            <article className="group relative overflow-hidden bg-background border border-border p-4 sm:p-5 hover-bg hover-border transition-all duration-200 cursor-pointer xl:hidden">
              <div className="flex items-start gap-3">
                <div className="min-w-0">
                  <p className="hidden sm:block text-xs  tracking-wide text-muted-foreground">
                    Preparing builds
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg text-foreground">
                    1–2 hours per week
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Creating builds, checking deploys, and answering questions.
                  </p>
                </div>
              </div>
            </article>

            <a
              href="https://github.com/essence-dx"
              onClick={() =>
                track({
                  event: LogEvents.CTA.name,
                  channel: LogEvents.CTA.channel,
                  label: "Time savings",
                  position: "time_savings",
                })
              }
              className="relative overflow-hidden bg-secondary border border-border p-4 sm:p-5 md:p-5 lg:p-6 transition-all duration-200 group hidden xl:block xl:col-span-7 hover:border-muted-foreground touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <p className="hidden sm:block text-xs tracking-wide/loose text-muted-foreground transition-colors duration-200">
                    <span className="group-hover:hidden transition-opacity duration-200">
                      As things add up
                    </span>
                    <span className="hidden group-hover:inline transition-opacity duration-200">
                      What changes
                    </span>
                  </p>
                  <p className="mt-1 text-base sm:text-lg text-foreground transition-colors duration-200">
                    <span className="group-hover:hidden transition-opacity duration-200">
                      What disappears over time
                    </span>
                    <span className="hidden group-hover:inline transition-opacity duration-200">
                      Get your time back
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground transition-colors duration-200">
                    <span className="group-hover:hidden transition-opacity duration-200">
                      Time lost to disconnected tools and manual processes.
                    </span>
                    <span className="hidden group-hover:inline transition-opacity duration-200">
                      DX handles the busywork so you can focus on building.
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-4xl sm:text-5xl text-foreground transition-colors duration-200">
                    4–6 hours
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 xl:hidden">
            <a
              href="https://github.com/essence-dx"
              onClick={() =>
                track({
                  event: LogEvents.CTA.name,
                  channel: LogEvents.CTA.channel,
                  label: "Time savings",
                  position: "time_savings",
                })
              }
              className="relative overflow-hidden bg-secondary border border-border p-4 sm:p-5 md:p-5 lg:p-6 transition-all duration-200 hover:border-muted-foreground touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <p className="hidden sm:block text-xs tracking-wide/loose text-muted-foreground transition-colors duration-200">
                    As things add up
                  </p>
                  <p className="mt-1 text-base sm:text-lg text-foreground transition-colors duration-200">
                    What disappears over time
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground transition-colors duration-200">
                    Manual work caused by disconnected tools.
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-4xl sm:text-5xl text-foreground transition-colors duration-200">
                    4–6 hours
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
