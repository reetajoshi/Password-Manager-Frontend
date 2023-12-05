<template>
  <div>
    <b-modal
        v-model="$store.state['home'].addListItemModal.show"
        title="Add Password Data"
        @ok="$store.dispatch('home/addListItem')"
    >
      <b-input-group prepend="Website" class="mt-3">
        <b-form-input
            :value="$store.state['home'].addListItemModal.formData.website"
            @input="website => $store.commit('home/setListItemFormData',{website})"
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="User Name" class="mt-3">
        <b-form-input
            :value="$store.state['home'].addListItemModal.formData.username"
            @input="username => $store.commit('home/setListItemFormData',{username})"
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Email" class="mt-3">
        <b-form-input
            :value="$store.state['home'].addListItemModal.formData.email"
            @input="email => $store.commit('home/setListItemFormData',{email})"
        ></b-form-input>
      </b-input-group>
      <b-input-group prepend="Password" class="mt-3">
        <b-form-input
            :type="$store.state['home'].addListItemModal.showPassword? 'text': 'password'"
            :value="$store.state['home'].addListItemModal.formData.password"
            @input="password => $store.commit('home/setListItemFormData',{password})"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="success"
                    @click="$store.commit('home/setListItemFormData',{showPassword: !$store.state['home'].addListItemModal.showPassword})">
            <b-icon :icon="`eye-${$store.state['home'].addListItemModal.showPassword? '': 'slash-'}fill`"></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
  </div>
</template>
<script>
export default {}
</script>