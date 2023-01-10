<template>
      <v-container :loading="$fetchState.pending">
        <v-row>
            <v-col>
                <v-breadcrumbs
                    :items="urls"
                    divider=">"
                ></v-breadcrumbs>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <div class="col s12">
                <h1 class="text-center">{{ recipe.nameRecipe }}</h1>
            </div>
        </v-row>
        <v-row justify="center" align="center">
            <div class="col s6">
                <p class="text-center">Temps de préparation : {{ recipe.preparationTime }} min</p>
            </div>
            <div class="col s6">
                <p class="text-center">Temps de cuisson : {{ recipe.cookingTime }} min</p>
            </div>
        </v-row>
        <v-row justify="center" align="center">
          <v-col class="mx-auto my-2">
            <h2>Les ingrédients :</h2>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-card
            v-for="(ingredient,  i) in recipe.ingredients"
            :key="i"
            :loading="$fetchState.pending"
            class="mx-auto my-3"
            min-width="200"
            elevation="5"
          >
            <template slot="progress">
              <v-progress-linear
                color="sucess"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-card-title>{{ ingredient.quantity }}<span v-if="ingredient.mesure != 'unite'"> {{ ingredient.mesure }}</span></v-card-title>
            <v-card-text>{{ ingredient.ingredient }}</v-card-text>
          </v-card>
        </v-row>
        <v-row justify="center" align="center">
            <div class="col s12 mx-auto my-6">
                <p v-html="recipe.recipe"></p>
                <div class="divider"></div>
            </div>
        </v-row>
        <div class="mt-12 mx-auto row align-center justify-center" v-if="$auth.loggedIn == true && $auth.user.userId == recipe.userId">
            <div class="mx-auto my-6 align-center justify-center">
                <v-btn
                    color="warning"
                    elevation="4"
                    large
                    raised
                    router
                    :to="`/recipe/${recipe._id}/update`"
                >Modifier votre recette</v-btn>
            </div>
            <div class="mx-auto my-6 align-center justify-center white-text">
                <v-btn
                    elevation="4"
                    color="error"
                    large
                    raised
                    @click="modaldeleteRecipe"
                >supprimer votre recette</v-btn>
            </div>
        </div>
        <v-dialog
          v-model="modalDelete"
          max-width="600"
          :loading="loading"
        >
          <v-card>
            <v-card-title class="text-h5">
              Voulez-vous vraiment supprimer cette recette ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="modalDelete = false"
              >
                Annuler
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="deleteRecipe(recipe._id)"
              >
                Supprimer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
</template>

<script>
    export default {
        name: 'viewRecipe',
        data(){
            return {
                loading: false,
                modalDelete: false,
                recipe: [],
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
                    disabled: true,
                    href: '',
                    },
                ],
            }
        },
        async fetch(){
            try{
                const { data } = await this.$api.Api.recipeOne(this.$route.params.id)
                this.recipe = data
                this.urls[2].text = data.nameRecipe
            }catch (e){
                console.log(e);
                await this.$router.push({name: 'index'})
            }
        },
        methods: {
            modaldeleteRecipe() {
                this.modalDelete = true;
            },
            async deleteRecipe(recipeId){
                this.loading = true;
                try{
                    if(this.$auth.loggedIn && this.$auth.user.userId == this.recipe.userId){
                        await this.$api.Api.deleteOneRecipe(recipeId)
                    }
                }catch (e){
                    console.log(e);
                }
                this.modalDelete = false;
                this.loading = false;
                await this.$router.push({name: 'index'})
            }
        }
    }
</script>
