import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function getSlug(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  if (!slug) throw new Error("Missing slug parameter");
  return slug;
}

export async function GET(request: Request) {
  try {
    const slug = getSlug(request);
    const count = await redis.get<number>(`views:${slug}`) ?? 0;
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const slug = getSlug(request);
    const count = await redis.incr(`views:${slug}`);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}