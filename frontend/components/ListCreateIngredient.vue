<template>
    <span>
    <v-row v-for="(ingredient,k) in listIngredients" :key="k">
        <v-col cols="2">
            <v-text-field
                type="number"
                label="Quantité*"
                v-model="ingredient.quantity"
                :rules="quatityIngredientRules"
                required
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-select
                v-model="ingredient.mesure"
                :items="items"
                :rules="[v => !!v || 'Une mesure est demandé']"
                label="Mesure*"
                required
                ></v-select>
        </v-col>
        <v-col cols="6">
            <v-text-field
                label="Nom de l'ingrédient*"
                v-model="ingredient.ingredient"
                :rules="nameIngredientRules"
                required
            ></v-text-field>
        </v-col>
        <v-col cols="1" align="center">
            <v-btn
                color="error"
                @click="remove(k)"
                v-show="k || ( !k && listIngredients.length > 1)"
            >
                <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
        </v-col>

    </v-row>
    <v-row>
        <v-col cols="12">
            <v-btn
                color="success"
                class="mr-4"
                @click="add"
            >
                Ajouter un ingredient
            </v-btn>
        </v-col>
    </v-row>
</span>
</template>

<script>
export default {
    name: 'ListCreateIngredient',
    props: ['dataIngredient'],
    data: () => ({
        items: [
            { text: 'Mesure', value: null },
            { text: 'Gramme', value: 'gr' },
            { text: 'Kilos', value: 'kg' },
            { text: 'Centi litre', value: 'cl' },
            { text: 'Millilitre', value: 'ml'},
            { text: 'Litre', value: 'L' },
            { text: 'Cuillère à café', value: 'c.a.c' },
            { text: 'Cuillère à soupe', value: 'c.a.s' },
            { text: 'Unité', value: 'unite' },
        ],
        listIngredients: null,
        quatityIngredient: null,
        quatityIngredientRules: [
            v => !!v || 'Quantité obligatoire',
            v => (v && v > 0) || 'Renseignez une quantité',
        ],
        nameIngredientRules: [
            v => !!v || 'Ingrédient obligatoire',
            v => (v && v.length > 1) || 'Renseignez un ingrédient',
        ],
    }),
    methods: {
        add() {
            this.listIngredients.push({quantity: null, mesure: '', ingredient: ''})
        },
        remove(index) {
            this.listIngredients.splice(index, 1);
        },
    },
    mounted() {
      this.listIngredients = this.dataIngredient ? this.dataIngredient : [{quantity: null, mesure: '', ingredient: ''}]
    },
}
</script>
