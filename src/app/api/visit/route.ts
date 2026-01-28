import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Local development fallback
  if (!url || !token) {
    console.warn("Upstash Redis not configured. Returning mock count.");
    return NextResponse.json({ count: 1234 });
  }

  const redis = new Redis({
    url: url,
    token: token,
  });

  try {
    // Increment the 'pageviews' counter
    const count = await redis.incr("pageviews");
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ count: 1234 });
  }

  const redis = new Redis({
    url: url,
    token: token,
  });

  try {
    const count = await redis.get("pageviews");
    return NextResponse.json({ count: Number(count) || 0 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
