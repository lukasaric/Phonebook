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
        <td class="text-xs-left">{{ props.item.isMain }}</td>
        <td class="text-xs-left">{{ props.item.number }}</td>
        <td class="justify-center layout px-0">
          <v-icon @click="itemDetails(props.item)" color="#07889B"> fa-file-alt </v-icon>
          <v-icon @click="editItem(props.item)" class="editBtn"> edit </v-icon>
          <v-icon @click="dialog=true" color="red"> delete </v-icon>
        </td>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text> Are you sure you want to delete this item? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="checkDialog = false" color="#07889B" flat> No </v-btn>
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
        { text: 'Primary', value: 'isMain' },
        { text: 'Number', value: 'numbers' }
      ],
      editedIndex: -1,
      editedItem: {
        firstName: '',
        lastName: '',
        email: '',
        numbers: []
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        email: '',
        numbers: []
      },
      contacts: [],
      phoneNumber: { number: 0, isMain: false }
    };
  },
  methods: {
    addContact() {
      this.$router.push({ name: 'addContact' });
    },
    editItem(item) {
      this.$router.push({ name: 'editContact' });
    },
    itemDetails(item) {
      this.$router.push({ name: 'details' });
    },
    deleteItem(item) {
      const index = this.contacts.indexOf(item);
      this.contacts.splice(index, 1);
      console.log(contactService);
    },
    deleteAll() {
      this.contacts = [];
      this.checkDialog = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
}
.editBtn {
  margin-right: 20px;
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
