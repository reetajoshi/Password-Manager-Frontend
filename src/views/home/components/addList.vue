<template>
  <div>
    <b-modal
        v-model="$store.state['home'].addListModal.show"
        title="Add List"
        @ok="$store.dispatch('home/addList')"
    >
      <b-input-group prepend="List Title" class="mt-3">
        <b-form-input
            :value="$store.state['home'].addListModal.title"
            @input="e => $store.commit('home/setNewListTitle', e)"
        ></b-form-input>
      </b-input-group>
    </b-modal>
  </div>
</template>

<script>
export default {}
</script>