"use client";

import Link from "next/link";
import { MaterialIcon } from "../homepage/icon-mapping";

export function FeaturesGridSection() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center space-y-4 mb-10 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-2xl text-foreground">
            Everything you need to build great software
          </h2>
          <p className="hidden sm:block font-sans text-base text-muted-foreground leading-normal max-w-2xl mx-auto px-4">
            Code, build, agents, web, media, and CLI tools — all connected in
            one ecosystem.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 max-w-sm sm:max-w-none mx-auto">
          <div className="grid grid-cols-2 gap-6 sm:flex sm:justify-center sm:gap-20">
            <Link
              href="/code"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="code"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Code
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Editor & IDE
                </p>
              </div>
            </Link>

            <Link
              href="/build"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="build"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Build
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Compilation & bundling
                </p>
              </div>
            </Link>

            <Link
              href="/agent"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="smart_toy"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Agent
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  AI agent tools
                </p>
              </div>
            </Link>

            <Link
              href="/cli"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="terminal"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  CLI
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Command-line tools
                </p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:flex sm:justify-center sm:gap-20">
            <Link
              href="/www"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="language"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Web
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Web framework
                </p>
              </div>
            </Link>

            <Link
              href="/flow"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="alt_route"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Flow
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Workflow automation
                </p>
              </div>
            </Link>

            <Link
              href="/forge"
              className="flex flex-col items-center w-full sm:w-[150px]"
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="construction"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Forge
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Build toolchain
                </p>
              </div>
            </Link>

            <Link
              href="/media"
              className="flex flex-col items-center w-full sm:w-[150px] touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="bg-secondary border border-border w-[60px] h-[60px] flex items-center justify-center rounded-none mb-4 hover:border-muted-foreground transition-all duration-200">
                <MaterialIcon
                  name="perm_media"
                  className="text-muted-foreground "
                  size={24}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-sans text-sm text-foreground leading-[21px]">
                  Media
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-[21px]">
                  Image & video processing
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
