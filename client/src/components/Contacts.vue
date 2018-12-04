<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My contacts</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn @click="deleteAll" color="indigo" flat outline>Delete all</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" outline color="indigo" dark class="mb-2">Add contact</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <form>
              <v-text-field
                v-validate="'required|max:10'"
                v-model="editedItem.firstName"
                :counter="10"
                label="Firstname"
                data-vv-name="name"
                required>
              </v-text-field>
              <v-text-field
                v-validate="'required|max:10'"
                v-model="editedItem.lastName"
                :counter="10"
                label="Lastname"
                data-vv-name="name"
                required>
              </v-text-field>
              <v-text-field
                v-validate="'required|email'"
                v-model="editedItem.email"
                label="E-mail"
                data-vv-name="email"
                required>
              </v-text-field>
              <div class="numbersContainer">
                <v-btn
                  class="addBtn"
                  color="indigo"
                  small
                  fab
                  dark
                  outline>
                  <v-icon dark>add</v-icon>
                </v-btn>
                <v-text-field
                  v-validate="'required'"
                  v-model="phoneNumber.number"
                  class="numberInput"
                  label="Number"
                  data-vv-name="numbers"
                  required>
                </v-text-field>
                <v-checkbox
                  v-validate="'required'"
                  v-model="phoneNumber.isMain"
                  class="isMain"
                  value="1"
                  label="Primary"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required>
                </v-checkbox>
              </div>
            </form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close" color="indigo" flat>Cancel</v-btn>
            <v-btn @click="save" color="indigo" flat>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="contacts" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.firstName }}</td>
        <td class="text-xs-right">{{ props.item.lastName }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.isMain }}</td>
        <td class="text-xs-right">{{ props.item.number }}</td>
        <td class="justify-center layout px-0">
          <v-icon @click="editItem(props.item)" class="editBtn"> edit </v-icon>
          <v-icon @click="checkDialog=true"> delete </v-icon>
        </td>
        <v-dialog v-model="checkDialog" max-width="290">
          <v-card>
            <v-card-text>Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="checkDialog = false"
                color="indigo"
                flat>
                No
              </v-btn>
              <v-btn
                @click="deleteItem(props.item)"
                color="indigo"
                flat>
                Yes
              </v-btn>
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
      checkDialog: false,
      headers: [
        { text: 'FirstName', value: 'firstName' },
        { text: 'LastName', value: 'lastName' },
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New contact' : 'Edit contact';
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.editedItem.numbers = this.phoneNumber;
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.contacts.indexOf(item);
      this.contacts.splice(index, 1);
      this.checkDialog = false;
    },
    deleteAll() {
      this.contacts = [];
      this.checkDialog = false;
    },
    close() {
      this.dialog = false;
      this.checkDialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.numbers.push(this.phoneNumber);
        this.contacts.push(this.editedItem);
        contactService.addContact(this.contacts)
          .then(res => {
            console.log(res);
            // this.contacts = res;
          })
          .catch(err => console.log(err));
      }
      this.close();
      console.log('EDITED INDEX:', this.editedIndex);
      console.log('CONTACT ARRAY: ', this.contacts);
      console.log('EDITED ITEM:', this.editedItem);
    }
  }
};
</script>

<style scoped>
.editBtn {
  margin-right: 20px;
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
</style>
