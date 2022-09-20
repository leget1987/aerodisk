<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title> Войдите в систему </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                name="username"
                label="Логин"
                id="username"
                v-model="username"
                :rules="usernameRules"
                prepend-icon="mdi-account-circle"
                data-cy="loginUsernameField"
                required
              ></v-text-field>
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Пароль"
                id="password"
                v-model="password"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                data-cy="loginPasswordField"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              data-cy="loginSubmitBtn"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="error">
      {{ errorMessages }}
      <v-btn dark text @click="snackbar = false"> Закрыть </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      errorMessages: "",
      valid: false,
      username: "",
      password: "",
      usernameRules: [(v) => !!v || "Укажите имя пользователя"],
      passwordRules: [(v) => !!v || "Укажите пароль"],
      showPassword: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("Auth/login", {
            username: this.username,
            password: this.password,
          })
          .then((c) => {
            if (c) {
              // Redirect the user to the page he first tried to visit or to the home view
              this.$router.push(
                this.$router.history.current.query.redirect || "/"
              );
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessages = "не правильные логин или пароль";
            this.snackbar = true;
          });
      }
    },
  },
};
</script>

<style scoped></style>
