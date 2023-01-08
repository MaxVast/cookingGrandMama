export default ({ $axios, baseUrl }) => ({
  recipeAll() {
    return $axios.get(`${baseUrl}/api/recipe`)
  },
  recipeOne(id) {
    return $axios.get(`${baseUrl}/api/recipe/${id}`)
  },
  createRecipe(recipe) {
    return $axios.post(`${baseUrl}/api/recipe`, recipe)
  },
  deleteOneRecipe(id) {
    return $axios.delete(`${baseUrl}/api/recipe/${id}`)
  },
  signUpUser(user) {
    return $axios.post(`${baseUrl}/api/auth/signup`, user)
  }
})
