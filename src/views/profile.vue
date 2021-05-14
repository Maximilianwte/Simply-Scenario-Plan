<template>
  <div id="profile" class="flex-col">
    <div class="inside text-center mt-24">
      <h4 class="text-2xl mb-6">1. Change email</h4>
      <div id="email" class="flex items-center">
        <form class="text-xl">
          <label for="email">Email</label>
          <input type="email" v-model="email" :placeholder="getEmail" @change="checkInputEmail"
            class="rounded border-2 ml-4" />
        </form>
        <button class="bg-focus ml-6 hover:bg-main text-white text-xl px-4 py-2 rounded" @click="handleChangeEmail">
          Change email
        </button>
      </div>
      <p id="warnMessageEmail" class="text-xl text-focus mt-4">
        {{ warnTextEmail }}
      </p>
      <h4 class="text-2xl mb-6 mt-24">2. Change password</h4>
      <div id="password" class="flex justify-between items-center">
        <form class="text-xl">
          <div id="row1" class="flex justify-between items-center">
            <label for="password" class="mt-6">Old Password</label>
            <input type="password" v-model="oldPassword" @change="checkInputPassword"
              class="rounded border-2 mt-2 ml-4" />
          </div>
          <div id="row2" class="mt-10 flex justify-between items-center">
            <label for="password" class="mt-6">New Password</label>
            <input type="password" v-model="newPassword" @change="checkInputPassword"
              class="rounded border-2 mt-2 ml-4" />
          </div>
        </form>
        <button class="bg-focus ml-6 hover:bg-main text-white text-xl px-4 py-2 rounded" @click="handleChangePassword">
          Change Password
        </button>
      </div>
      <p id="warnMessagePassword" class="text-xl text-focus mt-4 w-80">
        {{ warnTextPassword }}
      </p>
    </div>
  </div>
</template>
<script>
  import store from "../store";
  import data_functions from "../data/data_functions";
  export default {
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
            "Please enter your correct old password. If you cannot remember please send us a text to.";
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
    },
  };
</script>