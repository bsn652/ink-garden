// RSS route disabled for static export
// To re-enable: remove the "output: export" from next.config.ts
export async function GET() {
  return new Response(null, { status: 404 });
}
