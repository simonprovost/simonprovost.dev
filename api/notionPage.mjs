import { NotionAPI } from 'notion-client';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing page id' });

  try {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(id);
    return res.status(200).json(recordMap);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch Notion page data' });
  }
}
