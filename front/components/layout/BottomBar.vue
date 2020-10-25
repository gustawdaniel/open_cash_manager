<template>
  <div>
    <div class="filler"></div>

    <div class="container mx-a py-2 border-t fixed bottom-0 bg-white">
      <nav class="flex justify-center">
        <div v-for="(item, index) in menuItems" :key="index" class="w-6 sm:mx-2 md:mx-4">
          <div class="cursor-pointer hover:bg-gray-300 p-1 rounded" @click="item.handler">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-for="path in item.icon.paths" :key="path.d" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" :d="path.d"/>
            </svg>
          </div>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
export default {
  name: "BottomBar",
  computed: {
    menuItems() {
      return [
        {
          icon: {
            paths: [{d: 'M12 6v6m0 0v6m0-6h6m-6 0H6'}]
          },
          handler: () => {
            return this.$router.push({path: 'transactions/add', query: this.$route.query})
          }
        },
        {
          icon: {
            paths: [{d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'}]
          }
        },
        {
          icon: {
            paths: [{d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'}]
          }
        },
        {
          icon: {
            paths: [{d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'}]
          }
        },
        {
          icon: {
            paths: [{d: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'}, {d: 'M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'}]
          }
        },
        {
          icon: {
            paths: [{d: 'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'}]
          },
          handler: this.openThreeDotsMenu
        },
      ].map(e => {
        return {
          handler: () => {
          },
          ...e
        }
      })
    }
  },
  methods: {
    openThreeDotsMenu(event) {
      const ctxMenuData = [
        {
          title: "account.add",
          handler: (e) => {
            this.$router.push({path: '/account/add'})
          }
        },
        {
          title: "common.database",
          handler: async e => {

            await this.$nextTick();

            const ctxMenuData = [
              {
                title: "database.import",
                handler: (e) => {
                  console.log("import", e);
                }
              },
              {
                title: "database.export",
                handler: (e) => {
                  console.log("export", e)
                  this.$store.dispatch('database/export');
                }
              },
              {
                title: "database.truncate",
                handler: (e) => {
                  console.log("truncate", e)
                }
                // handler: this.toggleShowHidden.bind(this, element)
              }
            ];

            this.$root.$emit("contextmenu", {event, ctxMenuData});

          }
        },
        {
          title: "common.settings",
          handler: (e) => {
            console.log(e)
          }
        }
      ];

      this.$root.$emit("contextmenu", {event, ctxMenuData});
    }
  },
}
</script>

<style scoped>
.filler {
  min-height: 41px;
}
</style>
