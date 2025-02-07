<script>
import { RouterLink, RouterView } from 'vue-router';


export default {

  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

};
</script>

<template>

  <body>
    <a class="admin" href="/public/login.html">
      <i class="bi bi-person-circle"></i>
    </a>

    <RouterLink to="/">
      <div class="logo">
        <div class="icon">🏝️</div>
        <div class="text">
          <span class="primary">Djerba</span>
          <span class="secondary">Guide</span>
        </div>
      </div>
    </RouterLink>

    <div class="wrapper">
      <nav>
        <RouterLink class="link" to="/">Home</RouterLink>
        <span class="link" @click.native="scrollToSection('intro_Gallery')">Gallery</span>
        <span class="link" @click.native="scrollToSection('Sectionblog')">Blog</span>
        <span class="link" @click.native="scrollToSection('SectionAbout')">About</span>
        <span class="link" @click.native="scrollToSection('SectionContact')">Contact</span>
      </nav>
    </div>


    <RouterView />

    <!-- Section Gallery -->


    <!-- Bouton pour remonter en haut -->
    <button class="scroll-to-top" @click="scrollToTop">
      <i class="bi bi-chevron-up"></i>
    </button>

    <!-- Curseur personnalisé -->
  </body>
</template>

<style>
.admin {
  width: 4%;
  height: auto;
  text-align: center;
  color: #fcfcfc;
  font-weight: bold;
  font-size: 1.5rem;
  position: relative;
  top: 5px;
  right: -45rem;
}

.admin:hover {
  cursor: pointer;
  background-color: #fcfcfc;
  color: #6a11cb;
  border-radius: 50%;
}

/* Styles globaux */


.wrapper {
  width: 70%;
}

nav {
  max-height: 10vh;
  width: auto;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  position: absolute;
  right: 2rem;
  top: 1rem;
}

.link {
  margin-right: 1rem;
  font-size: 20px;
  color: #fcfcfc;
  font-weight: bold;
  padding: 1rem;
  border-radius: 1.5rem;
}

.link:hover {
  color: #f4e3c1;
  text-decoration: overline;
  transition: 0.6s;
  cursor: pointer;
}

.logo {
  width: auto;
  height: auto;
  position: absolute;
  left: 2rem;
  top: 2rem;
  font-size: 24px;
}

body {
  font-family: 'Montserrat';
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.icon {
  font-size: 60px;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2rem;
  margin-left: -1rem;
  font-family: 'Montserrat';
}

.text .primary {
  font-size: 36px;
  font-weight: bold;
  color: #fcfcfc;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.text .secondary {
  font-size: 24px;
  color: #ffc857;
  font-style: italic;
  margin-left: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0096d6;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #007bb5;
  transition: background-color 0.3s ease;
}

.scroll-to-top i {
  font-size: 24px;
}
</style>
