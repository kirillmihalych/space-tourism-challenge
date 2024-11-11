<template>
  <section class="destination-page">
    <div class="content-wrapper">
      <NavbarBasic />
      <div class="stack wrapper font-barlow-condensed-regular text-center text-color-primary">
        <h1 class="title text-size-6 tracking-sm uppercase"><span class="opacity-25">01</span>Pick Your Destination</h1>
        <div class="content-desktop-layout">
          <div class="img-wrapper">
            <img :src="image" alt="mars image" />
          </div>
          <div class="content">
            <div class="snap-tabs stack">
              <ul class="tabs-navigation" role="tablist" aria-label="destination list">
                <li
                  v-for="(destinationName, index) in destinationNames"
                  class="tabs__nav-item text-size-9 uppercase"
                  :key="index"
                  role="presentation"
                >
                  <button
                    ref="tabs"
                    :id="destinationName"
                    role="tab"
                    :aria-controls="destinationName"
                    :aria-selected="isAriaSelected(destinationName)"
                    @click="doSelectTab(destinationName)"
                    @keydown.left="prevTab"
                    @keydown.right="nextTab"
                    @keydown.enter=""
                    :tabindex="tabIndex(destinationName)"
                    class="btn btn__tab text-color-primary uppercase"
                    :class="[destinationName === selectedTab ? 'btn__tab--active' : '']"
                  >
                    {{ destinationName }}
                  </button>
                </li>
              </ul>
              <section class="snap-tabs-x">
                <article
                  role="tabpanel"
                  :aria-labelledby="destination.name.toLowerCase()"
                  :id="destination.name.toLowerCase()"
                  class="stack"
                >
                  <h2 class="font-bellefair-regular text-size-2 uppercase">{{ destination.name }}</h2>
                  <p class="description font-barlow-regular text-size-9 leading-xl text-color-secondary">
                    {{ destination.description }}
                  </p>
                  <hr />
                  <dl class="uppercase">
                    <div>
                      <dt class="text-color-secondary text-size-9">Avg. destinace</dt>
                      <dd class="font-bellefair-regular">{{ destination.distance }}</dd>
                    </div>
                    <div>
                      <dt class="text-color-secondary text-size-9">Est. travel time</dt>
                      <dd class="font-bellefair-regular">{{ destination.travel }}</dd>
                    </div>
                  </dl>
                </article>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '../data/data.json'
import { ref, computed, useTemplateRef } from 'vue'
import NavbarBasic from '@/components/NavbarBasic.vue'

const tabs = useTemplateRef('tabs')
const selectedTab = ref('titan')
const destinations = data.destinations
const destinationNames = destinations.map((destination) => destination.name.toLowerCase())

const destination = computed(() => {
  return destinations.find((destination) => destination.name.toLowerCase() === selectedTab.value)
})

const image = computed(() => {
  return new URL(`../assets/destination/image-${destination.value.name.toLowerCase()}.png`, import.meta.url).href
})

const selectedTabIndex = computed(() => {
  return destinationNames.indexOf(selectedTab.value)
})

function doSelectTab(tabName) {
  return (selectedTab.value = tabName)
}
function isAriaSelected(tabName) {
  return selectedTab.value === tabName
}
function tabIndex(tabName) {
  return selectedTab.value === tabName ? '0' : '-1'
}

function prevTab() {
  let prevItem
  if (selectedTabIndex.value === 0) {
    prevItem = destinationNames.length - 1
  } else {
    prevItem = selectedTabIndex.value - 1
  }
  selectedTab.value = destinationNames[prevItem]
  tabs.value[prevItem].focus()
}

function nextTab() {
  const lastIndex = destinationNames.length - 1
  let nextItem
  if (selectedTabIndex.value === lastIndex) {
    nextItem = 0
  } else {
    nextItem = selectedTabIndex.value + 1
  }
  selectedTab.value = destinationNames[nextItem]
  tabs.value[nextItem].focus()
}
</script>

<style scoped>
.destination-page {
  background: url(../assets/destination/background-destination-mobile.jpg) var(--blue-900);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
}

.title > span {
  margin-inline-end: 1.5rem;
  opacity: 0.25;
}

.img-wrapper {
  padding-block: clamp(1.7906rem, -0.3518rem + 9.1408vw, 7.875rem);
}

.img-wrapper > img {
  width: clamp(9.375rem, 1.2446rem + 40.6522vw, 32.75rem);
  margin-inline: auto;
}

.content {
  width: 100%;
  max-width: 60ch;
  margin-inline: auto;
}

.tabs-navigation {
  list-style: none;
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.active {
  display: inline-block;
  background-color: var(--white);
  width: 100%;
  height: 3px;
}

.tabs__nav-item > a {
  display: flex;
  gap: var(--size-300);
  text-decoration: none;
  letter-spacing: 2px;
  color: var(--white);
}

.tabs__nav-item > a:visited {
  color: var(--white);
}

.snap-tabs-x {
  display: flex;
  overflow: hidden;
}

.snap-tabs-x > article {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100%;
}

.description {
  min-height: 164px;
}

dl {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

dt {
  letter-spacing: 2px;
  margin-block-end: 0.75rem;
}

dd {
  font-size: 1.75rem;
}

.btn__tab {
  letter-spacing: 2px;
  padding-block-end: 0.75rem;
}

.btn__tab--active {
  border-block-end: 3px solid var(--white);
}

.btn__tab:hover {
  border-block-end: 3px solid rgba(250, 250, 250, 0.25);
}

@media (min-width: 768px) {
  .destination-page {
    background-image: url(../assets/destination/background-destination-tablet.jpg);
  }

  dl {
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
}

@media (min-width: 1024px) {
  .destination-page {
    background-image: url(../assets/destination/background-destination-desktop.jpg);
  }

  .tabs-navigation {
    justify-content: start;
  }

  dl {
    justify-content: start;
  }

  .content {
    margin-inline: 0;
  }

  .title {
    text-align: start;
  }

  .img-wrapper {
    padding-block: 0;
  }

  .content-desktop-layout {
    text-align: start;
    padding-block: 8.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
}
</style>
