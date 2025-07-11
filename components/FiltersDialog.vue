<script setup lang="ts">
import { useDisplay } from 'vuetify'

const showFilterDialog = ref(false)
const { smAndDown } = useDisplay()
</script>

<template>
  <v-btn icon="mdi-filter-variant" aria-label="Filters" @click="showFilterDialog = true" />

  <v-dialog v-model="showFilterDialog" :fullscreen="smAndDown" max-width="800">
    <v-card>
      <v-card-title class="bg-secondary text-primary">
        <div class="d-flex justify-space-between align-center">
          <h1>Filters</h1>
          <v-btn icon="mdi-close" color="primary" variant="tonal" @click="showFilterDialog = false" />
        </div>
      </v-card-title>

      <v-form class="py-4">
        <v-container>
          <v-row class="px-4">
            <v-col>
              <GameFilter />
            </v-col>
          </v-row>

          <v-row class="px-4">
            <v-col>
              <CreatorFilter />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <StartDateFilter />
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <EndDateFilter />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
