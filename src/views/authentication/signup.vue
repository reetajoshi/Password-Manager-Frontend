<template>
  <layout>
    <form>
      <h3>Sign Up</h3>
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" v-model="fullName" class="form-control form-control-lg"/>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model="email" class="form-control form-control-lg"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control form-control-lg"/>
      </div>
      <br>
      <button type="submit" class="btn btn-dark btn-lg btn-block" @click.prevent="registerUser">Sign Up</button>
      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{name: 'login'}">sign in?</router-link>
      </p>
    </form>
  </layout>
</template>

<script>
import layout from './layouts'
import {register} from "@/views/authentication/service";
import auth from "@/mixins/auth";

export default {
  mixins: [auth],
  components: {
    layout
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async registerUser() {
      try {
        const res = await register(this.fullName, this.email, this.password)
        await this.$store.dispatch('makeToast', {
          message: `Registration Success, Please login to continue`,
          type: "Success"
        })
        await this.$router.push('/login');
      } catch (e) {
        await this.$store.dispatch('makeToast', {
          message: `Registration failed ${e.response.data.message || e.response.data}`,
          type: "Danger"
        })
      }
    }
  }
}
</script>