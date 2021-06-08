<template>
  <div id="register" class="flex-col">
    <form class="flex-col text-xl mt-24">
      <h5 class="mb-12 w-2/3 text-center text-alternative">
        {{ getSendFromText }}
      </h5>
      <div id="LoginText" class="flex items-center mb-16">
        <p class="mr-4">Need an account first?</p>
        <router-link to="/register">
          <button
            class="border-2 border-main hover:border-alternative hover:text-alternative text-xl rounded py-2 px-4"
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
    <div
      id="forgotPassword"
      class="mt-4 w-64 flex-col text-alternative text-sm"
    >
      <a href="mailto:max@project.de" class="ml-2">Reset password</a>
    </div>
    <button
      class="bg-focus hover:bg-main text-white text-xl px-4 py-2 rounded mt-12"
      @click="sendLogin"
    >
      Login
    </button>
    <p id="warnMessage" class="text-xl text-focus mt-4 w-80 text-center">{{ warnText }}</p>
  </div>
</template>
<script>
import data_functions from "../data/data_functions";
import store from "../store";
export default {
  metaInfo: {
      title: 'Login',
    },
  data() {
    return {
      email: "",
      password: "",
      warnText: null,
    };
  },
  computed: {
    getSendFromText() {
      switch (this.$route.query.sendFrom) {
        case "template": {
          return "Please login first before you start customizing your template.";
        }
        default: {
          return null;
        }
      }
    },
  },
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
    sendLogin() {
      this.checkInputs();
      if (this.warnText == "") {
        data_functions
          .send_login({
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            var resData = response.data
            console.log("Status", response);
            if (response.status == 406) {
              this.warnText =
                "There is no user with this email and password combination. Maybe another password?";
            } else if (response.status == 200) {
              store.commit("setUser", { email: this.email, id: resData.id });
              this.$router.push({ path: "app" });
            }
          });
      }
    },
  },
};
</script>