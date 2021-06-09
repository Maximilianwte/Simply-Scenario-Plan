<template>
  <div id="profile" class="flex-col">
    <div class="inside text-center mt-24">
      <h4 class="text-2xl mb-6">1. Change email</h4>
      <div id="email" class="md:flex items-center">
        <form class="text-xl">
          <label for="email">Email</label>
          <input type="email" v-model="email" :placeholder="getEmail" @change="checkInputEmail"
            class="rounded border-2 ml-4" />
        </form>
        <button class="bg-focus mt-4 md:mt-0 md:ml-6 hover:bg-main text-white text-xl px-4 py-2 rounded"
          @click="handleChangeEmail">
          Change email
        </button>
      </div>
      <p id="warnMessageEmail" class="text-xl text-focus mt-4">
        {{ warnTextEmail }}
      </p>
      <h4 class="text-2xl mb-6 mt-24">2. Change password</h4>
      <div id="password" class="">
        <form class="text-xl">
          <div id="row1" class="flex-col md:flex-row justify-between items-center">
            <label for="password" class="mt-6">Old Password</label>
            <input type="password" v-model="oldPassword" @change="checkInputPassword"
              class="rounded border-2 mt-2 ml-4" />
          </div>
          <div id="row2" class="mt-10 flex-col md:flex-row justify-between items-center">
            <label for="password" class="mt-6">New Password</label>
            <input type="password" v-model="newPassword" @change="checkInputPassword"
              class="rounded border-2 mt-2 ml-4" />
          </div>
          <div id="forgotPassword" class="mt-4 w-full flex-col text-alternative text-sm">
            <a href="mailto:maximilianwtewte@gmail.com?subject=Reset%20password" class="ml-2">Reset password</a>
          </div>
        </form>
        <button class="bg-focus mt-4 hover:bg-main text-white text-xl px-4 py-2 rounded" @click="handleChangePassword">
          Change Password
        </button>
      </div>
      <p id="warnMessagePassword" class="text-xl text-focus mt-4 w-80">
        {{ warnTextPassword }}
      </p>
    </div>
    <div id="deleteAccount" class="mt-24 w-full flex-col text-alternative text-sm">
      <a href="mailto:max@project.de" class="ml-2">Delete Account</a>
    </div>
    <div id="menu" class="absolute top-0 text-xl right-0 py-2 px-2">
      <template id="LoggedIn">
        <router-link to="/app">
          <button class="border-2 border-main hover:border-alternative hover:text-alternative rounded py-1 px-2">
            Start App
          </button>
        </router-link>
        <router-link to="/">
          <button class="py-1 px-2 hover:text-alternative">Home</button>
        </router-link>
        <button class="py-1 px-2 hover:text-alternative" @click="handleLogout">
          Logout
        </button>
      </template>
    </div>
    <div class="footer absolute bottom-0 left-0 my-2 mx-4">
      <router-link to="/imprint">
        <h2>Imprint</h2>
      </router-link>
    </div>
  </div>
</template>
<script>
  import store from "../store";
  import data_functions from "../data/data_functions";
  export default {
    metaInfo: {
      title: 'Profile',
    },
    data() {
      return {
        email: "",
        oldPassword: "",
        newPassword: "",
        warnTextEmail: null,
        warnTextPassword: null,
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
      getEmail() {
        return store.state.user.email;
      },
    },
    methods: {
      checkInputEmail() {
        if (
          this.email.includes("@") &&
          this.email.includes(".") &&
          this.email.length > 5
        ) {
          this.warnTextEmail = "";
        } else {
          this.warnTextEmail = "Please provide a correct email.";
        }
      },
      checkInputPassword() {
        if (this.oldPassword.length > 7 || this.oldPassword == "") {
          // here send to server and check if valid, if not give message.
          if (this.newPassword.length > 7 || this.newPassword == "") {
            // here send to server and check if valid, if not give message.
            this.warnTextPassword = "";
          } else {
            this.warnTextPassword = "Please enter a more secure password.";
          }
        } else {
          this.warnTextPassword =
            "Please enter your correct old password. If you cannot remember please reset your password.";
        }
      },
      handleChangeEmail() {
        if (
          this.email.includes("@") &&
          this.email.includes(".") &&
          this.email.length > 5
        ) {
          data_functions.update_userAccess({
              activeEmail: store.state.user.email,
              newEmail: this.email
            },
            "email"
          ).then(res => {
            this.warnTextEmail = res.data
            if (res.status == 200) {
              store.commit("setUser", {
                email: this.email
              })
            }
          });
        } else {
          this.warnTextEmail = "Please provide a correct email first.";
        }
      },
      handleChangePassword() {
        if (this.oldPassword.length > 7 && this.newPassword.length > 7) {
          data_functions.update_userAccess({
              email: store.state.user.email,
              activePassword: this.oldPassword,
              newPassword: this.newEmail,
            },
            "password"
          ).then(res => this.warnTextPassword = res.data);
        } else {
          this.warnTextPassword = "Please fill out the data fields first.";
        }
      },
      handleLogout() {
        store.commit("setLogout");
        this.$router.push({
          path: "/"
        });
      }
    },
  };
</script>