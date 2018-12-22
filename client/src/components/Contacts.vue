<template>
  <div class="container">
    <v-toolbar flat dark color="teal lighten-5">
      <v-toolbar-title class="tableTitle"> My contacts </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="deleteAll" color="#07889B" flat outline > Delete all </v-btn>
      <v-btn @click="addContact" outline color="#07889B" dark class="mb-2"> Add contact </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="contacts" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.firstName }}</td>
        <td class="text-xs-left">{{ props.item.lastName }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.primaryNumber }}</td>
        <td class="justify-center layout px-0">
          <v-icon @click="itemDetails" color="#07889B"> fa-file-alt </v-icon>
          <v-icon @click="editItem" class="editBtn"> edit </v-icon>
          <v-icon @click="dialog=true" color="#ff8700"> delete </v-icon>
        </td>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text> Are you sure you want to delete this item? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" color="#07889B" flat> No </v-btn>
              <v-btn @click="deleteItem(props.item)" color="#07889B" flat> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import contactService from '@/services/contactService';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Firstname', value: 'firstName' },
        { text: 'Lastname', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Primary number', value: 'number' }
      ],
      contacts: []
    };
  },
  methods: {
    addContact() {
      this.$router.push({ name: 'addContact' });
    },
    editItem() {
      this.$router.push({ name: 'editContact' });
    },
    itemDetails() {
      this.$router.push({ name: 'details' });
    },
    deleteItem(contact) {
      contactService.DeleteContact(contact.id)
        .then(res => {
          // res
        });
      // const index = this.contacts.indexOf(item);
      // this.contacts.splice(index, 1);
    },
    deleteAll() {
      contactService.DeleteAllContacts()
        .then(res => {
          console.log(res);
        });
      this.contacts = [];
      this.checkDialog = false;
    }
  },
  created() {
    contactService.GetAllContacts()
      .then(res => {
        const contacts = res.data;
        contacts.forEach(contact => {
          contact.phoneNumbers.forEach(phoneNumber => {
            if (phoneNumber.isMain === true) {
              Object.assign(contact, { primaryNumber: phoneNumber.number });
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
  max-width: 70%;
}
.editBtn {
  margin: 20px;
  color: #00BCD4;
}
.addBtn {
  float: right;
}
.isMain {
  padding-left: 50px;
  max-width: 30px;
}
.numberInput {
  float: left;
}
table.v-table thead tr th {
  font-size: 16px;
}
table.v-table tbody tr td {
  font-size: 16px;
}
.tableTitle {
  font-size: 25px;
  color: #07889B
}
</style>
