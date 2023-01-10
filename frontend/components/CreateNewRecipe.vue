<template>
    <v-form
      v-if="$auth.loggedIn"
      ref="form"
      v-model="valid"
    >
        <v-container>
            <v-row>
                <v-col
                cols="12"
                >
                    <h1>Créer une nouvelle recette</h1>
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
                    <v-textarea
                        v-model="recipe.recipe"
                        color="teal"
                        :rules="recipeDescriptionRules"
                        label="Description de la recette*"
                        required>
                        <template v-slot:label>
                            <div>Description de la recette*</div>
                        </template>
                    </v-textarea>
                </v-col>
                <v-col
                cols="12"
                >
                    <h2>Les ingrédients* :</h2>
                </v-col>
                <v-col
                cols="12"
                >
                    <ListCreateIngredient ref="ListIngredients"/>
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
</template>

<script>

export default {
    name: 'CreateNewRecipePage',
    data: () => ({
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
        recipe: {
            nameRecipe: '',
            recipe: '',
            ingredients: '',
            preparationTime: '',
            cookingTime: '',
            createdAt: '',
        }
    }),
    methods: {
        async validate() {
            try {
                const date = new Date()
                this.recipe.ingredients = this.$refs.ListIngredients.listIngredients
                this.recipe.createdAt = date.toISOString()
                await this.$api.Api.createRecipe(this.recipe)
                await this.$router.push({name: 'recipe'})
            } catch (e) {
                console.log(e)
            }
        }
    },
}
</script>
