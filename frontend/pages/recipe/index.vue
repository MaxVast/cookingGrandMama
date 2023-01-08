<template>
  <div class="row align-center justify-center">
    <v-card
      v-for="(r, i) in recipes"
      :key="i"
      :loading="$fetchState.pending"
      class="mx-auto my-6"
      min-width="374"
    >
      <v-img
        v-if="(r.imageUrl)"
        height="250"
        src=""
      ></v-img>

      <v-card-title>{{ r.nameRecipe }}</v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          color="success"
          router
          :to="'/recipe/'+r._id"
        >
          Voir la recette
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'indexRecipe',
  data(){
    return {
      recipes: []
    }
  },
  async fetch(){
    try{
      const { data } = await this.$api.Api.recipeAll()
      this.recipes = data
    }catch (e){
      console.log(e);
    }
  }
}
</script>
