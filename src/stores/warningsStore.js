import { defineStore } from 'pinia'
import { ref } from 'vue';

import WarningService from '../service/warning.js';

export const useWarningStore = defineStore('warnings', () => {

  const state = ref({
    warnings: [],
    defaultWarning: {
      id: -1,
      message: '',
      notificationType: [],
      duration: {
        start: '',
        end: '',
      },
      from_user: true,
    },
    warningTypes: [
      'Cancelamento', 'Acidente', 'Interdição', 'Desvio', 'Atraso', 'Informação', 'Alerta', 'Manutenção', 'Recomendação', 'Mudança de Horário', 'Mudança de Plataforma', 'Mudança de Linha', 'Mudança de Trem',
    ]
  })

  const warnings = state.value.warnings

  const newWarning = { ...state.value.defaultWarning }

  const types = { ...state.value.warningTypes }

  // const addWarning

  // const removeWarning

  return { warnings, newWarning, types }
})
