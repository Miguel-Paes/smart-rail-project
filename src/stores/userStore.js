import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('user', () => {

  const allUsers = ref([
    {
      id: 1,
      name: 'John Doe',
      email: 'john_doe@gmail.com',
      role: 'user',
    },
    {
      id: 2,
      name: 'Darwin Smith',
      email: 'darwin_smt@gmail.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Vinícius Rubens dos Santos',
      email: 'vinicius-santos@smartrail.com',
      role: 'employee',
    },
    {
      id: 4,
      name: 'Nathan da Cunha',
      email: 'nathan-cunha@smartrail.com',
      role: 'employee',
    },
    {
      id: 5,
      name: 'José Augusto Maciel Ribeiro',
      email: 'jose-augusto-mr@admsmartrail.com',
      role: 'admin',
    },
    {
      id: 6,
      name: 'Miguel Paes da Silva',
      email: 'miguel-paes@admsmartrail.com',
      role: 'admin',
    },
  ])

  const common = ref([])
  const employee = ref([])
  const admin = ref([])

  const getCommonUsers = () => {
    common.value = allUsers.value.filter(u => u.role === 'user')
  }

  const getEmployeeUsers = () => {
    employee.value = allUsers.value.filter(u => u.role === 'employee')
  }

  const getAdminUsers = () => {
    admin.value = allUsers.value.filter(u => u.role === 'admin')
  }

  onMounted(() => {
    getCommonUsers(),
    getEmployeeUsers(),
    getAdminUsers(),
    console.log(common)
  })

  return { allUsers, common, employee, admin }
})
