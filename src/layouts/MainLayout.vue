<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-surface shadow-2">
      <q-toolbar class="q-px-md q-py-sm">
        <ActionButton variant="nav" to="/" class="brand-button q-pt-none q-pb-none">
          <div class="row items-center no-wrap">
            <q-img
              src="https://www.yamanosusume.com/img/character/hinata/thum_hinata_01.jpg"
              style="width: 3.2rem; height: 3.2rem; border-radius: 50%;"
              fit="cover"
              no-spinner
              fetchpriority="high"
            />
            <q-toolbar-title shrink class="q-ml-sm brand-title">
              KuraueDB
            </q-toolbar-title>
          </div>
        </ActionButton>

        <q-space />

        <ActionButton variant="nav" label="Home" to="/" />
        <ActionButton variant="nav" label="Mountains" to="/mountains" />
      </q-toolbar>
    </q-header>

    <q-page-container class="page-shell">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ActionButton from '../components/ActionButton.vue'
</script>

<style scoped>
.bg-surface {
  background: rgba(16, 20, 24, 0.94);
  backdrop-filter: blur(12px);
}

.brand-button {
  color: #f5f7ff !important;
  padding-inline: 0.4rem;
}

.brand-title {
  color: #f5f7ff;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.q-toolbar {
  min-height: 72px;
}

.page-shell {
  position: relative;
}
</style>
