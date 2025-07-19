export const useTimezoneStore = defineStore(
  'timezone',
  () => {
    const userTimezone = ref('America/New_York')

    return { userTimezone }
  },
  { persist: true },
)
