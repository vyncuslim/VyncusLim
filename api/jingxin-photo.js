const SOURCES = [
  'https://raw.githubusercontent.com/vyncuslim/SomnoAI-Digital-Sleep-Lab/main/public/jingxin-memory.jpg',
  'https://cdn.jsdelivr.net/gh/vyncuslim/SomnoAI-Digital-Sleep-Lab@main/public/jingxin-memory.jpg',
  'https://github.com/vyncuslim/SomnoAI-Digital-Sleep-Lab/raw/refs/heads/main/public/jingxin-memory.jpg'
];

export default async function handler(req, res) {
  for (const url of SOURCES) {
    try {
      const upstream = await fetch(url, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 VyncusLimWebsite/1.0',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });

      const type = upstream.headers.get('content-type') || '';
      if (!upstream.ok || !type.startsWith('image/')) continue;

      const body = Buffer.from(await upstream.arrayBuffer());
      if (!body.length) continue;

      res.setHeader('Content-Type', type);
      res.setHeader('Content-Length', String(body.length));
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.status(200).send(body);
    } catch (_) {}
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(502).send('Photo unavailable');
}
