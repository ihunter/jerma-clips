<template>
  <v-card>
    <v-responsive :aspect-ratio="30 / 17">
      <v-skeleton-loader type="image" />
    </v-responsive>
    <section class="d-flex">
      <v-skeleton-loader width="52" height="72" type="image" />
      <v-skeleton-loader width="100%" height="72" type="list-item-three-line" />
    </section>
  </v-card>
</template>
