<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="detailBox">
        <v-toolbar flat light color="teal lighten-5">
          <v-toolbar-title v-model="contact" class="tableTitle"> Contact details </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs7>
              <v-card-title primary-title>
                <div class="contactDetails">
                  <div class="headline">
                    <v-icon>person</v-icon>
                    {{ contact.firstName }} {{ contact.lastName }}
                  </div>
                  <div><v-icon>fa fa-envelope</v-icon> {{ contact.email }} </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-layout v-for="(number, index) in contact.PhoneNumbers" :key="index" row wrap>
            <v-list two-line>
              <v-list-tile-content>
                <v-list-tile-title><v-icon>phone</v-icon>{{ number.number }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ number.numberType }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editItem" flat color="#ff8700">Edit</v-btn>
          <v-btn @click="navigateTo" flat color="#ff8700">Return</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import contactService from '@/services/contactService';

export default {
  props: {
    id: { default: 0, type: Number }
  },
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        PhoneNumbers: [ { number: '', numberType: null, isMain: true } ]
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
      .then(res => Object.assign(this.contact, res.data))
      .catch(err => console.log(err));
    console.log(this.contact);
  }
};
</script>

<style scoped>
</style>
