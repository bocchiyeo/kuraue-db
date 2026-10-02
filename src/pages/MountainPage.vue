<template>
  <q-page class="mountain-page">
    <div v-if="!mountain" class="not-found">
      <div class="not-found-card">
        <p class="eyebrow">Trail not found</p>
        <h1>This peak isn't in the journal yet.</h1>
        <p>Head back to the archive to find another mountain.</p>
        <ActionButton label="Explore mountains" to="/mountains" />
      </div>
    </div>

    <template v-else>
      <header class="mountain-hero" :style="{ '--mountain-image': `url('${mountain.image}')` }">
        <div class="hero-scrim" />
        <div class="hero-inner">
          <q-breadcrumbs class="breadcrumbs" separator="/">
            <q-breadcrumbs-el label="Home" to="/" />
            <q-breadcrumbs-el label="Mountains" to="/mountains" />
            <q-breadcrumbs-el :label="mountain.name" />
          </q-breadcrumbs>

          <div class="hero-copy">
            <p class="eyebrow"><span class="eyebrow-mark" /> Anime mountain archive</p>
            <h1>{{ mountain.name }}</h1>
            <p v-if="mountain.japaneseName" class="japanese-name">{{ mountain.japaneseName }}</p>
            <p class="hero-summary">{{ mountain.summary }}</p>
          </div>
        </div>
        <div class="hero-attribution">
          <span class="hero-location">{{ mountain.region }}</span>
          <a
            v-if="mountain.photoSource"
            :href="mountain.photoSource"
            target="_blank"
            rel="noreferrer"
          >Photo source &amp; license</a>
          <span v-else>Illustrative landscape</span>
        </div>
      </header>

      <main class="profile-content">
        <section class="fact-strip" aria-label="Mountain details">
          <div class="fact">
            <span>Elevation</span>
            <strong>{{ mountain.elevation }}</strong>
          </div>
          <div class="fact">
            <span>Difficulty</span>
            <strong>{{ mountain.difficulty }}</strong>
          </div>
          <div class="fact">
            <span>Best season</span>
            <strong>{{ mountain.bestSeason }}</strong>
          </div>
          <div class="fact episodes-fact">
            <span>Featured in</span>
            <strong>{{ mountain.episodes }}</strong>
          </div>
        </section>

        <article class="article-panel">
          <div class="article-heading">
            <p class="eyebrow dark">The story behind the climb</p>
            <span class="article-mark" aria-hidden="true"><q-icon name="landscape" size="22px" /></span>
          </div>
          <div class="markdown-body" v-html="renderedHtml" />
          <router-link class="back-link" to="/mountains">
            <q-icon name="west" size="18px" />
            Back to all mountains
          </router-link>
        </article>
      </main>
    </template>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ActionButton from '../components/ActionButton.vue'
import mountains from '../data/mountains'

const route = useRoute()

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

  const lines = source
    .trim()
    .split(/\n/)
    .filter((line, index) => {
      if (index === 0 && /^#\s+/.test(line)) return false
      return !/^\*\*(?:Elevation|Location|Anime appearances?):\*\*/.test(line)
    })
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

const renderedHtml = computed(() => renderMarkdown(mountain.value?.content || ''))
</script>

<style scoped>
.mountain-page {
  --forest: #284f3b;
  --forest-deep: #1f3d2e;
  --ink: #25332b;
  --muted: #718078;
  --paper: #f4efe8;
  --line: rgba(40, 79, 59, 0.14);
  background: #f4efe8;
  min-height: calc(100vh - 72px);
}

.mountain-hero {
  position: relative;
  display: flex;
  min-height: 540px;
  align-items: flex-end;
  overflow: hidden;
  padding: 42px 32px 52px;
  background-color: #344c3c;
  background-image: var(--mountain-image);
  background-position: center 48%;
  background-size: cover;
  color: #fff;
}

.mountain-hero::before,
.hero-scrim {
  position: absolute;
  inset: 0;
}

.mountain-hero::before {
  content: '';
  background: linear-gradient(180deg, rgba(14, 27, 19, 0.23), rgba(14, 27, 19, 0.08) 28%, rgba(14, 27, 19, 0.76));
}

.hero-scrim {
  background: linear-gradient(90deg, rgba(14, 27, 19, 0.34), transparent 78%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: min(1120px, 100%);
  margin: 0 auto;
}

.breadcrumbs {
  margin-bottom: clamp(68px, 15vh, 150px);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
}

.breadcrumbs :deep(a) {
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
}

.breadcrumbs :deep(a:hover) {
  color: #fff;
}

.hero-copy {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 14px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.eyebrow-mark {
  display: inline-block;
  width: 20px;
  height: 1px;
  margin: 0 9px 4px 0;
  background: #d3dfb9;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(3rem, 7vw, 5.8rem);
  font-weight: 750;
  letter-spacing: -0.06em;
  line-height: 0.98;
}

.japanese-name {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.15rem;
}

.hero-summary {
  max-width: 590px;
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1rem;
  line-height: 1.75;
}

.hero-location {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-attribution {
  position: absolute;
  right: max(32px, calc((100% - 1120px) / 2));
  bottom: 52px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.65rem;
}

.hero-attribution a {
  color: inherit;
  text-underline-offset: 3px;
}

.profile-content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 72px;
}

.fact-strip {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: -28px 0 30px;
  padding: 23px 10px;
  border: 1px solid rgba(40, 79, 59, 0.1);
  border-radius: 20px;
  background: #fbfaf7;
  box-shadow: 0 16px 40px rgba(35, 56, 42, 0.09);
}

.fact {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 2px 20px;
  border-right: 1px solid var(--line);
}

.fact:last-child {
  border-right: 0;
}

.fact span {
  color: #829087;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.fact strong {
  color: var(--forest-deep);
  font-size: 0.96rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.episodes-fact strong {
  font-size: 0.78rem;
}

.article-panel {
  max-width: 820px;
  margin: 0 auto;
  padding: 38px clamp(22px, 5vw, 60px) 30px;
  border: 1px solid rgba(40, 79, 59, 0.1);
  border-radius: 24px;
  background: #fbfaf7;
  box-shadow: 0 12px 36px rgba(35, 56, 42, 0.06);
}

.article-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.eyebrow.dark {
  margin: 0;
  color: #65806c;
}

.article-mark {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #edf1e9;
  color: var(--forest);
}

.markdown-body {
  padding: 28px 0 8px;
  color: #4c5b51;
  font-size: 0.98rem;
  line-height: 1.9;
}

.markdown-body h2,
.markdown-body h3 {
  margin: 2rem 0 0.8rem;
  color: var(--forest-deep);
  line-height: 1.2;
}

.markdown-body h2 {
  font-size: clamp(1.35rem, 2.5vw, 1.7rem);
}

.markdown-body h3 {
  font-size: 1.12rem;
}

.markdown-body p,
.markdown-body ul,
.markdown-body ol {
  margin: 0 0 1rem;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.3rem;
}

.markdown-body blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.2rem;
  border-left: 3px solid #9aaf91;
  border-radius: 0 12px 12px 0;
  background: #f0f2eb;
  color: #556657;
}

.markdown-body code {
  background: #edf1e9;
  padding: 0.12rem 0.45rem;
  border-radius: 6px;
  font-size: 0.95em;
}

.markdown-body :deep(a) {
  color: #426e50;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.markdown-body :deep(a:hover) {
  color: #244a32;
}

.markdown-body pre {
  background: #0f172a;
  color: #f8fafc;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  overflow-x: auto;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.18);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--forest);
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  color: var(--forest-deep);
}

.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
}

.not-found-card {
  max-width: 580px;
  padding: clamp(28px, 5vw, 52px);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #fbfaf7;
  box-shadow: 0 18px 48px rgba(35, 56, 42, 0.08);
  text-align: center;
}

.not-found-card .eyebrow {
  color: #65806c;
}

.not-found-card h1 {
  margin: 0;
  color: var(--forest-deep);
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

.not-found-card p:not(.eyebrow) {
  margin: 14px 0 24px;
  color: var(--muted);
}

@media (max-width: 860px) {
  .mountain-hero {
    min-height: 490px;
    padding: 32px 24px 42px;
  }

  .breadcrumbs {
    margin-bottom: clamp(60px, 12vh, 110px);
  }

  .hero-location {
    font-size: 0.63rem;
  }

  .hero-attribution {
    right: 24px;
    bottom: 17px;
  }

  .profile-content {
    padding-inline: 20px;
  }

  .fact-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fact:nth-child(2) {
    border-right: 0;
  }

  .fact:nth-child(-n + 2) {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--line);
  }

  .fact:nth-child(n + 3) {
    padding-top: 16px;
  }

  .episodes-fact strong {
    font-size: 0.76rem;
  }
}

@media (max-width: 520px) {
  .mountain-hero {
    min-height: 460px;
    padding: 26px 20px 44px;
    background-position: center;
  }

  .breadcrumbs {
    margin-bottom: 72px;
    font-size: 0.7rem;
  }

  .hero-copy h1 {
    font-size: clamp(2.8rem, 13vw, 4rem);
  }

  .hero-summary {
    font-size: 0.9rem;
  }

  .hero-location {
    font-size: 0.64rem;
  }

  .hero-attribution {
    right: 20px;
    bottom: 16px;
  }

  .profile-content {
    padding: 0 14px 48px;
  }

  .fact-strip {
    gap: 0;
    margin-top: -22px;
    padding: 16px 4px;
    border-radius: 16px;
  }

  .fact {
    padding-inline: 12px;
  }

  .fact strong {
    font-size: 0.85rem;
  }

  .fact span {
    font-size: 0.59rem;
  }

  .episodes-fact strong {
    font-size: 0.68rem;
  }

  .article-panel {
    padding: 26px 20px 22px;
    border-radius: 18px;
  }

  .markdown-body {
    font-size: 0.92rem;
  }

}
</style>
