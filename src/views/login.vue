<template>
  <div id="register" class="flex-col">
    <form class="flex-col text-xl mt-24">
            <div id="LoginText" class="flex items-center mb-16">
        <p class="mr-4">Need an account first?</p>
        <router-link to="/register">
        <button
          class="bg-focus hover:bg-main text-white text-xl rounded py-2 px-4"
        >
          Register
        </button>
      </router-link>
      </div>
      <label for="email">Email</label>
      <input
        type="email"
        v-model="email"
        @change="checkInputs"
        class="rounded border-2 mt-2"
      />
      <label for="password" class="mt-6">Password</label>
      <input
        type="password"
        v-model="password"
        @change="checkInputs"
        class="rounded border-2 mt-2"
      />
    </form>
    <button
      class="bg-focus hover:bg-main text-white text-xl px-4 py-2 rounded mt-8"
    >
      Login
    </button>
    <p id="warnMessage" class="text-xl text-focus mt-4">{{ warnText }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      warnText: null,
    };
  },
  computed: {},
  methods: {
    checkInputs() {
      if (
        this.email.includes("@") &&
        this.email.includes(".") &&
        this.email.length > 5
      ) {
        if (this.password.length > 7 || this.password == "") {
          // here send to server and check if valid, if not give message.
          this.warnText = "";
        } else {
          this.warnText = "Please enter a more secure password.";
        }
      } else {
        this.warnText = "Please enter a valid email.";
      }
    },
  },
};
</script>