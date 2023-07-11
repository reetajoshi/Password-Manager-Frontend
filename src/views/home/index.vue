<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="danger" class="px-2 ">
      <b-navbar-brand href="#">KeepPass</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container-fluid p-0 m-0">
      <b-row class="m-0">
        <b-col md="2" class="p-0" style="height: 94vh">
          <b-nav vertical class="w-100 shadow h-100">
            <b-list-group>
              <b-list-group-item
                  v-for="(list, i) in $store.state['home'].list" :key="i"
                  @click="$store.commit('home/setActiveListIndex', i)"
                  :variant="$store.state['home'].activeListIndex === i? 'primary': ''"
              >
                {{ list.name }}
              </b-list-group-item>
              <b-list-group-item class="text-center" @click="$store.commit('home/showAddListModal')">
                Add List +
              </b-list-group-item>
            </b-list-group>
          </b-nav>
        </b-col>
        <b-col md="10" v-if="$store.state['home'].activeListIndex !== undefined">
          <b-table striped hover
                   :items="$store.state['home'].list[$store.state['home'].activeListIndex].items"
                   :fields="$store.state['home'].fields"
                   sort-icon-left
          >
            <template #head(actions)="data">
              <b-row class="justify-content-end">
                {{ data.label }}
              </b-row>
            </template>

            <template #table-caption>
              <b-row>
                <b-button block @click="$store.commit('home/showAddListItemModal')">Add +</b-button>
              </b-row>
            </template>

            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(password)="data">
              {{ data.item.password.split('').map(x => '*').join('') }}
            </template>
            <template #cell(actions)="data">
              <b-row class="justify-content-end">
                <b-button class="col-2" variant="primary" title="copy" @click="copyToClipBoard(data.item.password)">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
                <b-button class="col-2 mx-2" title="edit" @click="implementMethod('todo: implement')">
                  <b-icon-pencil-square></b-icon-pencil-square>
                </b-button>
                <b-button class="col-2" variant="danger" title="delete"
                          @click="$store.dispatch('home/removeListItem', data.index)">
                  <b-icon-trash-fill></b-icon-trash-fill>
                </b-button>
              </b-row>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
    <add-list-modal/>
    <add-list-item-modal/>
  </div>
</template>


<script>
import addList from "./components/addList";
import addListItem from "@/views/home/components/addListItem";

export default {
  components: {
    'add-list-modal': addList,
    'add-list-item-modal': addListItem
  },
  async mounted() {
    const authData = this.$store.getters['auth/userData'];
    if (authData && authData.token) {
      if (authData.storage)
        this.$store.commit('auth/setUserData', authData);
      try {
        await this.$store.dispatch('home/getData')
      } catch (e) {
        this.$store.dispatch('makeToast', {
          message: 'Invalid Keychain Password',
          type: 'Danger'
        })
        this.logout();
      }
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    copyToClipBoard(data) {
      navigator.clipboard.writeText(data)
      this.$store.dispatch('makeToast', {
        message: 'Copied to clipboard',
        type: 'Info'
      })
    },
    implementMethod(data) {
      alert(data)
    },
    logout() {
      localStorage.removeItem('auth:data')
      this.$store.commit('resetState');
      this.$router.push('/login')
    }
  },
}
</script>