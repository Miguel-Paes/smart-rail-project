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
  const currentStation = ref(null)
  const selectedLine = ref(null)

  function getStationLines(stationId) {
    stationLines.value = allLines.value.find(station => station.id == stationId)
    stationLines.value = stationLines.value.lines
    console.log(stationLines.value)
    console.log('Funcionou!')
  }

  function getSelectedLine(name) {
    selectedLine.value = stationLines.value.filter(s => s.name === name)
  }

  const allLines = ref([
    {
      id: 1,
      lines: [
        { id: 1, name: 'Linha A', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: null },
        { id: 2, name: 'Linha B', stop: 'Estação Sul', finalDestination: 'Estação Sul', driver: null },
        { id: 3, name: 'Linha C', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: null },
      ],
    },

    {
      id: 2,
      lines: [
        { id: 1, name: 'Linha D', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: null },
        { id: 2, name: 'Linha E', stop: 'Estação Sul', finalDestination: 'Estação Oeste', driver: null },
        { id: 3, name: 'Linha F', stop: 'Estação Oeste', finalDestination: 'Estação Central', driver: null },
      ],
    },

    {
      id: 3,
      lines: [
        { id: 1, name: 'Linha G', stop: 'Estação Central', finalDestination: 'Estação Norte', driver: null },
        { id: 2, name: 'Linha H', stop: 'Estação Oeste', finalDestination: 'Estação Leste', driver: null },
        { id: 3, name: 'Linha I', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: null },
      ],
    },

    {
      id: 4,
      lines: [
        { id: 1, name: 'Linha J', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: null },
        { id: 2, name: 'Linha K', stop: 'Estação Central', finalDestination: 'Estação Oeste', driver: null },
        { id: 3, name: 'Linha L', stop: 'Estação Norte', finalDestination: 'Estação Oeste', driver: null },
      ],
    },

    {
      id: 5,
      lines: [
        { id: 1, name: 'Linha M', stop: 'Estação Central', finalDestination: 'Estação Leste', driver: null },
        { id: 2, name: 'Linha N', stop: 'Estação Sul', finalDestination: 'Estação Norte', driver: null },
        { id: 3, name: 'Linha O', stop: 'Estação Norte', finalDestination: 'Estação Sul', driver: null },
      ],
    },
  ])
  return { stations, userLocation, stationLines, getStationLines, stationId, getSelectedLine, selectedLine }
})
