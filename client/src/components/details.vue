<template>
  <v-layout class="mainContainer">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="elevation-12">
        <v-toolbar flat dark color="#07889B">
          <v-toolbar-title class="tableTitle"> Contact details </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs7>
              <v-list-tile-content class="infoContainer">
                <v-list-tile-title>
                  <v-icon>person</v-icon>
                  {{ contact.firstName }} {{ contact.lastName }}
                </v-list-tile-title>
                <v-list-tile-sub-title class="emailBar">
                  <v-icon>fa fa-envelope</v-icon>
                  {{ contact.email }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-list two-line>
            <v-list-tile-content class="primaryNumberContainer">
              <v-list-tile-title> Primary number: </v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon color="orange">far fa-star</v-icon>
                {{ contact.primaryNumber.number }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title> {{ contact.primaryNumber.numberType }} </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list>
          <v-divider light></v-divider>
          <v-list class="numbersContainer">
            <v-list-tile-title> All numbers: </v-list-tile-title>
            <v-layout v-for="(number, index) in contact.PhoneNumbers" :key="index" row wrap>
              <v-list two-line>
                <v-list-tile-content>
                  <v-list-tile-title><v-icon>phone</v-icon>{{ number.number }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ number.numberType }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list>
            </v-layout>
          </v-list>
        </v-card-text>
        <v-card-actions class="buttons">
          <v-btn @click="editItem" color="#07889B" flat outline>Edit</v-btn>
          <v-btn @click="navigateTo" flat outline>Return</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import contactService from '@/services/contactService';
import { AsYouType } from 'libphonenumber-js';

export default {
  props: {
    id: { default: 0, type: [ String, Number ] }
  },
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        PhoneNumbers: [ { number: '', numberType: null, isMain: true } ],
        primaryNumber: ''
      }
    };
  },
  methods: {
    editItem() {
      const id = this.contact.id;
      this.$router.push({ name: 'editContact', params: { id } });
    },
    navigateTo() {
      this.$router.push({ name: 'contacts' });
    }
  },
  created() {
    contactService.GetContact(this.id)
      .then(res => {
        Object.assign(this.contact, res.data);
        this.contact.PhoneNumbers.forEach(phoneNumber => {
          const number = new AsYouType('US').input(phoneNumber.number);
          const primaryNumber = { number, numberType: phoneNumber.numberType };
          if (phoneNumber.isMain === true) Object.assign(this.contact, { primaryNumber });
          phoneNumber.number = number;
        });
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.infoContainer {
  font-size: 28px;
  padding: 20px;
}
.primaryNumberContainer {
  margin-left: 10px;
}
.numbersContainer {
  margin-left: 10px;
}
.emailBar {
  margin-top: 15px;
}
.elevation-12 {
  font-size: 16px;
}
.buttons {
  justify-content: center;
}
</style>
