import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useWarningStore = defineStore('warnings', () => {

  const warnings = ref([])

  const warningID = ref(1)

  const defaultWarning = ref({
    id: warningID.value,
    message: 'A',
    notificationType: ['TESTE'],
    duration: {
      start: '',
      end: '',
    },
    station: '',
    isFromUser: false,
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

  function addWarning(warning) {
    warnings.value.push(warning)
    warningID.value += 1
  }

  function removeWarning(id) {
    const removedWarning = warnings.value.find(warning => warning.id === id)
    if (removedWarning) {
      warnings.value.splice(warnings.value.indexOf(removedWarning), 1)
    }
    return removedWarning
  }

  return { warnings, defaultWarning, addWarning, removeWarning, stationWarnings, addStationWarning, warningTypes }
})
