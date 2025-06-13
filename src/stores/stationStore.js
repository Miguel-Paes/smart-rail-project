// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useStationStore = defineStore('station', () => {

  const stations = ref([
    { id: 1, name: 'Estação Central' },
    { id: 2, name: 'Estação Norte' },
    { id: 3, name: 'Estação Sul' },
    { id: 4, name: 'Estação Leste' },
    { id: 5, name: 'Estação Oeste' },
  ]);

  const userLocation = ref({
    cep: '',
    number: '',
    departureTime: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const stationId = ref(null);
  const stationLines = ref(null)
  const selectedLine = ref(null)

  function getStationLines(stationId) {
    stationLines.value = allLines.value.find(station => station.id == stationId)
    stationLines.value = stationLines.value.lines
  }

  function getSelectedLine(id) {
    const index = stationLines.value.find(s => s.id === id)
    selectedLine.value = { ...index }
  }

  function selectStationInRoutes(id) {
    getSelectedLine(id)
    getStationLines(id)
  }

  const allLines = ref([
    {
      id: 1,
      lines: [
        { id: 1, name: 'Linha A', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 2, name: 'Linha B', stop: 'Estação Sul', finalDestination: 'Estação Sul', driver: '', justification: '' },
        { id: 3, name: 'Linha C', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
      ],
    },

    {
      id: 2,
      lines: [
        { id: 1, name: 'Linha D', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 2, name: 'Linha E', stop: 'Estação Sul', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 3, name: 'Linha F', stop: 'Estação Oeste', finalDestination: 'Estação Central', driver: '', justification: '' },
      ],
    },

    {
      id: 3,
      lines: [
        { id: 1, name: 'Linha G', stop: 'Estação Central', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 2, name: 'Linha H', stop: 'Estação Oeste', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 3, name: 'Linha I', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: '', justification: '' },
      ],
    },

    {
      id: 4,
      lines: [
        { id: 1, name: 'Linha J', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 2, name: 'Linha K', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: '', justification: '' },
        { id: 3, name: 'Linha L', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: '', justification: '' },
      ],
    },

    {
      id: 5,
      lines: [
        { id: 1, name: 'Linha M', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: '', justification: '' },
        { id: 2, name: 'Linha N', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: '', justification: '' },
        { id: 3, name: 'Linha O', stop: 'Estação Norte', finalDestination: 'Estação Sul', driver: '', justification: '' },
      ],
    },
  ])
  return { stations, userLocation, stationLines, getStationLines, stationId, getSelectedLine, selectedLine, selectStationInRoutes }
})
