import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrainStore = defineStore('train', () => {

  const trains = ref([
    {
      id: 1,
      line: 1,
      trainCode: 'T001',
      status: 'operando - movimento',
      lastMaintance: '2025-01-09',
      nextMaintance: '2025-07-09',
    },
    {
      id: 2,
      line: 2,
      trainCode: 'T002',
      status: 'operando - parado',
      lastMaintance: '2024-12-09',
      nextMaintance: '2025-06-09',
    },
    {
      id: 3,
      line: 3,
      trainCode: 'T003',
      status: 'manutenção',
      lastMaintance: '2024-12-30',
      nextMaintance: '2025-06-30',
    },
    {
      id: 4,
      line: 0,
      trainCode: 'T004',
      status: 'estacionado',
      lastMaintance: '2025-02-30',
      nextMaintance: '2025-08-30',
    },
  ])

  const operatingTrains = ref([])
  const inoperativeTrains = ref([])
  const inMaintenanceTrains = ref([])

  const defaultTrain = {
    id: 0,
    line: 0,
    trainCode: '',
    status: '',
    lastMaintance: '',
    nextMaintance: '',
  }

  const getOperatingTrains = () => {
    return operatingTrains.value = trains.value.find(train => train.status.includes('operando'))
  }

  const getInoperativeTrains = () => {
    return inoperativeTrains.value = trains.value.find(train => train.status.includes('estacionado') || train.status.includes('manutenção'))
  }

  const getInMaintenanceTrains = () => {
    return inMaintenanceTrains.value = trains.value.find(train => train.status.includes('manutenção'))
  }

  const addNewTrain = (newTrain) => {
    const train = { ...defaultTrain }
    train.id = trains.value.length + 1
    train.line = newTrain.line || 0
    train.trainCode = newTrain.trainCode || 'T' + (trains.value.length + 1).toString().padStart(3, '0')
    train.status = newTrain.status || 'Estacionado'
    train.lastMaintance = newTrain.lastMaintance || new Date().toISOString().split('T')[0]
    train.nextMaintance = newTrain.nextMaintance || new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0]
  }

  return { operatingTrains, inoperativeTrains, inMaintenanceTrains, getOperatingTrains, getInoperativeTrains, getInMaintenanceTrains, addNewTrain }
})
