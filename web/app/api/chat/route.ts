export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponses = await fetch(
      `${process.env.BACKEND_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return new Response(backendResponses.body, {
      status: backendResponses.status,
      headers: {
        "Content-Type":
          backendResponses.headers.get("Content-Type") || "text/plain",
      },
    });
  } catch (err) {
    console.error("Error in chat proxy: ", err);
    return new Response(JSON.stringify({ error: "Proxy request failed" }), {
      status: 500,
    });
  }
}
