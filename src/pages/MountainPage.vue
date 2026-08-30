<template>
  <q-page class="mountain-page">
    <div v-if="!mountain" class="not-found">
      <q-card flat class="not-found-card">
        <q-card-section>
          <p class="eyebrow">No mountain found</p>
          <h2>That route is not in the journal yet.</h2>
          <ActionButton label="Explore mountains" to="/mountains" />
        </q-card-section>
      </q-card>
    </div>

    <template v-else>
      <div class="page-hero" :style="{ backgroundImage: `linear-gradient(180deg, rgba(7, 10, 14, 0.18), rgba(7, 10, 14, 0.7)), url(${mountain.image})` }">
        <div class="hero-content">
          <q-breadcrumbs class="breadcrumbs" color="white" separator="/">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Mountains" to="/mountains" />
            <q-breadcrumbs-el :label="mountain.name" />
          </q-breadcrumbs>

          <p class="eyebrow">Peak profile</p>
          <h1>{{ mountain.name }}</h1>

          <div class="chip-row">
            <q-chip>{{ mountain.region }}</q-chip>
            <q-chip>{{ mountain.elevation }}</q-chip>
            <q-chip>{{ mountain.difficulty }}</q-chip>
          </div>
        </div>
      </div>

      <div class="content-wrap">
        <article class="article-panel">
          <div v-if="loading" class="loading-state">
            <q-spinner color="primary" size="3rem" />
          </div>
          <div v-else class="markdown-body" v-html="renderedHtml" />
        </article>

        <aside class="side-panel">
          <q-card flat class="facts-card">
            <q-card-section>
              <p class="facts-label">Quick facts</p>
              <ul>
                <li><span>Region</span><strong>{{ mountain.region }}</strong></li>
                <li><span>Elevation</span><strong>{{ mountain.elevation }}</strong></li>
                <li><span>Difficulty</span><strong>{{ mountain.difficulty }}</strong></li>
                <li><span>Best season</span><strong>{{ mountain.bestSeason }}</strong></li>
              </ul>
            </q-card-section>
          </q-card>
        </aside>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ActionButton from '../components/ActionButton.vue'
import mountains from '../data/mountains'

const route = useRoute()
const markdown = ref('')
const loading = ref(true)

const mountain = computed(() => {
  const slug = route.params.slug
  return mountains.find((entry) => entry.slug === slug) || null
})

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const renderInline = (value) =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

const renderMarkdown = (source) => {
  if (!source) return ''

  const lines = source.trim().split(/\n/)
  let html = ''
  let paragraph = []
  let listItems = []
  let codeLines = []
  let inCodeBlock = false

  const flushParagraph = () => {
    if (!paragraph.length) return
    html += `<p>${renderInline(paragraph.join(' '))}</p>`
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    html += `<ul>${listItems.map((item) => `<li>${item}</li>`).join('')}</ul>`
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    if (line.startsWith('```')) {
      flushParagraph()
      flushList()

      if (inCodeBlock) {
        html += `<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
        codeLines = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      continue
    }

    if (/^#{1,3}\s+/.test(line)) {
      flushParagraph()
      flushList()
      const level = line.match(/^#+/)[0].length
      const text = line.replace(/^#{1,3}\s+/, '')
      html += `<h${level}>${renderInline(text)}</h${level}>`
      continue
    }

    if (/^>\s+/.test(line)) {
      flushParagraph()
      flushList()
      html += `<blockquote>${renderInline(line.replace(/^>\s+/, ''))}</blockquote>`
      continue
    }

    if (/^-\s+/.test(line)) {
      flushParagraph()
      listItems.push(renderInline(line.replace(/^-\s+/, '')))
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  if (inCodeBlock && codeLines.length) {
    html += `<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
  }

  return html
}

const renderedHtml = computed(() => renderMarkdown(markdown.value))

const loadMarkdown = async () => {
  if (!mountain.value) {
    loading.value = false
    return
  }

  loading.value = true

  try {
    const filePath = `${import.meta.env.BASE_URL}mountains/${mountain.value.slug}.md`
    const response = await fetch(filePath)

    if (!response.ok) {
      throw new Error('Markdown not found')
    }

    markdown.value = await response.text()
  } catch (error) {
    console.error(error)
    markdown.value = '# Content coming soon\n\nThis mountain profile is being prepared.'
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  () => {
    loadMarkdown()
  },
  { immediate: true },
)
</script>

<style scoped>
.mountain-page {
  background: #f4efe8;
  min-height: calc(100vh - 72px);
}

.page-hero {
  min-height: 360px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 72px 24px 38px;
}

.hero-content {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  color: #fff;
}

.breadcrumbs {
  margin-bottom: 1rem;
  font-size: 0.8rem;
}

.eyebrow {
  margin: 0 0 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.75;
}

.hero-content h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1.1;
  font-weight: 800;
}

.chip-row {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.content-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 72px;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 0.75fr);
  gap: 24px;
  align-items: start;
}

.article-panel,
.facts-card,
.not-found-card {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(8px);
}

.article-panel {
  overflow: hidden;
}

.markdown-body {
  padding: 32px 28px;
  color: #1f2d3d;
  line-height: 1.8;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin: 1.75rem 0 0.85rem;
  color: #142330;
  line-height: 1.2;
}

.markdown-body h1 {
  font-size: clamp(2rem, 3vw, 2.6rem);
}

.markdown-body h2 {
  font-size: clamp(1.4rem, 2vw, 1.8rem);
}

.markdown-body h3 {
  font-size: 1.2rem;
}

.markdown-body p,
.markdown-body ul,
.markdown-body ol,
.markdown-body blockquote {
  margin: 0 0 1rem;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.5rem;
}

.markdown-body blockquote {
  padding: 0.75rem 1rem;
  color: #52606c;
  background: #f3f6f8;
  border-left: 4px solid #a9c4d9;
  border-radius: 12px;
}

.markdown-body code {
  background: #edf3f8;
  padding: 0.12rem 0.45rem;
  border-radius: 6px;
  font-size: 0.95em;
}

.markdown-body pre {
  background: #0f172a;
  color: #f8fafc;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  overflow-x: auto;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.18);
}

.loading-state {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-panel {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
}

.facts-label {
  margin: 0 0 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: #51606d;
}

.facts-card .q-card__section {
  padding: 22px 20px 18px;
}

.facts-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.9rem;
}

.facts-card li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0.7rem 0.8rem;
  border-radius: 12px;
  background: #f5f7fb;
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: #36414a;
}

.facts-card li span {
  color: #61727f;
}

.facts-card li strong {
  color: #10212e;
  font-weight: 700;
  text-align: right;
}

.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.not-found-card {
  max-width: 520px;
  width: 100%;
}

.not-found-card .q-card__section {
  padding: 32px;
  text-align: center;
}

.not-found-card h2 {
  margin: 0 0 1.2rem;
  color: #11212c;
}

@media (max-width: 860px) {
  .content-wrap {
    grid-template-columns: 1fr;
  }

  .page-hero {
    min-height: 300px;
  }

  .markdown-body {
    padding: 24px 20px;
  }
}
</style>
