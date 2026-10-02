<template>
  <q-page class="mountains-page">
    <div class="page-content">
      <section id="mountain-archive" class="archive-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow dark">Yama no Susume · {{ mountains.length }} profiles</p>
            <h1>Mountain archive</h1>
          </div>
          <p class="result-count" aria-live="polite">
            <strong>{{ filteredMountains.length }}</strong>
            {{ filteredMountains.length === 1 ? 'mountain' : 'mountains' }}
          </p>
        </div>

        <div class="filter-bar">
          <label class="search-field">
            <q-icon name="search" size="20px" aria-hidden="true" />
            <span class="sr-only">Search mountains</span>
            <input v-model="searchQuery" type="search" placeholder="Search peaks, places, episodes..." />
          </label>
          <label class="season-field">
            <span class="sr-only">Filter by season</span>
            <select v-model="selectedSeason">
              <option value="">All seasons</option>
              <option value="S1">Season 1</option>
              <option value="S2">Season 2</option>
              <option value="S3">Season 3</option>
              <option value="S4">Next Summit</option>
            </select>
            <q-icon name="expand_more" size="20px" aria-hidden="true" />
          </label>
        </div>

        <div v-if="filteredMountains.length" class="mountains-grid">
          <MountainCard
            v-for="mountain in filteredMountains"
            :key="mountain.slug"
            :mountain="mountain"
            :link-to="`/mountains/${mountain.slug}`"
          />
        </div>
        <div v-else class="empty-state">
          <q-icon name="landscape" size="36px" />
          <h3>No peaks found</h3>
          <p>Try another name, place, episode, or season.</p>
          <button type="button" @click="clearFilters">Clear filters</button>
        </div>
      </section>

    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import MountainCard from '../components/MountainCard.vue'
import mountains from '../data/mountains'

const searchQuery = ref('')
const selectedSeason = ref('')

const filteredMountains = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()

  return mountains.filter((mountain) => {
    const matchesSearch =
      !query ||
      [
        mountain.name,
        mountain.japaneseName,
        mountain.region,
        mountain.episodes,
        mountain.summary,
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
    const matchesSeason = !selectedSeason.value || mountain.episodes.includes(selectedSeason.value)

    return matchesSearch && matchesSeason
  })
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedSeason.value = ''
}
</script>

<style scoped>
.mountains-page {
  --forest: #284f3b;
  --forest-deep: #1f3d2e;
  --ink: #25332b;
  --muted: #728077;
  --paper: #f4efe8;
  --line: rgba(40, 79, 59, 0.14);
  min-height: calc(100vh - 72px);
  background: var(--paper);
  color: var(--ink);
}

.eyebrow {
  margin: 0 0 18px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.page-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.eyebrow.dark {
  margin-bottom: 12px;
  color: #65806c;
}

.archive-section {
  padding: 40px 0 76px;
  scroll-margin-top: 32px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 25px;
}

.section-heading h1 {
  margin: 0;
  color: var(--forest-deep);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.13;
  letter-spacing: -0.045em;
}

.result-count {
  margin: 0 0 5px;
  color: #78847c;
  font-size: 0.86rem;
}

.result-count strong {
  color: var(--forest);
}

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.search-field,
.season-field {
  display: flex;
  align-items: center;
  min-height: 50px;
  border: 1px solid rgba(40, 79, 59, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.68);
  color: #748178;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-field {
  flex: 1;
  gap: 11px;
  padding: 0 14px;
}

.search-field:focus-within,
.season-field:focus-within {
  border-color: #63876d;
  box-shadow: 0 0 0 3px rgba(82, 126, 92, 0.12);
}

.search-field input,
.season-field select {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font: inherit;
}

.search-field input::placeholder {
  color: #929c95;
}

.season-field {
  position: relative;
  width: 190px;
  padding: 0 12px 0 15px;
}

.season-field select {
  appearance: none;
  height: 100%;
  cursor: pointer;
}

.season-field q-icon {
  pointer-events: none;
}

.mountains-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.empty-state {
  display: flex;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(40, 79, 59, 0.24);
  border-radius: 24px;
  color: #758078;
  text-align: center;
}

.empty-state h3 {
  margin: 12px 0 4px;
  color: var(--forest-deep);
  font-size: 1.25rem;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

.empty-state button {
  margin-top: 18px;
  padding: 9px 15px;
  border: 1px solid rgba(40, 79, 59, 0.26);
  border-radius: 999px;
  background: transparent;
  color: var(--forest);
  font: inherit;
  cursor: pointer;
}

.empty-state button:hover {
  background: rgba(40, 79, 59, 0.08);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1000px) {
  .mountains-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .page-content {
    padding: 0 20px;
  }

  .archive-section {
    padding: 32px 0 56px;
  }

  .section-heading {
    align-items: flex-start;
  }

  .result-count {
    padding-top: 20px;
    white-space: nowrap;
  }

  .filter-bar {
    flex-direction: column;
  }

  .season-field {
    width: 100%;
    min-height: 48px;
  }

  .mountains-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
