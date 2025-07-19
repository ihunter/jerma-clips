<script setup lang="ts">
import type { ClipResponse } from '~/types'

defineOgImageComponent('NuxtSeo', {
  title: 'Jerma Clip Search',
  description: 'Search for twitch clips of Jerma985 by title, game, and date.',
  theme: '#0AFC9E',
  colorMode: 'dark',
})

const { updateQuery, query } = useQueryBuilder()

function setPage(page: number) {
  updateQuery({ page })
}

const { data, status } = await useFetch<ClipResponse>('/api/clips', {
  query,
})

const totalPages = data.value.totalPages

const clipsFound = computed(() => {
  return data.value != null && data.value.docs.length
})

const dayjs = useDayjs()
const timezoneStore = useTimezoneStore()

onMounted(() => {
  timezoneStore.userTimezone = dayjs.tz.guess()
})
</script>

<template>
  <v-container max-width="1600">
    <v-row>
      <v-col class="d-flex">
        <SearchInput />
        <v-btn-group
          tile
          divided
          variant="elevated"
          class="h-100 ml-4"
        >
          <FiltersDialog />

          <SearchSort />
        </v-btn-group>
      </v-col>
    </v-row>

    <v-row v-if="status === 'pending'">
      <v-col v-for="(_, index) in query.limit" :key="index" cols="12" sm="6" md="4" xl="3">
        <ClipCardSkeleton />
      </v-col>
    </v-row>

    <v-row v-else-if="clipsFound">
      <v-col v-for="clip in data.docs" :key="clip.id" cols="12" sm="6" md="4" xl="3">
        <ClipCard
          :id="clip.id"
          :url="clip.url"
          :title="clip.title"
          :view-count="clip.view_count"
          :broadcaster-id="clip.broadcaster_id"
          :broadcaster-name="clip.broadcaster_name"
          :creator-name="clip.creator_name"
          :thumbnail-url="clip.thumbnail_url"
          :duration="clip.duration"
          :game-id="clip.game?.id"
          :game-name="clip.game?.name"
          :game-box-art-url="clip.game?.box_art_url"
          :created-at="clip.created_at"
        />
      </v-col>
    </v-row>

    <v-row v-else-if="!clipsFound">
      <v-col class="d-flex flex-column justify-center text-center ga-8">
        <h1 class="text-h1">
          No Clips Found
        </h1>
        <v-img src="~/assets/images/firedman.png" height="200" />
        <h3 class="text-h3">
          No clips found matching this criteria
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination
          v-model="query.page"
          :length="totalPages"
          variant="tonal"
          color="primary"
          @update:model-value="setPage"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SiteFooter />
      </v-col>
    </v-row>
  </v-container>
</template>
