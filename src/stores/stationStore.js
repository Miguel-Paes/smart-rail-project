// Utilities
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue';

import StationService from '../service/station.js'

export const useStationStore = defineStore('station', () => {
  const loading = ref(false)
  const stations = ref([]);

  const userLocation = ref({
    cep: '',
    number: '',
    departureTime: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const currentStation = ref(null);
  const stationId = ref(null);
  const stationLines = ref(null);
  const selectedLine = ref(null);

  const getStation = async () => {
    loading.value = true;
    try {
      await StationService.fetchStations();
      console.log(stations.value);
    } catch (error) {
      console.error('Erro ao buscar stations:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  function getStationLines(stationId) {
    const station = allLines.value.find(station => station.id == stationId)
    stationLines.value = station?.lines || null
  }

  function getSelectedLine(id) {
    const index = stationLines.value?.find(s => s.id === id)
    selectedLine.value = { ...index }
  }

  function selectStationInRoutes(id) {
    getSelectedLine(id)
    getStationLines(id)
  }

  function deleteLine() {
    const index = stationLines.value.findIndex(line => line.id === selectedLine.value.id)
    console.log('Excluindo linha:')
    stationLines.value.splice(index, 1)
    selectedLine.value = null
  }

  function updateLine(updatedLine) {
    if (!selectedLine.value) {
      console.error('Nenhuma linha selecionada para atualizar.')
      return
    }
    const index = stationLines.value.findIndex(line => line.id === selectedLine.value.id)

    stationLines.value[index] = { ...selectedLine.value }
    console.log('Linha atualizada:', selectedLine.value)
  }

  const allLines = ref([
    {
      id: 1,
      lines: [
        { id: 11, name: 'Linha A', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 12, name: 'Linha B', stop: 'Estação Sul', finalDestination: 'Estação Sul', driver: '', justification: '' },
        { id: 13, name: 'Linha C', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
      ],
    },

    {
      id: 2,
      lines: [
        { id: 21, name: 'Linha D', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 22, name: 'Linha E', stop: 'Estação Sul', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 23, name: 'Linha F', stop: 'Estação Oeste', finalDestination: 'Estação Central', driver: '', justification: '' },
      ],
    },

    {
      id: 3,
      lines: [
        { id: 31, name: 'Linha G', stop: 'Estação Central', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 32, name: 'Linha H', stop: 'Estação Oeste', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 33, name: 'Linha I', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: '', justification: '' },
      ],
    },

    {
      id: 4,
      lines: [
        { id: 41, name: 'Linha J', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 42, name: 'Linha K', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 43, name: 'Linha L', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: '', justification: '' },
      ],
    },

    {
      id: 5,
      lines: [
        { id: 51, name: 'Linha M', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 52, name: 'Linha N', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 53, name: 'Linha O', stop: 'Estação Norte', finalDestination: 'Estação Sul', driver: '', justification: '' },
      ],
    },
  ])

  onMounted(() => {
    getStation();
  });

  return {
    currentStation,
    stations,
    userLocation,
    stationLines,
    stationId,
    selectedLine,
    getStationLines,
    getSelectedLine,
    selectStationInRoutes,
    deleteLine,
    updateLine,
  }
})
