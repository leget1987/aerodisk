import httpClient from './httpClient'

const fetchDisc = () => httpClient.get('/api/v1/discs/')

export { fetchDisc }
