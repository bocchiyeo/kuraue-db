<template>
  <q-page class="no-padding">
    <q-img
      src="https://images.alphacoders.com/761/761908.jpg"
      class="window-height"
    >
      <!-- Dark overlay -->
      <div class="absolute-full bg-overlay" />

      <!-- Center content -->
      <div class="absolute-full flex column items-center text-white text-center" style="padding-top: 25vh;">
        <h1 class="text-h2 text-weight-bold q-mb-md">
          KuraueDB
        </h1>

        <p class="text-subtitle1 q-mb-lg">
          Explore the mountains of Yama no Susume
        </p>

        <div>
          <q-btn
            label="Explore Mountains"
            color="primary"
            text-color="grey-9"
            size="lg"
            class="q-mr-md"
          />
          <q-btn
            label="View Characters"
            outline
            color="white"
            size="lg"
          />
        </div>
        <q-icon name="keyboard_arrow_down" size="36px" class="q-mt-xl" />
      </div>
    </q-img>

    <section class="text-white q-py-xxl">
      <!-- About -->
      <div class="row justify-center">
        <div class="col-10 col-md-6 text-center">
          <h2 class="text-h4 text-weight-bold q-mb-md">
            What is KuraueDB?
          </h2>

          <p class="text-body1 q-mb-lg">
            KuraueDB is a fan-made Vue project that archives the mountains
            featured in Yama no Susume. Built to explore frontend design,
            component structure, and deployment with GitHub Pages.
          </p>

          <q-btn
            label="Learn More"
            color="primary"
            text-color="grey-9"
          />
        </div>
      </div>
    </section>

    <section class="text-grey-9 q-py-xxl">
      <!-- Mountains -->
    </section>

    <section class="text-grey-9 q-py-xxl">
      <!-- Characters -->
    </section>
  </q-page>
</template>

<style>
.bg-overlay {
  background: rgba(0, 0, 0, 0.4);
}
</style>

<script setup>

</script>
