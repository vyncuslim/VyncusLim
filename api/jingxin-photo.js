const PHOTO_URL = 'https://raw.githubusercontent.com/vyncuslim/SomnoAI-Digital-Sleep-Lab/130663abdc605a7439035f6195efcfa447777d1d/public/jingxin-memory.jpg';

export default async function handler(req, res) {
  try {
    const upstream = await fetch(PHOTO_URL, {
      headers: { 'User-Agent': 'VyncusLim-Website/1.0' }
    });

    if (!upstream.ok) {
      res.status(upstream.status).send('Photo unavailable');
      return;
    }

    const body = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Content-Length', String(body.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(body);
  } catch (error) {
    console.error('Failed to fetch Jing Xin photo:', error);
    res.status(502).send('Photo unavailable');
  }
}
