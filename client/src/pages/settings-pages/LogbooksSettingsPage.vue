<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Logbook } from 'src/models/logbook/logbook';
import { LogbookLocalService } from 'src/services/local/logbook.local.service';

const logbooks: Ref<Logbook[]> = ref([]);

onMounted(() => {
  logbooks.value = LogbookLocalService.getLocalLogbooks();
});

const onSwitch = () => {
  LogbookLocalService.saveLogbooksData(logbooks.value);
};
</script>

<template>
  <div>
    <!-- <q-separator spaced /> -->
    <q-item-label header>Select visible logbooks</q-item-label>

    <q-item
      v-for="lb in logbooks"
      tag="label"
      v-ripple
      style="max-width: 500px"
    >
      <q-item-section side top>
        <q-checkbox v-model="lb.isChoosen" @update:model-value="onSwitch" />
        <!-- <q-toggle v-model="lb.isChoosen" /> -->
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ lb.name }}</q-item-label>
        <q-item-label caption>
          {{ lb.field1 }}
          {{ lb.field2 }}
          {{ lb.field3 }}
          {{ lb.field4 }}
        </q-item-label>
      </q-item-section>
      <!-- <q-btn icon="edit" title="Edit logbook" /> -->
    </q-item>

    <!-- <q-separator spaced /> -->
  </div>
</template>
