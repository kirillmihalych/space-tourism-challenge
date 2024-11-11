<template>
  <section class="home-page text-center">
    <div class="content-wrapper">
      <NavbarBasic />
      <div class="home-page-grid wrapper">
        <div class="home-content stack text-color-secondary">
          <p class="font-barlow-condensed-regular text-size-6 uppercase tracking">So, you want to travel to</p>
          <h1 class="font-bellefair-regular text-color-primary text-size-1 uppercase">Space</h1>
          <p class="font-barlow-regular text-size-9 leading-xl">
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind
            of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!
          </p>
        </div>
        <RouterLink
          to="/destination"
          aria-label="explore"
          class="btn btn-explore font-bellefair-regular text-size-4 uppercase"
        >
          Explore
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import NavbarBasic from '../components/NavbarBasic.vue'

const routes = useRouter().getRoutes()
</script>

<style scoped>
.home-page {
  background-image: url(../assets/home/background-home-mobile.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  overflow: auto;
}

.home-content {
  margin-inline: auto;
}

.home-content > p:last-child {
  max-width: var(--max-line-width);
}

.home-page-grid {
  display: grid;
  grid-auto-rows: 1fr;
  gap: 1rem;
}

.btn-explore {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  position: relative;
  z-index: 1;
  cursor: pointer;
  align-self: end;
  justify-self: center;
  width: clamp(9rem, 1.3664rem + 32.57vw, 17rem);
  height: clamp(9rem, 1.3664rem + 32.57vw, 17rem);
  border-radius: 50%;
  background-color: var(--white);
  -webkit-tap-highlight-color: transparent;
}

.btn-explore:visited {
  color: black;
}

.btn-explore::after {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: hsl(0 0 100 / 0.25);
  transition: transform 0.2s ease-in-out;
}

@media (min-width: 768px) {
  .home-page {
    background-image: url(../assets/home/background-home-tablet.jpg);
  }

  .home-page-grid {
    gap: 3rem;
  }
}

@media (min-width: 1024px) {
  .home-page {
    background-image: url(../assets/home/background-home-desktop.jpg);
  }

  .home-page-grid {
    margin-block-start: 128px;
    grid-template-columns: auto 1fr;
  }

  .home-content {
    text-align: start;
  }

  .btn-explore {
    justify-self: end;
    align-self: center;
  }

  .btn-explore:hover::after {
    transform: scale(1.5);
  }
}
</style>
