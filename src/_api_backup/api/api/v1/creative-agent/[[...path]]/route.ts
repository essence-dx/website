import { type NextRequest, NextResponse } from "next/server";

const MUAPI_BASE = "https://api.muapi.ai";

function getApiKey(request: NextRequest): string | undefined {
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  const headerKey = request.headers.get("x-api-key");
  if (headerKey) return headerKey;
  const cookieKey = request.cookies.get("muapi_key")?.value;
  return cookieKey;
}

function cleanHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("cookie");
  headers.delete("Authorization");
  headers.delete("x-api-key");
  return headers;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const slug = await params;
  const pathSegments = slug.path || [];
  const path = pathSegments.join("/");
  const { search } = new URL(request.url);
  const targetUrl = `${MUAPI_BASE}/api/v1/creative-agent/${path}${search}`;

  const headers = cleanHeaders(request);
  const apiKey = getApiKey(request);
  if (apiKey) headers.set("x-api-key", apiKey);

  try {
    const response = await fetch(targetUrl, { headers, method: "GET" });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const slug = await params;
  const pathSegments = slug.path || [];
  const path = pathSegments.join("/");
  const { search } = new URL(request.url);
  const targetUrl = `${MUAPI_BASE}/api/v1/creative-agent/${path}${search}`;

  const headers = cleanHeaders(request);
  const apiKey = getApiKey(request);
  if (apiKey) headers.set("x-api-key", apiKey);

  try {
    const body = await request.arrayBuffer();
    const response = await fetch(targetUrl, { method: "POST", headers, body });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const slug = await params;
  const pathSegments = slug.path || [];
  const path = pathSegments.join("/");
  const { search } = new URL(request.url);
  const targetUrl = `${MUAPI_BASE}/api/v1/creative-agent/${path}${search}`;

  const headers = cleanHeaders(request);
  const apiKey = getApiKey(request);
  if (apiKey) headers.set("x-api-key", apiKey);

  try {
    const body = await request.arrayBuffer();
    const response = await fetch(targetUrl, { method: "PATCH", headers, body });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const slug = await params;
  const pathSegments = slug.path || [];
  const path = pathSegments.join("/");
  const { search } = new URL(request.url);
  const targetUrl = `${MUAPI_BASE}/api/v1/creative-agent/${path}${search}`;

  const headers = cleanHeaders(request);
  const apiKey = getApiKey(request);
  if (apiKey) headers.set("x-api-key", apiKey);

  try {
    const response = await fetch(targetUrl, { method: "DELETE", headers });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
