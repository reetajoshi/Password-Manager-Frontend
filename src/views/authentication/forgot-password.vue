<template>
  <layout>
    <form>
      <h3>Forgot Password</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model="password" class="form-control form-control-lg"/>
      </div>
      <br>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
      <p class="forgot-password text-right mt-2 mb-4">
        Back to
        <router-link to="/">login?</router-link>
      </p>
    </form>
  </layout>
</template>

<script>
import layout from './layouts'

export default {
  components: {
    layout
  },
  data() {
    return {
      password: "",
    }
  }
}
</script>