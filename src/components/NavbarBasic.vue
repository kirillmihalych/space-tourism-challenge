<template>
  <header class="navbar-wrapper">
    <nav class="navbar">
      <h2 class="visually-hidden">Main menu</h2>
      <div class="logo-wrapper">
        <img src="../assets/shared/logo.svg" alt="" class="logo" />
      </div>
      <div aria-hidden="true" class="horizontal-line"></div>
      <ul id="main-navigation" class="nav" :class="[isLinksVisible ? 'visible-links' : 'hidden-links']" role="menu">
        <li
          v-for="({ path, name }, index) in routes"
          :key="path"
          role="none"
          class="nav-item font-barlow-condensed-regular uppercase"
          :class="[currentPath === name ? 'active-link' : '']"
          ref="menuitems"
        >
          <RouterLink
            :to="path"
            :tabindex="setTabIndex(name)"
            role="menuitem"
            ref="menuitem"
            :aria-labelledby="name"
            @keydown.right="focusNextLink"
            @keydown.left="focusPrevLink"
            @keydown.esc="closeMenu"
            ><span>{{ paddedNumber(index) }}</span
            >{{ name }}</RouterLink
          >
        </li>
      </ul>
      <button
        ref="menubtn"
        class="btn"
        @click="doToggleMenu"
        @keydown.enter="enterMenu"
        @keydown.space="enterMenu"
        aria-controls="main-navigation"
        aria-label="navigation"
        aria-haspopup="menu"
        :aria-expanded="isLinksVisible"
      >
        <img
          v-if="!isLinksVisible"
          src="../assets/shared/icon-hamburger.svg"
          alt="hamburger icon button that opens the menu in the mobile version"
        />
        <img v-else src="../assets/shared/icon-close.svg" alt="close menu button" />
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, useTemplateRef } from 'vue'

const routes = useRouter().getRoutes()
const routePath = useRoute().path
const isLinksVisible = ref(false)
const focusedLink = ref('home')
const menuBtn = useTemplateRef('menubtn')
const menuItems = useTemplateRef('menuitems')

const currentPath = computed(() => {
  const route = routes.find((route) => route.path === routePath)
  return route.name
})

const focusedLinkIndex = computed(() => {
  return linkNameList.indexOf(focusedLink.value)
})

const linkNameList = routes.map((route) => route.name)

function doToggleMenu() {
  isLinksVisible.value = !isLinksVisible.value
}

function focusPrevLink() {
  if (focusedLinkIndex.value === 0) {
    return
  } else {
    const index = focusedLinkIndex.value - 1
    focusedLink.value = linkNameList[index]
    menuItems.value[index].firstChild.focus()
  }
}

function focusNextLink() {
  if (focusedLinkIndex.value === linkNameList.length - 1) {
    return
  } else {
    const index = focusedLinkIndex.value + 1
    focusedLink.value = linkNameList[index]
    menuItems.value[index].firstChild.focus()
  }
}

function closeMenu() {
  isLinksVisible.value = false
  menuBtn.value.focus()
}

function openMenu() {
  isLinksVisible.value = true
}

function setFocusOnFirstLink() {
  menuItems.value[0].firstChild.focus()
  menuItems.value[0].firstChild.setAttribute('tabindex', '0')
}

function enterMenu() {
  openMenu()
  setFocusOnFirstLink()
}

function setTabIndex(name) {
  return name === focusedLink.value ? '0' : '-1'
}

function paddedNumber(num) {
  return `0${num}`
}
</script>

<style scoped>
.hidden-links {
  transform: translateX(100%);
}

.visible-links {
  transform: translateY(0);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-600, 2rem);
}

.logo {
  width: clamp(2.5rem, 2.0229rem + 2.0356vw, 3rem);
}

.nav {
  list-style: none;
  position: fixed;
  z-index: 2;
  right: 0;
  top: 0;
  bottom: 0;
  width: 65vw;
  max-width: 736px;
  background-color: hsla(230 35.29% 6.67% / 0.15);
  backdrop-filter: blur(35px);
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
  padding-block-start: 10rem;
  padding-inline-start: 2rem;
}

.active-link {
  border-inline-end: 3px solid var(--white);
}

.nav-item {
  width: 100%;
}

.nav-item > a {
  display: flex;
  gap: var(--size-300);
  text-decoration: none;
  letter-spacing: 2px;
}

.nav-item > a:visited {
  color: var(--white);
}

.nav-item:hover {
  border-inline-end: 3px solid hsla(0 0 100 / 0.5);
}

.btn {
  position: relative;
  z-index: 3;
}

.horizontal-line {
  display: none;
}

@media (min-width: 768px) {
  .btn {
    display: none;
  }

  .navbar {
    padding: 0;
    justify-content: end;
  }

  .logo-wrapper {
    margin-inline: auto;
    padding-inline: var(--size-700);
  }

  .nav {
    padding-block-start: 0;
    transform: translateX(0);
    position: static;
    display: flex;
    justify-content: end;
    flex-direction: row;
    background-color: hsla(0 0% 100% / 0.05);
    backdrop-filter: blur(80px);
    width: 100%;
    gap: var(--size-800);
    padding-inline: var(--size-600);
    color: var(--white);
  }

  .nav-item {
    padding-block: var(--size-700);
    width: auto;
  }

  .active-link {
    border-inline-end: 0;
    border-block-end: 3px solid var(--white);
  }

  .nav-item:hover {
    border-inline-end: 0;
    border-block-end: 3px solid hsla(0 0 100 / 0.5);
  }
}

@media (min-width: 1024px) {
  .navbar-wrapper {
    padding-block-start: var(--size-700);
  }

  .horizontal-line {
    position: relative;
    z-index: 2;
    right: -1rem;
    display: block;
    height: 1px;
    width: 100%;
    background-color: var(--white);
    opacity: 0.25;
  }
}
</style>
