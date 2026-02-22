export async function GET() {
    const now = new Date().toLocaleString();
  
    return Response.json({
      serverTime: now,
      status: "ok",
    });
  }