<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="9" align="center">
      <FormLogin />
      <v-btn
          v-if="$auth.loggedIn == true"
          color="success"
          :to="'/recipe/new'"
      >
          Créer une nouvelle recette
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
</script>
