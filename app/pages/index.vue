<script setup lang="ts">
const { clipsLimit } = useRuntimeConfig().public
const { query, updateQuery } = useQueryBuilder()
const { y } = useWindowScroll({ behavior: 'smooth' })

function setPage(page: number) {
  y.value = 0
  updateQuery({ page: page.toString() })
}

const { data, pending } = await useFetch<ClipResponse>('/api/clips', {
  query,
  key: JSON.stringify(query.value),
  default() {
    return {
      docs: [],
      totalDocs: 0,
      offset: 0,
      limit: clipsLimit,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  },
})

const totalPages = computed(() => {
  return data.value.totalPages
})

const hasClips = computed(() => {
  return data.value.docs.length > 0
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

    <v-row v-if="pending">
      <v-col v-for="(_, index) in query.limit" :key="index" cols="12" sm="6" md="4" xl="3">
        <ClipCardSkeleton />
      </v-col>
    </v-row>

    <v-row v-else-if="hasClips">
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

    <v-row v-else-if="!hasClips">
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
        <ClientOnly>
          <v-pagination
            v-model="query.page"
            :length="totalPages"
            variant="tonal"
            color="primary"
            @update:model-value="setPage"
          />
        </ClientOnly>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SiteFooter />
      </v-col>
    </v-row>
  </v-container>
</template>
