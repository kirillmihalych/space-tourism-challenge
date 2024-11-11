<template>
  <div class="tech-page">
    <div class="content-wrapper">
      <NavbarBasic />
      <div>
        <h2 class="tech-page__title font-barlow-condensed-regular text-size-6 uppercase text-color-primary text-center">
          <span class="tech-page__title--number">03</span>space launch 101
        </h2>
        <div class="grid-container">
          <picture class="grid-container__picture">
            <source media="(min-width: 1440px)" :srcset="imagePortrait" />
            <img class="img" :src="imageLandscape" alt="" />
          </picture>
          <div class="content">
            <nav aria-labeel="pagination" class="pagination">
              <button
                v-for="n in 3"
                :key="n"
                @click="selectTab(n)"
                class="pagination__btn font-bellefair-regular"
                :class="[n === activeTechIndex + 1 ? 'active' : '']"
                :aria-label="`Page ${n}`"
                :aria-current="[n === activeTechIndex + 1 ? 'page' : 'false']"
              >
                {{ n }}
              </button>
            </nav>
            <div>
              <dl class="definition-list font-bellefair-regular uppercase text-color-primary">
                <dt class="text-size-4 opacity-25">The Terminology...</dt>
                <dd class="text-size-3-4">{{ tech[0].name }}</dd>
              </dl>
              <p class="content__desc font-barlow-condensed-regular">
                {{ tech[0].description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavbarBasic from '@/components/NavbarBasic.vue'
import data from '../data/data.json'

const tech = data.technology

const activeTechIndex = ref(0)
const activeTechItem = computed(() => {
  return tech[activeTechIndex.value]
})

const imagePortrait = computed(() => {
  return new URL(activeTechItem.value.images.portrait, import.meta.url).href
})

const imageLandscape = computed(() => {
  return new URL(activeTechItem.value.images.landscape, import.meta.url).href
})

function selectTab(index) {
  activeTechIndex.value = index - 1
}
</script>

<style scoped>
.tech-page {
  background-image: url(../assets/technology/background-technology-mobile.jpg);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: cover;
  height: 100vh;
  overflow: auto;
}

.tech-page__title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-block-start: 1.5rem;
  margin-block-end: 5.25rem;
}

.tech-page__title--number {
  opacity: 0.5;
}

.grid-container {
  display: grid;
  place-items: center;
  padding-inline: clamp(2rem, -0.8169rem + 12.0188vw, 10rem);
  padding-block-end: 150px;
}

.grid-container__picture {
  width: 130%;
  overflow: hidden;
}

.img {
  object-fit: cover;
}

.definition-list {
  display: grid;
  gap: 1rem;
  place-items: center;
  margin-block-end: 1rem;
}

.pagination {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-block: 2rem;
}

.pagination__btn {
  width: clamp(2.5rem, 1.6189rem + 3.7594vw, 5rem);
  height: clamp(2.5rem, 1.6189rem + 3.7594vw, 5rem);
  font-size: clamp(1.125rem, 0.8166rem + 1.3158vw, 2rem);
  border-radius: 50%;
  border: 1px solid rgb(250, 250, 250, 0.25);
  background: transparent;
  color: var(--white);
}

.content__desc {
  text-align: center;
  color: var(--blue-300);
  line-height: 1.8;
  font-size: var(--size-400);
  max-width: 512px;
}

.active {
  color: var(--blue-900);
  background-color: var(--white);
}

@media (min-width: 768px) {
  .tech-page {
    background-image: url(../assets/technology/background-technology-tablet.jpg);
  }

  .tech-page__title {
    justify-content: start;
    padding-inline-start: 150px;
  }
}

@media (min-width: 1440px) {
  .tech-page {
    background-image: url(../assets/technology/background-technology-desktop.jpg);
  }

  .grid-container {
    grid-template-columns: auto auto;
    padding-inline-end: 0;
    padding-inline-start: 150px;
    padding-block-start: 0;
    column-gap: 2rem;
  }

  .grid-container__picture {
    width: 100%;
    height: 600px;
  }

  .img {
    height: 100%;
  }

  .pagination {
    flex-direction: column;
  }

  .content {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .content__desc {
    max-width: 500px;
    text-align: start;
  }

  .definition-list {
    place-items: start;
  }
}
</style>
