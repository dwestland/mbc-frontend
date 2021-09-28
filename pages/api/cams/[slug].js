const { cams } = require('./data.json')

const Slug = (req, res) => {
  const cam = cams.filter((ev) => ev.slug === req.query.slug)

  if (req.method === 'GET') {
    res.status(200).json(cam)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default Slug
