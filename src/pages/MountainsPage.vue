<template>
  <q-page class="mountains-page">
    <div class="page-hero">
      <div class="hero-overlay" />
      <div class="hero-content">
        <p class="eyebrow">Mountain journal</p>
        <h1>Explore the peaks</h1>
        <p>
          Discover the climbs and trails that shaped each trip through the mountains of Yama no Susume.
        </p>
      </div>
    </div>

    <div class="mountains-grid">
      <MountainCard
        v-for="mountain in mountains"
        :key="mountain.slug"
        :mountain="mountain"
        :link-to="`/mountains/${mountain.slug}`"
      />
    </div>
  </q-page>
</template>

<script setup>
import MountainCard from '../components/MountainCard.vue'
import mountains from '../data/mountains'
</script>

<style scoped>
.mountains-page {
  background: #f4efe8;
  min-height: calc(100vh - 72px);
}

.page-hero {
  position: relative;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(180deg, rgba(10, 13, 18, 0.25), rgba(10, 13, 18, 0.7)),
    url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 14, 17, 0.18);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  text-align: center;
  color: #fff;
}

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
}

.hero-content h1 {
  margin: 0;
  font-size: clamp(2.3rem, 6vw, 4rem);
  line-height: 1.05;
  font-weight: 800;
}

.hero-content p:last-child {
  margin: 1rem auto 0;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.05rem;
}

.mountains-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 20px 72px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
</style>
