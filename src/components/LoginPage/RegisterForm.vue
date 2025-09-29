<template>
  <v-form class="d-flex flex-column pa-4">
    <v-text-field
      label="Username"
      type="text"
      variant="outlined"
      color="lime-accent-4"
      required
    ></v-text-field>

    <v-text-field
      label="Email"
      type="email"
      variant="outlined"
      color="lime-accent-4"
      required
    ></v-text-field>

    <v-text-field
      label="Senha"
      type="password"
      variant="outlined"
      color="lime-accent-4"
      required
    ></v-text-field>

    <v-btn
      class="mt-2 align-self-center"
      color="lime-accent-4"
      variant="tonal"
      dark
    >
      Registrar
    </v-btn>
  </v-form>
</template>
