<template>
  <router-link :to="linkTo" class="card-link">
    <article class="mountain-card">
      <div class="card-image">
        <img class="card-photo" :src="mountain.image" :alt="`${mountain.name} mountain landscape`" />
        <div class="image-scrim" aria-hidden="true" />
        <span class="region-tag">{{ mountain.region }}</span>
        <span class="elevation-tag">{{ mountain.elevation }}</span>
      </div>

      <div class="card-content">
        <div class="title-row">
          <div>
            <h2>{{ mountain.name }}</h2>
            <p class="japanese-name">{{ mountain.japaneseName }}</p>
          </div>
          <q-icon name="north_east" size="20px" class="card-arrow" aria-hidden="true" />
        </div>

        <p class="summary">{{ mountain.summary }}</p>

        <div class="card-footer">
          <span class="difficulty">{{ mountain.difficulty }}</span>
          <span class="episodes" :title="mountain.episodes">{{ mountain.episodes }}</span>
        </div>
      </div>
    </article>
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
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.mountain-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(40, 79, 59, 0.1);
  border-radius: 22px;
  background: #fbfaf7;
  box-shadow: 0 12px 34px rgba(35, 56, 42, 0.07);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}

.card-link:hover .mountain-card,
.card-link:focus-visible .mountain-card {
  transform: translateY(-5px);
  border-color: rgba(40, 79, 59, 0.24);
  box-shadow: 0 20px 42px rgba(35, 56, 42, 0.13);
}

.card-link:focus-visible {
  outline: 3px solid #63876d;
  outline-offset: 4px;
  border-radius: 24px;
}

.card-image {
  position: relative;
  height: 218px;
  overflow: hidden;
  background: #d4ddd3;
}

.card-photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.image-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(17, 31, 22, 0.18), transparent 38%, rgba(17, 31, 22, 0.24));
  pointer-events: none;
}

.region-tag,
.elevation-tag {
  position: absolute;
  z-index: 1;
  top: 14px;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
  background: rgba(27, 48, 35, 0.45);
  color: #fff;
  font-size: 0.67rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.region-tag {
  left: 14px;
}

.elevation-tag {
  right: 14px;
}

.card-content {
  display: flex;
  flex-direction: column;
  min-height: 214px;
  padding: 19px 20px 17px;
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.title-row h2 {
  margin: 0;
  color: #284f3b;
  font-size: 1.32rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
  font-weight: 750;
}

.japanese-name {
  margin: 4px 0 0;
  color: #88928a;
  font-size: 0.8rem;
  line-height: 1.3;
}

.card-arrow {
  flex: 0 0 auto;
  color: #66816d;
  transition: transform 0.2s ease;
}

.card-link:hover .card-arrow,
.card-link:focus-visible .card-arrow {
  transform: translate(2px, -2px);
}

.summary {
  display: -webkit-box;
  overflow: hidden;
  margin: 13px 0 17px;
  color: #647168;
  font-size: 0.85rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(40, 79, 59, 0.11);
}

.difficulty {
  flex: 0 0 auto;
  color: #54735c;
  font-size: 0.72rem;
  font-weight: 700;
}

.episodes {
  overflow: hidden;
  color: #929b93;
  font-size: 0.68rem;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .card-image {
    height: auto;
    aspect-ratio: 16 / 9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mountain-card,
  .card-arrow {
    transition: none;
  }
}
</style>
