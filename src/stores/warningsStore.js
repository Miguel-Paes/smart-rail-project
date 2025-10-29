import { defineStore } from 'pinia'
import { ref } from 'vue';

import createWarningFromStore from '../service/warning.js';
import { create } from 'node_modules/axios/index.cjs';

export const useWarningStore = defineStore('warnings', () => {

  const state = ref({
    warnings: createWarningFromStore.getWarnings(),
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

  const newWarning = { ...state.defaultWarning.value }

  const types = { ...state.warningTypes.value }

  const addWarning

  const removeWarning

  return { warnings, defaultWarning, removeWarning, warningTypes }
})
