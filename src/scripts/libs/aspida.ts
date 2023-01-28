import aspida from '@aspida/fetch'
import api from '../../api/$api'

const fetchConfig = {
  throwHttpErrors: true,
}

export const apiClient = api(aspida(fetch, fetchConfig))
