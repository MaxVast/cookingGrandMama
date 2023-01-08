import api from '../api/app';

export default ({ $axios }, inject) => {
  const {defaults} = $axios

  inject('api', {
    Api: api({
      $axios,
      baseUrl: 'http://localhost:3001'
    })
  })
}
