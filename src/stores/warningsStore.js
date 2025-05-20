import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useWarningStore = defineStore('warnings', () => {

  const warnings = ref([])

  const defaultWarning = ref({
    id: null,
    message: null,
    type: null,
    duration: {
      start: null,
      end: null,
    },
    station: null,
    isFromUser: false,
  })

  const stationWarnings = ref([])

  function addStationWarning(stationId) {
    stationWarnings.value = warnings.value.filter(warning => {
      warning.station = stationId

      return warning
    })
  }

  const warningID = ref(1)

  function addWarning(warning) {
    if (warning.id === null) {
      warning.id = warningID.value
      warningID.value += 1
    }

    if (warning.type === null) {
      warning.type = 'info'
    }

    if (warning.duration === null) {
      warning.duration = 5000
    }

    warnings.value.push(warning)
  }

  function removeWarning(id) {
    const removedWarning = warnings.value.find(warning => warning.id === id)
    if (removedWarning) {
      warnings.value.splice(warnings.value.indexOf(removedWarning), 1)
    }
    return removedWarning
  }

  return { warnings, defaultWarning, addWarning, removeWarning, stationWarnings, addStationWarning }
})
