<template>
  <div class="container">
    <v-card class="elevation-12">
      <v-toolbar flat dark color="#07889B">
        <v-toolbar-title class="tableTitle">Add contact</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <form class="formContainer">
        <v-text-field
          v-validate="'required|max:20'"
          v-model="firstName"
          :counter="20"
          :error-messages="errors.collect('name')"
          label="Firstname"
          data-vv-name="name"
          color="#07889B"
          required>
        </v-text-field>
        <v-text-field
          v-validate="'required|max:20'"
          v-model="lastName"
          :counter="20"
          :error-messages="errors.collect('name')"
          label="Lastname"
          data-vv-name="name"
          color="#07889B"
          required>
        </v-text-field>
        <v-text-field
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
          label="E-mail"
          data-vv-name="email"
          color="#07889B"
          required>
        </v-text-field>
        <v-select
          v-validate="'required'"
          :items="items"
          v-model="select"
          :error-messages="errors.collect('select')"
          label="Type"
          data-vv-name="select"
          color="#07889B"
          required>
        </v-select>
        <v-text-field
          v-validate="'required|numeric'"
          v-model="phoneNumber"
          :error-messages="errors.collect('numeric')"
          label="Phone number"
          data-vv-name="numeric"
          color="#07889B"
          required>
        </v-text-field>
        <v-checkbox
          v-validate="'required'"
          v-model="checkbox"
          :error-messages="errors.collect('checkbox')"
          value="1"
          label="Primary"
          data-vv-name="checkbox"
          type="checkbox"
          color="#07889B"
          required>
        </v-checkbox>
        <v-btn @click="submit" color="#07889B" flat outline>submit</v-btn>
        <v-btn @click="clear" flat outline>clear</v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: null,
      select: null,
      items: [
        'Fax',
        'Private',
        'Business'
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address',
          numeric: 'Phone number'
        },
        custom: {
          name: {
            required: () => 'Name field type can not be empty',
            max: 'The name field may not be greater than 10 characters'
          },
          select: {
            required: 'Number type is required'
          }
        }
      }
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.name = '';
      this.email = '';
      this.select = null;
      this.checkbox = null;
      this.$validator.reset();
    }
  },
  mounted() {
    this.$validator.localize('en', this.dictionary);
  }
};
</script>

<style scoped>
.container {
  max-width: 40%;
  margin: auto;
}
.formContainer {
  margin: 30px;
}
</style>
