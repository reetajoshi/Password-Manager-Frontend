<template>
  <layout>
    <form>
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model="email" class="form-control form-control-lg"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control form-control-lg"/>
      </div>
      <div class="form-group">
        <label>Keychain Password</label>
        <input type="password" v-model="decryptionPassword" class="form-control form-control-lg"/>
      </div>
      <br>
      <button type="submit" class="btn btn-dark btn-lg btn-block" @click.prevent="loginUser">Sign In</button>
<!--      <p class="forgot-password text-right mt-2 mb-4">-->
<!--        <router-link to="/forgot-password">Forgot password ?</router-link>-->
<!--      </p>-->
      <p class="forgot-password text-right">
        Don't have an account
        <router-link :to="{name: 'signup'}"> Sign up?</router-link>
      </p>
    </form>
  </layout>
</template>

<script>
import layout from './layouts'
import {login} from "@/views/authentication/service";
import auth from "@/mixins/auth";

export default {
  mixins: [auth],
  components: {
    layout
  },
  data() {
    return {
      email: "",
      password: "",
      decryptionPassword: "",
    }
  },
  methods: {
    async loginUser() {
      if (!this.decryptionPassword) {
        await this.$store.dispatch('makeToast', {
          message: `Keychain password is required`,
          type: "Danger"
        })
      }
      try {
        const res = await login(this.email, this.password)
        await this.$store.dispatch('auth/setUserData', {...res.data, keychainPassword: this.decryptionPassword})
        this.goHome();
      } catch (e) {
        await this.$store.dispatch('makeToast', {
          message: `Login failed ${e.response.data.message || e.response.data}`,
          type: "Danger"
        })
      }
    }
  }
}
</script>