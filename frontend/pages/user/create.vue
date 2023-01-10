<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="9">
            <v-form
                v-if="$auth.loggedIn !== true"
                ref="form"
                v-model="valid"
                lazy-validation
            >

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
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

                <v-text-field
                v-model="password2"
                :rules="passwordRules2"
                :type="'password'"
                label="Confimer votre mot de passe"
                @input="confirmDataUser"
                ></v-text-field>
                <v-row v-if="passwordNotMatch" class="mt-2 mb-2">
                    <v-col col="12">
                        <v-text class="text-red">
                            Vos mots de passe ne sont pas identique
                        </v-text>
                    </v-col>
                </v-row>
                
                <v-btn
                :disabled="valid"
                color="success"
                class="mr-4"
                @click="validate"
                >
                Valider
                </v-btn>

                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Effacer
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    valid: false,
    show1: false,
    password: '',
    passwordRules: [
      v => !!v || 'Mot de passe obligatoire',
      v => (v && v.length > 1) || 'Renseignez un mot de passe',
    ],
    password2: '',
    passwordRules2: [
      v => !!v || 'Mot de passe obligatoire',
      v => (v && v.length > 1) || 'Renseignez votre mot de passe',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail obligatoire',
      v => /.+@.+\..+/.test(v) || 'L\'e-mail doit être valide',
    ],
    username: '',
    usernameRules: [
      v => !!v || 'Username obligatoire',
      v => (v && v.length > 3) || 'Renseignez votre mot de passe',
    ],
    passwordNotMatch: null,
  }),
  methods: {
    async validate() {
      try {
        const data = {
            email: this.email,
            username: this.username,
            password: this.password
        }
        await this.$api.Api.signUpUser(data)
        await this.$router.push({name: 'index'})
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    confirmDataUser() {
        if (this.password != this.password2) {
            this.passwordNotMatch = true;
            this.valid = true;
            return;
        }
        this.passwordNotMatch = false;
        this.valid = false;
    }
  },
}
</script>