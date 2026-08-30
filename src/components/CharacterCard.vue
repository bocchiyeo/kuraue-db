<template>
  <router-link :to="linkTo" class="card-link">
    <q-card flat class="character-card">
      <q-img :src="character.image" ratio="4/5" class="character-image" />
      <q-card-section>
        <h3>{{ character.name }}</h3>
        <p class="character-role">{{ character.role }}</p>
        <p>{{ character.bio }}</p>
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true,
  },
  linkTo: {
    type: String,
    default: '/mountains',
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
  filter: saturate(1.06);
}

.character-card {
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(17, 22, 28, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card-link:hover .character-card,
.card-link:focus-visible .character-card {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 26px 54px rgba(17, 22, 28, 0.14);
}

.character-image {
  min-height: 240px;
}

.character-card .q-card__section {
  padding: 20px 20px 24px;
}

.character-card h3 {
  margin: 0 0 0.7rem;
  font-size: 1.8rem;
  line-height: 1.15;
  font-weight: 700;
}

.character-role {
  margin: 0 0 0.6rem !important;
  color: #3e6e52 !important;
  font-weight: 600;
}

.character-card p {
  margin: 0;
  color: #42515d;
  line-height: 1.7;
}
</style>
