<template>
  <section class="crew-page">
    <div class="content-wrapper">
      <NavbarBasic />
      <div class="crew-page__layout wrapper">
        <div class="grid-container">
          <h2 class="crew-page__title"><span class="crew-page__title--number">02</span>Meet your crew</h2>
          <div class="crew-member-content">
            <dl>
              <dt class="crew-member-content__role">{{ crewMember.role }}</dt>
              <dd class="crew-member-content__name">{{ crewMember.name }}</dd>
            </dl>
            <p class="crew-member-content__bio">
              {{ crewMember.bio }}
            </p>
          </div>
          <nav aria-label="pagination" class="crew-member-content__pagination">
            <button
              v-for="index in crewIndexes"
              :key="index"
              class="crew-member-content__btn-pagination"
              @click.prevent="showCrewMember(index)"
              :class="index - 1 === activeCrewMember ? 'crew-member-content__btn-pagination--active' : ''"
              :aria-label="`Page ${index}`"
              :aria-current="index - 1 === activeCrewMember ? 'page' : 'false'"
            ></button>
          </nav>
        </div>
        <div class="image-wrapper">
          <img :src="image" alt="" class="crew-member-content__image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '../data/data.json'
import { ref, computed } from 'vue'
import NavbarBasic from '@/components/NavbarBasic.vue'

const crew = data.crew
const activeCrewMember = ref(0)

const crewIndexes = computed(() => {
  return crew.length
})

const crewMember = computed(() => {
  return crew[activeCrewMember.value]
})

const image = computed(() => {
  return new URL(crewMember.value.images.png, import.meta.url).href
})

function showCrewMember(index) {
  activeCrewMember.value = index - 1
}
</script>

<style scoped>
.crew-page {
  background-image: url(../assets/crew/background-crew-mobile.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
  text-align: center;
}

.crew-page__layout {
  display: grid;
  gap: 2rem;
}

.crew-page__title {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: var(--size-600);
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.15rem;
}

.crew-page__title--number {
  opacity: 0.25;
}

.grid-container {
  display: grid;
  gap: 1.5rem;
  margin-block-end: 2rem;
}

.crew-member-content {
  display: grid;
  gap: 1.5rem;
  font-family: 'Bellefair', serif;
  color: var(--white);
  padding-block: 2.5rem;
  margin-block-end: 0;
}

.crew-member-content__role {
  text-transform: uppercase;
  font-size: var(--size-650);
  margin-block-end: clamp(0.5rem, 0.0229rem + 2.0356vw, 1rem);
  opacity: 0.5;
}

.crew-member-content__name {
  text-transform: uppercase;
  font-size: var(--size-750);
}

.crew-member-content__bio {
  font-family: 'Barlow', sans-serif;
  font-size: var(--size-400);
  line-height: 1.8;
  color: var(--blue-300);
}

.crew-member-content__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  gap: 1rem;
}

.crew-member-content__btn-pagination {
  display: inline-block;
  width: clamp(0.625rem, 0.515rem + 0.4695vw, 0.9375rem);
  height: clamp(0.625rem, 0.515rem + 0.4695vw, 0.9375rem);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--white);
  opacity: 0.5;
}

.crew-member-content__btn-pagination--active {
  opacity: 1;
}

.image-wrapper > img {
  height: clamp(21.25rem, 16.1413rem + 25.5435vw, 35.9375rem);
  object-fit: contain;
  object-position: bottom;
  mask-image: linear-gradient(to top, transparent 5%, black 100px);
}

@media (min-width: 768px) {
  .crew-page {
    background-image: url(../assets/crew/background-crew-tablet.jpg);
  }

  .crew-member-content__image {
    position: relative;
  }
}

@media (min-width: 1440px) {
  .crew-page {
    background-image: url(../assets/crew/background-crew-desktop.jpg);
  }

  .crew-page__layout {
    text-align: start;
    grid-template-columns: max(600px) 1fr;
    grid-auto-rows: 1fr;
  }

  .crew-page__title {
    justify-content: start;
  }

  .grid-container {
    display: grid;
    grid-template-rows: auto minmax(auto, 550px) auto;
  }

  .crew-member-content {
    padding-block: 180px;
  }

  .image-wrapper {
    align-self: end;
  }

  .crew-member-content__pagination {
    padding-block: 2.5rem;
    gap: 2.5rem;
    justify-content: start;
  }
}
</style>
