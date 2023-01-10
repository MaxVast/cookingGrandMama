<template>
  <v-container :loading="$fetchState.pending" v-if="$auth.loggedIn && user">
    <v-row>
      <v-col v-if="user.user._id === $auth.user.userId">
        <v-form
          ref="form"
          >
          <v-text-field
            v-model="user.user.email"
          ></v-text-field>
          <v-text-field
            v-model="user.user.username"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'indexAccountUser',
  data(){
    return {
      disabled: true,
      user: null
    }
  },
  async fetch(){
    try{
      const { data } = await this.$api.Api.getUser(this.$auth.user.userId)
      this.user = data
    }catch (e){
      console.log(e);
    }
  }
}
</script>
