import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import WarningService from '../service/warning.js'

export const useWarningStore = defineStore('warnings', () => {
  const warnings = ref([])
  const loading = ref(false)

  const newWarning = reactive({
    id: -1,
    message: '',
    notificationType: [],
    duration: {
      start: '',
      end: '',
    },
    station: null,
    from_user: true,
  })

  const warningTypes = ref([
    'Cancelamento', 'Acidente', 'Interdição', 'Desvio', 'Atraso',
    'Informação', 'Alerta', 'Manutenção', 'Recomendação',
    'Mudança de Horário', 'Mudança de Plataforma',
    'Mudança de Linha', 'Mudança de Trem',
  ])

  const addWarning = async () => {
    loading.value = true
    try {
      await WarningService.addWarning(newWarning)
      resetNewWarning()
    } catch (error) {
      console.error('Erro ao adicionar warning:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getWarning = async () => {
    loading.value = true;
    try {
      await WarningService.fetchWarnings();
      console.log(warnings.value);
    } catch (error) {
      console.error('Erro ao buscar warnings:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const resetNewWarning = () => {
    Object.assign(newWarning, {
      id: -1,
      message: '',
      notificationType: [],
      duration: { start: '', end: '' },
      station: null,
      from_user: true,
    })
  }

  const removeWarning = (id) => {
    warnings.value = warnings.value.filter(warning => warning.id !== id);
  }

  const deleteWarning = async (warningId) => {
    loading.value = true;
    try {
      await WarningService.removeWarning();
    } catch (error) {
      console.error('Erro ao deletar warnings:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    warnings,
    newWarning,
    warningTypes,
    loading,
    addWarning,
    resetNewWarning,
    getWarning,
    removeWarning,
    deleteWarning,
  }
})