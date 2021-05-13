<template>
  <div id="profile" class="flex-col">
    <div id="email" class="flex items-center mt-24">
      <form class="text-xl">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="getEmail"
          @change="checkInputs"
          class="rounded border-2 ml-4"
        />
      </form>
      <button
        class="bg-focus ml-6 hover:bg-main text-white text-xl px-4 py-2 rounded"
      >
        Change email
      </button>
    </div>
    <p id="warnMessageEmail" class="text-xl text-focus mt-4">{{ warnTextEmail }}</p>
    <div id="password" class="flex justify-between items-center mt-24">
      <form class="text-xl">
        <div id="row1" class="flex justify-between items-center">
          <label for="password" class="mt-6">Old Password</label>
          <input
            type="password"
            v-model="oldPassword"
            @change="checkInputs"
            class="rounded border-2 mt-2 ml-4"
          />
        </div>
        <div id="row2" class="mt-10 flex justify-between items-center">
          <label for="password" class="mt-6">New Password</label>
          <input
            type="password"
            v-model="newPassword"
            @change="checkInputs"
            class="rounded border-2 mt-2 ml-4"
          />
        </div>
      </form>
      <button
        class="bg-focus ml-6 hover:bg-main text-white text-xl px-4 py-2 rounded"
      >
        Change Password
      </button>
    </div>
    <p id="warnMessagePassword" class="text-xl text-focus mt-4">{{ warnTextPassword }}</p>
  </div>
</template>
<script>
import store from "../store";
export default {
  data() {
    return {
      email: "",
      oldPassword: "",
      newassword: "",
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