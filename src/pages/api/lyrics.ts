import type { NextApiRequest, NextApiResponse } from 'next';
import lyricsSearcher from 'lyrics-searcher';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lyrics =
    (await lyricsSearcher(<string>req.query.artist, req.query.track)) ||
    'No lyrics Found';
  res.status(200).json({ lyrics });
}
