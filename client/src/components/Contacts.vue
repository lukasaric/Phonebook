<template>
  <div class="container">
    <v-toolbar flat dark color="teal lighten-5">
      <v-toolbar-title class="tableTitle"> My contacts </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        light
        class="searchBox"
        color="#07889B">
      </v-text-field>
      <v-card-actions>
        <v-btn @click="delAllDialog=true" color="#07889B" small flat outline > Delete all </v-btn>
        <v-btn @click="addContact" color="#07889B" small flat outline > Add contact </v-btn>
      </v-card-actions>
    </v-toolbar>
    <v-data-table :headers="headers" :items="contacts" :search="search" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.primaryNumber }}</td>
        <td class="justify-center layout px-0">
          <v-icon @click="itemDetails(props.item.id)" color="#07889B"> fa-file-alt </v-icon>
          <v-icon @click="editItem(props.item.id)" class="editBtn"> edit </v-icon>
          <v-icon @click="onDialog(props.item)" color="error"> delete </v-icon>
        </td>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text> Are you sure you want to delete {{ contact.firstName }} from contacts? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog=false" color="#07889B" flat> No </v-btn>
              <v-btn @click="deleteItem" color="#07889B" flat> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="delAllDialog" max-width="290">
          <v-card>
            <v-card-text> Are you sure you want to delete all contacts? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="delAllDialog=false" color="#07889B" flat> No </v-btn>
              <v-btn @click="deleteAll" color="#07889B" flat> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import contactService from '@/services/contactService';
import { AsYouType } from 'libphonenumber-js';

export default {
  data() {
    return {
      search: '',
      dialog: false,
      delAllDialog: false,
      headers: [
        { text: 'Firstname', value: 'firstName' },
        { text: 'Lastname', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Primary number', value: 'number' }
      ],
      contacts: [],
      contact: {},
      UserFk: ''
    };
  },
  methods: {
    addContact() {
      this.$router.push({ name: 'addContact' });
    },
    editItem(id) {
      this.$router.push({ name: 'editContact', params: { id } });
    },
    itemDetails(id) {
      this.$router.push({ name: 'details', params: { id } });
    },
    deleteItem() {
      contactService.DeleteContact(this.contact.id)
        .then(res => {
          const index = this.contacts.indexOf(this.contact);
          this.contacts.splice(index, 1);
          this.dialog = false;
        });
    },
    deleteAll() {
      contactService.DeleteAllContacts(this.UserFk)
        .then(res => {
          this.contacts = [];
          this.delAllDialog = false;
        });
    },
    onDialog(contact) {
      this.contact = contact;
      this.dialog = true;
    }
  },
  created() {
    this.UserFk = this.$store.state.user.id;
    contactService.GetAllContacts(this.UserFk)
      .then(res => {
        const contacts = res.data;
        contacts.forEach(contact => {
          contact.phoneNumbers.forEach(phoneNumber => {
            if (phoneNumber.isMain === true) {
              const number = new AsYouType('US').input(phoneNumber.number);
              Object.assign(contact, { primaryNumber: number });
            }
          });
          this.contacts.push(contact);
        });
      });
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.editBtn {
  padding: 10px;
  color: #00BCD4;
}
.addBtn {
  float: right;
}
table.v-table thead tr th {
  font-size: 12px;
  padding: 10px;
}
table.v-table tbody tr td {
  font-size: 12px;
  padding-left: 20px;
}
.tableTitle {
  font-size: 20px;
  color: #07889B
}
.searchBox {
  margin-right: 20px;
  max-width: 300px;
}
</style>
