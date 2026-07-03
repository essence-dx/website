"use client";

import { Button } from "@dx/ui/button";
import { Input } from "@dx/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dx/ui/select";
import { Textarea } from "@dx/ui/textarea";
import { useState } from "react";

export function SupportForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const fullName = data.get("fullName") as string;
    const subject = data.get("subject") as string;
    const type = data.get("type") as string;
    const message = data.get("message") as string;

    const mailtoLink = `mailto:support@dx.tips?subject=${encodeURIComponent(`[${type}] ${subject}`)}&body=${encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
            Thank you
          </h1>
          <p className="font-sans text-base text-muted-foreground">
            Your email client should open with a pre-filled message. Send it to
            reach our support team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
            Support
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Get help with DX. Contact our team for assistance with any questions
            or issues you may have.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full space-y-2">
              <label className="font-sans text-sm">Email</label>
              <Input name="email" placeholder="Email" type="email" required />
            </div>
            <div className="w-full space-y-2">
              <label className="font-sans text-sm">Full Name</label>
              <Input name="fullName" placeholder="John Doe" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-sm">Subject</label>
            <Input
              name="subject"
              placeholder="Summary of the problem you have"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full space-y-2">
              <label className="font-sans text-sm">Product</label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transactions">Transactions</SelectItem>
                  <SelectItem value="Vault">Vault</SelectItem>
                  <SelectItem value="Inbox">Inbox</SelectItem>
                  <SelectItem value="Invoicing">Invoicing</SelectItem>
                  <SelectItem value="Tracker">Tracker</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-2">
              <label className="font-sans text-sm">Severity</label>
              <Select name="priority" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-sans text-sm">Message</label>
            <Textarea
              name="message"
              placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."
              className="resize-none min-h-[150px]"
              required
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
