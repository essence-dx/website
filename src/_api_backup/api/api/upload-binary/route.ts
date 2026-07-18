import { type NextRequest, NextResponse } from "next/server";
import { validateUploadProxyTarget } from "@/lib/media/upload-proxy-target";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const targetUrl = formData.get("x-proxy-target-url") as string | null;

    if (!targetUrl) {
      return NextResponse.json(
        { error: "Missing proxy target URL" },
        { status: 400 },
      );
    }

    const validatedTarget = validateUploadProxyTarget(targetUrl);
    if (!validatedTarget.ok) {
      return NextResponse.json(
        { error: "Invalid upload target", reason: validatedTarget.reason },
        { status: 400 },
      );
    }

    const s3FormData = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key !== "x-proxy-target-url") {
        s3FormData.append(key, value);
      }
    }

    const s3Response = await fetch(validatedTarget.url, {
      method: "POST",
      body: s3FormData,
    });

    if (s3Response.ok || s3Response.status === 204) {
      return new Response(null, { status: 204 });
    } else {
      const errorText = await s3Response.text();
      console.error("S3 Proxy Error:", errorText);
      return new Response(errorText, { status: s3Response.status });
    }
  } catch (error) {
    console.error("Upload Proxy Exception:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
