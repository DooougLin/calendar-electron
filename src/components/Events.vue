<template>
    <div>
        <v-data-table class="elevation-4" disable-pagination hide-default-footer disable-sort hide-default-header :headers="headers" :items="records">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Review Record</v-toolbar-title>
                </v-toolbar>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'Events',
    data: () => ({
        headers: [{text: 'Name', value: 'name'}]
    }),
    computed: {
        records: function(){
            return this.$store.state.clickDataFromCalendar.map(i => ({
                name: i.title
            }));
        }
    }
};
</script>