import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useWarningStore = defineStore('warnings', () => {

  const warnings = ref([])

  const warningID = ref(1)

  const defaultWarning = ref({
    id: warningID.value,
    message: '',
    notificationType: [],
    duration: {
      start: '',
      end: '',
    },
    station: '',
    from_user: true,
  })

  const warningTypes = ref([
    'Cancelamento', 'Acidente', 'Interdição', 'Desvio', 'Atraso', 'Informação', 'Alerta', 'Manutenção', 'Recomendação', 'Mudança de Horário', 'Mudança de Plataforma', 'Mudança de Linha', 'Mudança de Trem',
  ])

  const stationWarnings = ref([])

  function addStationWarning(stationId) {
    stationWarnings.value = warnings.value.filter(warning => {
      warning.station = stationId

      return warning
    })
  }

  function removeWarning(id) {
    const removedWarning = warnings.value.find(warning => warning.id === id)
    if (removedWarning) {
      warnings.value.splice(warnings.value.indexOf(removedWarning), 1)
    }
    return removedWarning
  }

  return { warnings, defaultWarning, removeWarning, stationWarnings, addStationWarning, warningTypes }
})
