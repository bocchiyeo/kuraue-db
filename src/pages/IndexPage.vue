<template>
  <q-page class="home-page">
    <section class="hero" aria-labelledby="home-title">
      <div class="hero-content">
        <p class="eyebrow"><q-icon name="landscape" size="16px" /> Yama no Susume</p>
        <h1 id="home-title">Welcome to<br />KuraueDB</h1>
        <p class="hero-description">
          Discover the mountains Hinata and her friends climbed
        </p>
        <div class="hero-actions">
          <router-link class="hero-link hero-link-primary" to="/mountains">
            Browse the archive
            <q-icon name="north_east" size="17px" />
          </router-link>
          <router-link class="hero-link" :to="{ path: '/', hash: '#featured-mountains' }">
            Find your first trail
            <q-icon name="south" size="17px" />
          </router-link>
        </div>
      </div>
      <p class="hero-caption">A fan-made mountain guide</p>
    </section>

    <section id="featured-mountains" class="featured-section" aria-labelledby="featured-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">The archive · {{ mountains.length }} mountains</p>
          <h2 id="featured-title">A few places to begin</h2>
        </div>
      </div>

      <div class="mountains-grid">
        <MountainCard
          v-for="mountain in featuredMountains"
          :key="mountain.slug"
          :mountain="mountain"
          :link-to="`/mountains/${mountain.slug}`"
        />
      </div>

      <div class="archive-cta">
        <p>Want to see more? Explore all {{ mountains.length }} mountains in the archive.</p>
        <router-link class="archive-button" to="/mountains">
          Browse all mountains
          <q-icon name="north_east" size="17px" />
        </router-link>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import MountainCard from '../components/MountainCard.vue'
import mountains from '../data/mountains'

const featuredMountains = mountains.slice(0, 3)
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: clamp(560px, calc(100svh - 72px), 820px);
  align-items: center;
  overflow: hidden;
  padding: 80px max(7vw, calc((100vw - 1200px) / 2));
  background-color: #283b30;
  background-image:
    linear-gradient(90deg, rgba(16, 29, 21, 0.82) 0%, rgba(16, 29, 21, 0.56) 47%, rgba(16, 29, 21, 0.08) 100%),
    linear-gradient(0deg, rgba(16, 29, 21, 0.34), transparent 45%),
    url('https://images.alphacoders.com/761/761908.jpg');
  background-position: center;
  background-size: cover;
  color: #fff;
}

.hero-content {
  width: min(700px, 100%);
  padding: 24px 0 40px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 22px;
  color: #e6d39e;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  font-size: clamp(3.4rem, 8vw, 6.8rem);
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.98;
}

.hero-description {
  max-width: 520px;
  margin: 24px 0 30px;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1rem, 1.7vw, 1.18rem);
  line-height: 1.75;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.hero-link {
  padding: 13px 18px;
  border: 1px solid rgba(255, 255, 255, 0.66);
  border-radius: 999px;
  color: #fff;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.hero-link-primary {
  border-color: #e6d39e;
  background: #e6d39e;
  color: #284f3b;
}

.hero-link:hover,
.hero-link:focus-visible {
  transform: translateY(-2px);
  background: #fff;
  color: #284f3b;
}

.hero-link-primary:hover,
.hero-link-primary:focus-visible {
  border-color: #fff;
}

.hero-caption {
  position: absolute;
  right: max(7vw, calc((100vw - 1200px) / 2));
  bottom: 24px;
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.featured-section {
  padding: 84px max(7vw, calc((100vw - 1200px) / 2)) 100px;
  background: linear-gradient(180deg, #f4efe8 0%, #eef2ef 100%);
}

.section-heading {
  margin-bottom: 30px;
}

.eyebrow.dark {
  margin-bottom: 10px;
  color: #65806c;
}

.section-heading h2 {
  margin: 0;
  color: #284f3b;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  letter-spacing: -0.055em;
  line-height: 1.1;
}

.mountains-grid {
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.archive-cta {
  display: flex;
  max-width: 1200px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 36px auto 0;
  padding: 24px 28px;
  border: 1px solid rgba(40, 79, 59, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
}

.archive-cta p {
  margin: 0;
  color: #3f5949;
  font-size: 0.95rem;
  line-height: 1.6;
}

.archive-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  border: 1px solid #284f3b;
  border-radius: 999px;
  background: #284f3b;
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.archive-button:hover,
.archive-button:focus-visible {
  transform: translateY(-2px);
  border-color: #426e50;
  background: #426e50;
}

@media (max-width: 900px) {
  .mountains-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: min(720px, max(590px, calc(100svh - 72px)));
    align-items: flex-end;
    padding: 60px 24px 100px;
    background-position: 57% center;
    background-image:
      linear-gradient(90deg, rgba(16, 29, 21, 0.63), rgba(16, 29, 21, 0.12)),
      linear-gradient(0deg, rgba(16, 29, 21, 0.78), rgba(16, 29, 21, 0.02) 90%),
      url('https://images.alphacoders.com/761/761908.jpg');
  }

  .hero-content {
    padding: 0;
  }

  .hero h1 {
    font-size: clamp(3.3rem, 15vw, 5rem);
  }

  .hero-description {
    max-width: 440px;
    margin: 18px 0 24px;
    font-size: 0.98rem;
  }

  .hero-caption {
    right: 24px;
    bottom: 18px;
    left: 24px;
    font-size: 0.64rem;
  }

  .featured-section {
    padding: 64px 18px 76px;
  }

  .archive-cta {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-top: 28px;
    padding: 20px;
  }

  .mountains-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-link,
  .archive-button {
    transition: none;
  }
}
</style>
