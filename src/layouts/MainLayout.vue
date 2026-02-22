<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-primary text-grey-9 q-px-sm-xl">
        <q-btn flat no-caps class="q-pt-none q-pb-none">
          <div class="row items-center no-wrap">
            <q-img 
              src="https://www.yamanosusume.com/img/character/hinata/thum_hinata_01.jpg"
              style="width: 5em; height: 4.5em;"
              fit="cover"
              no-spinner
              fetchpriority="high"
            />
            <q-toolbar-title shrink class="q-ml-sm gt-sm">
              KuraueDB
            </q-toolbar-title>
          </div>
        </q-btn>
        <q-space />
        <q-btn flat no-caps>About</q-btn>
        <q-btn flat no-caps>Mountains</q-btn>
        <q-btn flat no-caps>Characters</q-btn>
      </q-toolbar>
    </q-header>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>

</template>

<script setup>


</script>
