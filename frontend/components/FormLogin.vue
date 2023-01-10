<template>
  <v-form
    v-if="$auth.loggedIn !== true"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-img
      src="/images/cooking-grandmama_logo.png"
      alt="Logo de cooking Grandmama, un cookie"
      max-height="300"
      max-width="300"
    >
    </v-img>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show1 ? 'text' : 'password'"
      label="Mot de passe"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Connexion
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Effacer
    </v-btn>
    <v-row justify="center" align="center" class="mx-auto mt-12">
      <v-col cols="12" sm="6" md="9" align="center">
        <v-btn
            color="success"
            :to="'/user/create'"
        >
            Créer un compte
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'IndexPage',
  data: () => ({
    valid: true,
    show1: false,
    password: '',
    passwordRules: [
      v => !!v || 'Mot de passe obligatoire',
      v => (v && v.length > 1) || 'Renseignez un mot de passe',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail obligatoire',
      v => /.+@.+\..+/.test(v) || 'L\'e-mail doit être valide',
    ],
  }),
  methods: {
    async validate() {
      try {
        const { data } = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          }
        })
        this.$auth.setUser(jwt_decode(data.token))
        await this.$router.push({name: 'recipe'})
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>
