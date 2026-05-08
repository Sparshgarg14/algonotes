import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const storagePath = path.join(process.cwd(), "data", "views.json");

async function readCounts() {
  try {
    const content = await fs.readFile(storagePath, "utf8");
    return JSON.parse(content) as Record<string, number>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

async function writeCounts(counts: Record<string, number>) {
  await fs.mkdir(path.dirname(storagePath), { recursive: true });
  await fs.writeFile(storagePath, JSON.stringify(counts, null, 2), "utf8");
}

function getSlug(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  if (!slug) {
    throw new Error("Missing slug parameter");
  }
  return slug;
}

export async function GET(request: Request) {
  try {
    const slug = getSlug(request);
    const counts = await readCounts();
    return NextResponse.json({ count: counts[slug] ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const slug = getSlug(request);
    const counts = await readCounts();
    counts[slug] = (counts[slug] ?? 0) + 1;
    await writeCounts(counts);
    return NextResponse.json({ count: counts[slug] });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
