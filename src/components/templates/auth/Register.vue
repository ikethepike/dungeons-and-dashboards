<template>
  <form @submit.prevent="onSubmit">
    <!-- Email -->
    <div class="slide-block">
      <label for="email">Email</label>
      <input type="email" v-model="email" required>
      <span class="error" v-if="validationErrors.email">{{ validationErrors.email }}</span>
    </div>
    <!-- Password -->
    <div class="slide-block">
      <label for="password">Password</label>
      <input type="password" v-model="password" required>
      <span class="error" v-if="validationErrors.password">{{ validationErrors.password }}</span>
    </div>
    <!-- Repeat -->
    <div class="slide-block" v-if="password.length">
      <label for="repeat">Password repeat</label>
      <input type="password" v-model="repeat" required>
      <span class="error" v-if="validationErrors.repeat">{{ validationErrors.repeat }}</span>
    </div>
  </form>
</template>
<script>
// Imports
// -- Mixins
import validation from "../../../mixins/validation.js";

// -- Dependencies
import Firebase from "../../../main.js";

export default {
  mixins: [validation],
  data: () => ({
    email: "",
    repeat: "",
    password: ""
  }),
  methods: {
    onSubmit() {
      if (
        !this.validate({
          email: [this.email, "required|email"],
          repeat: [this.repeat, "required|min:5"],
          password: [this.password, "required|min:5"]
        })
      )
        return;
    }
  }
};
</script>
