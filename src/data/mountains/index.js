const profileFiles = import.meta.glob('./*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const requiredFields = [
  'slug',
  'name',
  'japaneseName',
  'region',
  'elevation',
  'difficulty',
  'bestSeason',
  'episodes',
  'summary',
  'image',
]

const parseProfile = (source, path) => {
  source = source.replace(/^\uFEFF/, '')
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Mountain profile is missing front matter: ${path}`)
  }

  const [, frontMatter, content] = match
  const metadata = Object.fromEntries(
    frontMatter.split(/\r?\n/).map((line) => {
      const field = line.match(/^([a-zA-Z]+):\s*(.*)$/)

      if (!field) {
        throw new Error(`Invalid front matter in mountain profile: ${path}`)
      }

      try {
        return [field[1], field[1] === 'order' ? Number(field[2]) : JSON.parse(field[2])]
      } catch (error) {
        throw new Error(`Invalid ${field[1]} value in mountain profile: ${path}`, { cause: error })
      }
    }),
  )

  for (const field of requiredFields) {
    if (typeof metadata[field] !== 'string' || !metadata[field]) {
      throw new Error(`Mountain profile requires a non-empty ${field}: ${path}`)
    }
  }

  if (!Number.isInteger(metadata.order)) {
    throw new Error(`Mountain profile requires an integer order: ${path}`)
  }

  for (const episode of metadata.episodes.split(';')) {
    const match = episode
      .trim()
      .match(/^S([1-4])\s+Eps?\s+\d+(?:[–-]\d+)?(?:,\s*Eps?\s+\d+(?:[–-]\d+)?)*$/)

    if (!match) {
      throw new Error(`Invalid anime episode reference in mountain profile: ${path}`)
    }
  }

  return { ...metadata, content: content.trim() }
}

const mountains = Object.entries(profileFiles)
  .map(([path, source]) => parseProfile(source, path))
  .sort((first, second) => first.order - second.order)

export { mountains }
export default mountains
