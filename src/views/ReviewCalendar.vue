<template>
    <div>
        <v-row class="ma-2">
            <v-col cols="5">
                <Events></Events>
            </v-col>
            <v-col>
                <Calendar></Calendar>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import Events from '@/components/Events.vue';

export default {
    name: 'Home',
    components: {
        Calendar,
        Events
    }
};
</script>

<style>
</style>