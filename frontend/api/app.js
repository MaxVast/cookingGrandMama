export default ({ $axios, baseUrl }) => ({
  //RECIPE
  recipeAll() {
    return $axios.get(`${baseUrl}/api/recipe`)
  },
  recipeOne(id) {
    return $axios.get(`${baseUrl}/api/recipe/${id}`)
  },
  createRecipe(recipe) {
    return $axios.post(`${baseUrl}/api/recipe`, recipe)
  },
  updateRecipe(id, recipe) {
    return $axios.put(`${baseUrl}/api/recipe/${id}`, recipe)
  },
  deleteOneRecipe(id) {
    return $axios.delete(`${baseUrl}/api/recipe/${id}`)
  },
  //USER
  signUpUser(user) {
    return $axios.post(`${baseUrl}/api/auth/signup`, user)
  },
  getUser(id) {
    return $axios.get(`${baseUrl}/api/auth/user/${id}`)
  }
})
