<template>
  <router-link :to="linkTo" class="card-link">
    <q-card
      flat
      class="mountain-card"
      :style="{
        backgroundImage: `linear-gradient(180deg, rgba(7, 10, 14, 0.2), rgba(7, 10, 14, 0.78)), url(${mountain.image})`,
      }"
    >
      <div class="card-content">
        <div class="meta-row" v-if="mountain.region || mountain.bestSeason">
          <span class="tag" v-if="mountain.region">{{ mountain.region }}</span>
          <span class="tag muted" v-if="mountain.bestSeason">{{ mountain.bestSeason }}</span>
        </div>

        <h2>{{ mountain.name }}</h2>
        <p>{{ mountain.summary }}</p>
      </div>
    </q-card>
  </router-link>
</template>

<script setup>
defineProps({
  mountain: {
    type: Object,
    required: true,
  },
  linkTo: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, filter 0.25s ease;
}

.card-link:hover,
.card-link:focus-visible {
  transform: translateY(-8px);
  filter: saturate(1.05);
}

.mountain-card {
  min-height: 420px;
  overflow: hidden;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 24px 60px rgba(17, 22, 28, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card-link:hover .mountain-card,
.card-link:focus-visible .mountain-card {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 32px 70px rgba(17, 22, 28, 0.22);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 420px;
  padding: 24px;
  background: linear-gradient(180deg, rgba(10, 13, 18, 0.08), rgba(10, 13, 18, 0.9));
  color: #fff;
}

.meta-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tag.muted {
  background: rgba(27, 73, 52, 0.36);
}

.card-content h2 {
  margin: 0;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 800;
}

.card-content p {
  margin: 0.8rem 0 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  min-height: 72px;
}
</style>
