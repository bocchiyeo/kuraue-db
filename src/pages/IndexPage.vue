<template>
  <q-page class="no-padding home-page">
    <q-img
      src="https://images.alphacoders.com/761/761908.jpg"
      class="window-height hero-image"
    >
      <div class="absolute-full bg-overlay" />

      <div class="absolute-full hero-content text-white text-center">
        <div class="hero-copy">
          <p class="eyebrow">Yama no Susume archive</p>
          <h1 class="text-h2 text-weight-bold q-mb-md">KuraueDB</h1>

          <p class="text-subtitle1 q-mb-lg hero-subtitle">
            Explore the mountains of Yama no Susume
          </p>

          <div class="cta-row">
            <ActionButton label="Explore Mountains" to="/mountains" class="q-mr-md" />
            <ActionButton label="View Characters" variant="secondary" @click="scrollToSection('characters')" />
          </div>
        </div>

        <q-icon
          name="keyboard_arrow_down"
          size="36px"
          class="scroll-indicator"
          @click="scrollToSection('about')"
        />
      </div>
    </q-img>

    <section id="about" class="section about-section text-grey-9">
      <div class="row justify-center">
        <div class="col-12 col-md-8 text-center">
          <p class="eyebrow dark">What is KuraueDB?</p>
          <h2 class="text-h4 text-weight-bold q-mb-md">A mountain journal for the fandom</h2>

          <p class="text-body1 q-mb-lg about-copy">
            KuraueDB is a fan-made Vue project that archives the mountains featured in Yama no Susume.
            It brings together scenic notes, route highlights, and visual storytelling in a clean,
            readable format meant for curious hikers and anime fans alike.
          </p>

          <ActionButton label="Browse Peaks" to="/mountains" />
        </div>
      </div>
    </section>

    <section id="mountains" class="section mountains-section text-grey-9">
      <div class="section-header text-center">
        <p class="eyebrow dark">Featured mountains</p>
        <h2 class="text-h4 text-weight-bold q-mb-lg">Climbs worth returning to</h2>
      </div>

      <div class="mountains-grid">
        <MountainCard
          v-for="mountain in featuredMountains"
          :key="mountain.slug"
          :mountain="mountain"
          :link-to="`/mountains/${mountain.slug}`"
        />
      </div>
    </section>

    <section id="characters" class="section characters-section text-grey-9">
      <div class="section-header text-center">
        <p class="eyebrow dark">Cast</p>
        <h2 class="text-h4 text-weight-bold q-mb-lg">Mountain companions</h2>
      </div>

      <div class="characters-grid">
        <CharacterCard
          v-for="character in characters"
          :key="character.name"
          :character="character"
          link-to="/mountains"
        />
      </div>
    </section>
  </q-page>
</template>

<style scoped>
.hero-image {
  min-height: 100vh;
}

.bg-overlay {
  background: rgba(8, 11, 16, 0.44);
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20vh;
}

.hero-copy {
  max-width: 760px;
  padding: 0 20px;
}

.eyebrow {
  margin: 0 0 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.74rem;
  opacity: 0.82;
}

.eyebrow.dark {
  color: #4b5d68;
}

.hero-subtitle {
  max-width: 520px;
  margin: 0 auto 1.5rem;
  color: rgba(255, 255, 255, 0.88);
}

.cta-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.scroll-indicator {
  margin-top: 3rem;
  cursor: pointer;
  opacity: 0.9;
}

.section {
  padding: 88px 20px;
}

.about-section {
  background: #f7f3ee;
}

.about-copy {
  max-width: 760px;
  margin: 0 auto 1.5rem;
  line-height: 1.8;
  color: #44515d;
}

.mountains-section {
  background: linear-gradient(180deg, #f4efe8 0%, #eef2ef 100%);
}

.section-header {
  margin-bottom: 32px;
}

.mountains-grid,
.characters-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}

.mountains-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.characters-section {
  background: #f4f9f5;
}

.characters-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

@media (max-width: 680px) {
  .hero-content {
    padding-top: 18vh;
  }

  .cta-row {
    flex-direction: column;
  }

  .section {
    padding: 72px 16px;
  }
}
</style>

<script setup>
import ActionButton from '../components/ActionButton.vue'
import CharacterCard from '../components/CharacterCard.vue'
import MountainCard from '../components/MountainCard.vue'
import mountains from '../data/mountains'

const featuredMountains = mountains.slice(0, 3)

const characters = [
  {
    name: 'Hinata',
    role: 'Trail scout',
    image: 'https://www.yamanosusume.com/img/character/hinata/thum_hinata_01.jpg',
    bio: 'Constantly planning the next scenic route and looking for the best view points.',
  },
  {
    name: 'Aoi',
    role: 'Camp planner',
    image: 'https://www.yamanosusume.com/img/character/aoi/thum_aoi_01.jpg',
    bio: 'Keeps the group organized and always ready with warm drinks and snacks.',
  },
  {
    name: 'Yui',
    role: 'Nature lover',
    image: 'https://www.yamanosusume.com/img/character/yui/thum_yui_01.jpg',
    bio: 'Observes the smallest details of wildflowers, clouds, and mountain light.',
  },
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
