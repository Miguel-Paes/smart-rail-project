import Maintenance from '@/pages/maintenance.vue';
import { useStationStore } from '@/stores/stationStore.js';

import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'

export const useTrainStore = defineStore('train', () => {

  const stationStore = useStationStore();

  const date = new Date();
  const formattedDate = date.toLocaleDateString('pt-BR');

  const trains = ref([
    {
      id: 1,
      line: 31,
      trainCode: 'T001',
      status: 'operando - movimento',
      lastMaintance: '09-01-2025',
      nextMaintance: '09-07-2025',
    },
    {
      id: 2,
      line: 13,
      trainCode: 'T002',
      status: 'operando - parado',
      lastMaintance: '09-12-2024',
      nextMaintance: '09-06-2025',
    },
    {
      id: 3,
      line: 0,
      trainCode: 'T003',
      status: 'manutenção',
      lastMaintance: '12-30-2024',
      nextMaintance: '06-30-2025',
    },
    {
      id: 4,
      line: 0,
      trainCode: 'T004',
      status: 'estacionado',
      lastMaintance: '30-02-2025',
      nextMaintance: '30-08-2025',
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

  function formatDateBR(date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  const testDate = '07-30-2025';

  function compareDate(comparableDate) {
    const maintenanceMonth = new Date(comparableDate).getMonth();
    const constantMonth = new Date().getMonth();

    const maintenanceDate = new Date(comparableDate).getDate();
    const constantDate = new Date().getDate();

    if (constantMonth - maintenanceMonth <= 1 && constantMonth - maintenanceMonth >= 0)
      if ((constantMonth - maintenanceMonth == 1 && constantDate == maintenanceDate) || (constantMonth == maintenanceMonth)) {
        return 'next';
      }

    if ((constantMonth - maintenanceMonth < 0) || (constantMonth - maintenanceMonth == 0 && constantDate - maintenanceDate <= 0)) {
      return 'late';
    } else {
      return false;
    }
  }

  const getOperatingTrains = () => {
    return operatingTrains.value = trains.value.filter(train => train.status.includes('operando'))
  }

  const getInoperativeTrains = () => {
    return inoperativeTrains.value = trains.value.filter(train => train.status.includes('estacionado'))
  }

  const getInMaintenanceTrains = () => {
    return inMaintenanceTrains.value = trains.value.filter(train => train.status.includes('manutenção'))
  }

  const nextMaintanceTrains = computed(() => {
    return trains.value.filter(train =>
      compareDate(train.nextMaintance) === 'next'
    );
  });

  const lateMaintanceTrains = computed(() => {
    return trains.value.filter(train =>
      compareDate(train.nextMaintance) === 'late'
    );
  });

  const addNewTrain = (newTrain) => {
    const train = { ...defaultTrain }
    train.id = trains.value.length + 1
    train.line = newTrain.line || 0
    train.trainCode = newTrain.trainCode || 'T' + (trains.value.length + 1).toString().padStart(3, '0')
    train.status = newTrain.status || 'Estacionado'
    // Formato dd-mm-aaaa
    const now = new Date();
    const lastMaint = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const nextMaintDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    const nextMaint = `${String(nextMaintDate.getDate()).padStart(2, '0')}-${String(nextMaintDate.getMonth() + 1).padStart(2, '0')}-${nextMaintDate.getFullYear()}`;
    train.lastMaintance = newTrain.lastMaintance || lastMaint;
    train.nextMaintance = newTrain.nextMaintance || nextMaint;
    trains.value.push(train)
  }

  onMounted(() => {
    getOperatingTrains()
    getInoperativeTrains()
    getInMaintenanceTrains()
  })

  return { operatingTrains, inoperativeTrains, inMaintenanceTrains, lateMaintanceTrains, nextMaintanceTrains, getOperatingTrains, getInoperativeTrains, getInMaintenanceTrains, addNewTrain }
})
