import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Story",
  description:
    "Why we built DX. Learn about our mission to create a unified ecosystem of developer tools.",
  path: "/story",
  og: { title: "Our Story", description: "Why we built DX" },
});

export default function StoryPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Title */}
            <div className="space-y-4 text-center">
              <h1 className="font-serif text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl leading-tight lg:leading-tight xl:leading-[1.3] text-foreground">
                Why we started DX
              </h1>
            </div>

            {/* Content */}
            <div className="prose prose-sm sm:prose-base max-w-none space-y-8 font-sans text-foreground">
              {/* The problem */}
              <section className="space-y-4">
                <h2 className="font-sans text-base text-foreground">
                  The problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Building software used to require assembling a complex stack
                  of disconnected tools. Today, a unified ecosystem changes
                  that.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Modern development involves code editors, build systems, web
                  frameworks, AI agents, media pipelines, search engines, and
                  CLI tools. Most of these are built by different teams, with
                  different conventions, and rarely work together seamlessly.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The result is context switching, configuration overhead, and
                  time lost to making tools talk to each other. Your code lives
                  in one tool. Build config in another. Deployments in a third.
                  To ship a feature, you often jump between half a dozen
                  interfaces, each with its own way of doing things.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  That overhead adds up quickly. You are not lacking tools. You
                  are lacking an ecosystem that keeps everything connected.
                </p>
              </section>

              {/* Divider */}
              <div className="flex items-center justify-center py-8">
                <div className="h-px w-full max-w-xs border-t border-border" />
              </div>

              {/* The idea */}
              <section className="space-y-4">
                <h2 className="font-sans text-base text-foreground">
                  The idea
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We did not want to build another standalone tool. We wanted to
                  build a system where everything stays connected without you
                  having to hold it together.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  DX keeps the moving parts of your development process
                  connected as things change, without you constantly switching
                  contexts or digging through config files. Code, builds,
                  agents, web frameworks, media, and CLI tools should not live
                  in silos. They should reinforce each other and work together
                  seamlessly.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Instead of pulling information out of separate tools, DX
                  pushes the right tools to you. Shared conventions, common
                  formats, and integration points help you understand how
                  everything fits together and what needs attention. This way
                  you stay productive without managing a fragmented toolchain.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  DX does not replace your existing workflow. It sits in between
                  and keeps everything organized and ready so decisions are
                  based on a complete picture.
                </p>
              </section>

              {/* Divider */}
              <div className="flex items-center justify-center py-8">
                <div className="h-px w-full max-w-xs border-t border-border" />
              </div>

              {/* What we are focused on */}
              <section className="space-y-4">
                <h2 className="font-sans text-base text-foreground">
                  What we are focused on
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DX is built for developers and teams who want a cohesive
                  toolchain without the complexity of stitching together dozens
                  of unrelated tools.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We focus on reducing configuration overhead, keeping tools
                  consistent and reliable, surfacing the right functionality at
                  the right time, and making it easy to understand how
                  everything fits together. Most importantly, we build tools
                  that work quietly in the background.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our goal is simple. When you are building software, you should
                  not have to spend your time managing your toolchain.
                </p>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Your tools should stay organized and work together as you
                  build.
                </p>
              </section>
            </div>

            {/* Founders Image */}
            <div className="w-full space-y-3">
              <Image
                src="/founders.png"
                alt="Founders"
                width={1200}
                height={450}
                className="w-full h-[350px] sm:h-[450px] object-cover object-center"
                priority
              />
              <div className="text-left">
                <p className="font-sans text-sm text-primary">
                  Pontus & Viktor
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Founders, DX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
