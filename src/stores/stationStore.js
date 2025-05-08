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

  function getStationLines(stationId) {
    stationLines.value = allLines.value.find(station => station.id == stationId)
    stationLines.value = stationLines.value.lines
    console.log(stationLines.value)
    console.log('Funcionou!')
  }

  const allLines = ref([
    {
      id: 1,
      lines: [
        { id: 1, name: 'Linha A' },
        { id: 2, name: 'Linha B' },
        { id: 3, name: 'Linha C' },
      ],
    },

    {
      id: 2,
      lines: [
        { id: 1, name: 'Linha D' },
        { id: 2, name: 'Linha E' },
        { id: 3, name: 'Linha F' },
      ],
    },

    {
      id: 3,
      lines: [
        { id: 1, name: 'Linha G' },
        { id: 2, name: 'Linha H' },
        { id: 3, name: 'Linha I' },
      ],
    },

    {
      id: 4,
      lines: [
        { id: 1, name: 'Linha J' },
        { id: 2, name: 'Linha K' },
        { id: 3, name: 'Linha L' },
      ],
    },

    {
      id: 5,
      lines: [
        { id: 1, name: 'Linha M' },
        { id: 2, name: 'Linha N' },
        { id: 3, name: 'Linha O' },
      ],
    },
  ])
  return { stations, userLocation, stationLines, getStationLines, stationId }
})
