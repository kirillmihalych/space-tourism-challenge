<template>
  <section class="destination-page">
    <NavbarBasic />
    <div class="stack wrapper font-barlow-condensed-regular text-center text-color-primary">
      <h1 class="title text-size-6 tracking-sm uppercase"><span class="opacity-25">01</span>Pick Your Destination</h1>
      <div class="content-desktop-layout">
        <div class="img-wrapper">
          <img v-if="route.hash === '#mars'" src="../assets/destination/image-mars.png" alt="mars image" />
          <img v-else-if="route.hash === '#europa'" src="../assets/destination/image-europa.png" alt="moon image" />
          <img v-else-if="route.hash === '#titan'" src="../assets/destination/image-titan.png" alt="mars image" />
          <img v-else="route.hash === '#moon'" src="../assets/destination/image-moon.png" alt="moon image" />
        </div>
        <div class="content">
          <div class="snap-tabs stack">
            <nav>
              <ul class="tabs-navigation">
                <li
                  v-for="(destinationName, index) in destinationNames"
                  :key="index"
                  class="tabs__nav-item text-size-9 uppercase"
                >
                  <a :href="`#${destinationName.toLowerCase()}`">{{ destinationName }}</a>
                  <span v-show="isTabSelected(destinationName.toLowerCase())" class="active"></span>
                </li>
              </ul>
            </nav>
            <section class="snap-tabs-x">
              <article
                v-for="(destination, index) in destinations"
                :key="index"
                :id="destination.name.toLowerCase()"
                class="stack"
              >
                <h2 class="font-bellefair-regular text-size-2 uppercase">{{ destination.name }}</h2>
                <p class="text-size-9 leading-xl text-color-secondary">
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
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import data from '../data/data.json'
import NavbarBasic from '@/components/NavbarBasic.vue'

const route = useRoute()

const destinations = data.destinations
const destinationNames = destinations.map((destination) => destination.name)

const isTabSelected = (tabName) => {
  let hash = route.hash
  if (!hash) {
    hash = '#moon'
  }
  return `#${tabName}` === hash
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
