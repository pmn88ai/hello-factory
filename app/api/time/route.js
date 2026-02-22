let serverRequestCount = 0;

export async function GET() {
  serverRequestCount++;

  const now = new Date().toLocaleString();

  return Response.json({
    serverTime: now,
    status: "ok",
    serverRequestCount,
  });
}