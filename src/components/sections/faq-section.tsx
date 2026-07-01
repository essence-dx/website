"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is DX?",
    answer:
      "DX is a collection of open-source developer tools — code editor, build system, web framework, AI agents, CLI tools, media processing, and more — all designed to work together in a unified ecosystem.",
  },
  {
    question: "Who is DX for?",
    answer:
      "DX is built for developers and teams who want a cohesive toolchain without the complexity of stitching together dozens of unrelated tools.",
  },
  {
    question: "Do I need special knowledge to use DX tools?",
    answer:
      "No. Each DX tool is designed to be approachable on its own, with sensible defaults and clear documentation. You can start with one tool and add more as you need them.",
  },
  {
    question: "How do DX tools work together?",
    answer:
      "DX tools share common conventions, configuration formats, and integration points. For example, DX build understands DX code projects, DX flow can orchestrate DX build pipelines, and DX agent can deploy to DX www.",
  },
  {
    question: "Are DX tools open source?",
    answer:
      "Yes. All DX tools are open source under the MIT License. You can use, modify, and distribute them freely.",
  },
  {
    question: "Can I use DX tools individually?",
    answer:
      "Absolutely. While DX tools are designed to work together, each tool is standalone and can be used independently with your existing workflow.",
  },
  {
    question: "What platforms do DX tools support?",
    answer:
      "DX tools support Windows, macOS, and Linux. Most tools are also available as CLI tools, while some have GUI or web interfaces.",
  },
  {
    question: "How do I get started?",
    answer:
      "Visit our GitHub repository to explore individual tools, or install the DX CLI to get started with the full ecosystem. Each tool has its own getting-started guide.",
  },
  {
    question: "Can I contribute to DX tools?",
    answer:
      "Yes. DX is community-driven and welcomes contributions. Check the contributing guide on GitHub for each tool's repository.",
  },
  {
    question: "How do DX tools compare to other tools?",
    answer:
      "DX tools focus on interoperability, performance, and developer experience. They are designed to replace the need for multiple disconnected tools with a coherent ecosystem.",
  },
  {
    question: "Is DX secure?",
    answer:
      "Yes. All DX tools follow security best practices and are regularly audited. Being open source, the code is transparent and community-reviewed.",
  },
  {
    question: "Can I use DX with my existing tools?",
    answer:
      "Yes. DX tools are designed to integrate with standard formats and protocols, making them compatible with most existing development workflows.",
  },
  {
    question: "Is there commercial support available?",
    answer:
      "DX tools are community-supported. For enterprise needs, commercial support options are available through select partners.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-2xl sm:text-2xl text-foreground">
            Frequently asked questions
          </h2>
          <p className="hidden sm:block font-sans text-base text-muted-foreground leading-normal max-w-2xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border border-border bg-background"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-muted/50 transition-colors"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <span className="font-sans text-sm text-foreground pr-6">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-muted-foreground text-base">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
