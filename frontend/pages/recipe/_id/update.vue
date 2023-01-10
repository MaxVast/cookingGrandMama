<template>
  <v-container v-if="$auth.loggedIn">
    <v-row>
      <v-col>
        <v-breadcrumbs
          :items="urls"
          divider=">"
        ></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" v-if="recipe">
      <v-col cols="12" sm="6" md="9">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <h1>Modifier votre recette</h1>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="recipe.nameRecipe"
                  :rules="nameRecipeRules"
                  label="Nom de la recette*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <vue-editor
                  v-model="recipe.recipe"
                  color="teal"
                  :rules="recipeDescriptionRules"
                  label="Description de la recette*"
                  required>
                  <template v-slot:label>
                    <div>Description de la recette*</div>
                  </template>
                </vue-editor>
              </v-col>
              <v-col
                cols="12"
              >
                <h2>Les ingrédients* :</h2>
              </v-col>
              <v-col
                cols="12"
              >
                <ListCreateIngredient :dataIngredient="recipe.ingredients" ref="ListIngredients"/>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  type="number"
                  v-model="recipe.preparationTime"
                  :rules="preparationTimeRules"
                  label="Temps de préparation"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  type="number"
                  v-model="recipe.cookingTime"
                  :rules="cookingTimeRules"
                  label="Temps de cuisson*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Engregistrer
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UpdateRecipePage',
  data(){
    return {
      valid: true,
      nameRecipeRules: [
        v => !!v || 'Nom de recette obligatoire',
        v => (v && v.length > 2) || 'Renseignez un nom de recette',
      ],
      recipeDescriptionRules: [
        v => !!v || 'Description obligatoire',
        v => (v && v.length > 10) || 'Renseignez une description',
      ],
      preparationTimeRules: [
        v => (v && v > 1) || 'Renseignez un temps de préparation supérieur à 0',
      ],
      cookingTimeRules: [
        v => !!v || 'Temps de cuisson obligatoire',
        v => (v && v > 1) || 'Renseignez un temps de cuisson',
      ],
      recipe: null,
      urls: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Recette',
          disabled: false,
          href: '/recipe',
        },
        {
          text: null,
          disabled: false,
          href: '',
        },
        {
          text: 'modifier',
          disabled: true,
          href: null,
        },
      ],
    }
  },
  async fetch() {
    if(this.$route.params.id){
      try{
        const { data } = await this.$api.Api.recipeOne(this.$route.params.id)
        this.recipe = data
        this.urls[2].text = data.nameRecipe
        this.urls[2].href = '/recipe/'+data._id;
      }catch (e){
        console.log(e);
        await this.$router.push({name: 'index'})
      }
    }
  },
  methods: {
    async validate() {
      try {
        console.log(this.recipe)
        this.recipe.ingredients = this.$refs.ListIngredients.listIngredients
        await this.$api.Api.updateRecipe(this.recipe._id, this.recipe)
        await this.$router.push({name: 'recipe'})
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
