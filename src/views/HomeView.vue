<script>
export default {
  data() {
    return {
      message: "Discover The Wonders Of Djerba",
      message2:
        "Plan your perfect trip with us and explore the best destinations the world has to offer.",
      email: "",
      errormail: "",
      validationmail: "",
      isEmailSubmitted: false,
      contactmssg:"",
      intogallery: "Step Inside And Discover The Beauty Of Djerba Through Our Curated Collection.", // Store entered email
    };
  },

  methods: {
    async sendData() {
      // Logic to send data to the backend
      if (this.isValidEmail(this.email)) {
        try {
          const response = await fetch('http://localhost:3001/api/register', { // Changed port to 3001
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.email })
          });

          const result = await response.json();
          if (response.ok) {
            console.log('Data sent successfully:', result);
            this.validationmail = result.message; // Show success message
            this.isEmailSubmitted = true; // Prevent further email submission
          } else {
            console.error('Error sending data:', response.statusText);
            this.errormail = result.message; // Show error message
          }
        } catch (error) {
          console.error('Network error:', error);
          this.errormail = "Network error. Please try again later.";
        }
      } else {
        this.errormail = 'The entered email is invalid';
      }
    },

    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    },

    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Handle form submission
    submitForm(event) {
      event.preventDefault();  // Prevent default form submission

      const form = document.getElementById('contactForm');
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Send form data via fetch
      this.sendFormData(data);
    },

    // Send form data to the server
    sendFormData(data) {
      fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

        .then(response => response.json())
        .then(data => {
          this.contactmssg =data.message;  // Show the response message from the backend
        })
        .catch(error => {
          console.error('Error:', error);  // Handle any errors
        });
    },
  },
}
</script>
<template>

  <body>
    <!-- Container Home Section -->
    <div class="containerHome">
      <div class="section">
        <div class="message">{{ message }}</div>
        <div class="message2">{{ message2 }}</div>

        <p class="description">
          Djerba, an island full of history and charm, is the perfect destination
          for travelers seeking both relaxation and adventure. Its golden beaches,
          crystal-clear waters, and rich cultural heritage make it a must-visit
          location. Discover the unique blend of Tunisian traditions and modernity
          in the heart of the Mediterranean.
        </p>

        <p class="call-to-action">
          Sign up to receive updates and special offers. Explore the gallery and
          start planning your dream trip today!
        </p>

        <input type="email" placeholder="Enter your email" v-model="email" class="email-input"
          v-if="!isEmailSubmitted" />
        <!-- Display validation or error message -->
        <span class="MessageERR_Valid" id="validationmail" v-show="validationmail">{{ validationmail }}</span>
        <span class="MessageERR_Valid" id="errormail" v-show="errormail">{{ errormail }}</span>

        <div class="actions">
          <!-- Explore button -->
          <button class="explore-btn" @click="scrollToSection('intro_Gallery')">Explore Now</button>

          <!-- Sign-up button -->
          <button class="signup-btn" @click="sendData">Subscribe</button>
        </div>
      </div>
    </div>

    <!-- Gallery Section -->
    <div class="intro_Gallery" id="intro_Gallery">
      {{ intogallery }}
    </div>
    <div class="containerGallery" id="gallery">

      <div class="c1">
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\borj-el-kbir-castle-also-known-as-borj-el-ghazi-mustapha-houmt-souk-DM1ARC.jpg"
            alt="Borj El Kbir Castle" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\djreba_explore_1_1277x459.jpg"
            alt="Djerba Explore" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\djerbahood.jpg" alt="Djerbahood" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\gallela.jpg" alt="Gallela" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>


        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\houmtsoug.jpg" alt="Houmt Soug" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\Midoun Village.jpg" alt="Midoun Village" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\nile-crocodile-crocodylus-niloticus-djerba-explore-park-midoun-djerba-DGGFR2.jpg"
            alt="Crocodiles" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\synagogue-djerba-el-ghriba-H6402X.jpg"
            alt="El-ghriba" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>




        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\Taguermess Lighthouse.jpg"
            alt="Taguermess Lighthouse" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\traditional-house-in-the-djerba-heritage-section-of-the-parc-djerba-BNJYA9.jpg"
            alt="Traditional house" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\traditional-mnzl.jpg" alt="Houch" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\White Mosques of Djerba.jpg"
            alt="Mosques of Djerba" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>



        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\traditional-wedding-at-al-kantara-island-of-djerba-tunisia-D7RAXD.jpg"
            alt="Wedding" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\island-and-fishing-boat-djerba-tunisia-2DAGAB5.jpg"
            alt="Island" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\hotel-resort-in-djerba-tunisia-B2WM0W.jpg"
            alt="Hotels" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\camels-on-the-beach-djerba-07-nov-2014-KMYWNW.jpg"
            alt="Camels" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>


        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\_content.jpg" alt="View" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\club-med-la-douce-djerba-island-tunisia-B33Y1C.jpg"
            alt="Club" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img
            src="C:\Users\utilisateur\Touristic_Gallery\public\images\tunisia-djerba-20062019-parasales-water-parachutes-for-outdoor-activities-in-the-blue-sky-a-triple-water-parachute-bright-colours-paraglider-TX785F.jpg"
            alt="Parachute" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
        <div class="photo-container">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\tunisiadjerba-sidi-mahrs-beach-DG5WJN.jpg"
            alt="Beach" />
          <div class="overlay">
            <a href="/public/destinations.html">See Destinations</a>
          </div>
        </div>
      </div>
    </div>


    <div class="Sectionblog" id="Sectionblog">
      <h2 class="blog-title">Explore Our Latest Blog Posts</h2>
      <div class="blog-grid">
        <article class="blog-card">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\Djerba.gif" alt="Blog post 1">
          <h3>10 Reasons to Visit Djerba</h3>
          <p>Discover why Djerba is a must-visit destination...</p>
          <a href="/public/articles.html">Read More</a>
        </article>
        <article class="blog-card">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\beaches.jpg" alt="Blog post 2">
          <h3>Top 5 Beaches in Djerba</h3>
          <p>Relax on the most beautiful beaches of Djerba...</p>
          <a href="/public/articles.html">Read More</a>
        </article>
        <article class="blog-card">
          <img src="C:\Users\utilisateur\Touristic_Gallery\public\images\heri.jpg" alt="Blog post 3">
          <h3>The Cultural Heritage of Djerba</h3>
          <p>Explore the rich history and culture of this amazing island...</p>
          <a href="/public/articles.html">Read More</a>
        </article>
      </div>
    </div>



    <div class="SectionAbout" id="SectionAbout">
      <div class="titleAbout">
        About us
      </div>

      <div class="InfosSection">
        <div class="Mission">
          <div class="missiontitle">Our Mission</div>
          We believe that every destination has a story to tell and wonders to reveal.
          Our mission is to connect travelers from around the globe with unique locations,
          rich in culture, history, and natural beauty. Through our platform, we aim to inspire
          exploration and create unforgettable memories.
        </div>
        <div class="StoryJerba">
          <div class="story">Story of Jerba</div>

          Located in the heart of the Mediterranean, Djerba is a hidden gem that combines ancient
          traditions with modern charm. Known for its stunning beaches, picturesque villages,
          and vibrant culture, Djerba has enchanted travelers for generations. Whether you're drawn
          by its rich history, authentic crafts,
          or mouthwatering cuisine, this island offers a perfect blend of relaxation and adventure.
        </div>
      </div>
    </div>

    <div class="contacttitle">
      Contact us
    </div>
    <div class="SectionContact" id="SectionContact">


      <div class="Details">
        <form id="contactForm" @submit.prevent="submitForm">
          <!-- Name -->
          <input type="text" class="name" name="name" placeholder="Your Name" required>

          <!-- Email -->
          <input type="email" class="email" name="email" placeholder="Your Email" required>

          <!-- Message -->
          <textarea class="message" name="message" placeholder="Your Message" rows="5" required></textarea>

          <!-- Submit Button -->
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
        <span class="class" v-show="contactmssg">{{ contactmssg }}</span>

      </div>


      <!-- Section des liens -->
      <div class="Links">
        <span @click="scrollToTop">Home</span>
        <span @click="scrollToSection('intro_Gallery')">Gallery</span>
        <span @click="scrollToSection('Sectionblog')">Blog</span>
        <span @click="scrollToSection('SectionAbout')">About</span>
      </div>

      <!-- Section des icônes de réseaux sociaux -->
      <!-- Section des icônes de réseaux sociaux -->
      <div class="SocialMedia">
        <a href="https://facebook.com" target="_blank" class="icon-link">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" class="icon-link">
          <i class="bi bi-twitter"></i>
        </a>
        <a href="https://gmail.com" target="_blank" class="icon-link">
          <i class="bi bi-envelope"></i>
        </a>
        <a href="https://instagram.com" target="_blank" class="icon-link">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" class="icon-link">
          <i class="bi bi-linkedin"></i>
        </a>

      </div>
      <div class="footer">
        <div class="footer1">Copyright © All rights reserved
        </div>
        <div class="footer2">
          Designed By MOHAMED AMINE MAJDOUB</div>
      </div>
    </div>

  </body>
</template>

<style>
/* Global Styles */
body {
  user-select: none;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  height: 100%;
  display: flex;
  flex-direction: column;
  /* Empiler les éléments verticalement */
  align-items: center;
  /* Centrer les éléments horizontalement */
}
.class{
  display: block;
  color: black;
  margin-top: 10px;
  font-size: medium;
  font-weight: 500  ;
}
/* Home Container */
.containerHome {
  width: 85vw;
  max-width: 1200px;
  text-align: center;
  margin: 6rem auto 5rem;
  padding: 20px;
}

/* Section */
.section {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  animation: fadeIn 1.5s ease-in-out;
}

/* Main Messages */
.message {
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.message2 {
  font-size: 18px;
  font-weight: 700;
  color: #555;
  margin-bottom: 20px;
}

/* Description */
.description {
  font-size: 18px;
  color: #444;
  margin: 20px 0;
  line-height: 1.8;
}

/* Call-to-action */
.call-to-action {
  font-size: 18px;
  font-weight: 500;
  color: #444;
  margin: 20px 0;
}

/* Email Input */
.email-input {
  width: 100%;
  max-width: 350px;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.email-input:focus {
  border-color: #2575fc;
}

/* Actions Section */
.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.MessageERR_Valid {
  display: block;
  font-size: large;
  font-weight: 600;
  margin-top: 10px;
}

#validationmail {
  color: green;
}

#errormail {
  color: red;
}

/* Buttons */
.explore-btn,
.signup-btn {
  font-size: 18px;
  font-weight: bold;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;
}

.explore-btn {
  background-color: #ff8c00;
  color: #fff;
}

.explore-btn:hover {
  background-color: #e07b00;
  transform: translateY(-2px);
}

.signup-btn {
  background-color: #28a745;
  color: #fff;
}

.signup-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gallery Section */
.containerGallery {
  width: 85vw;
  max-width: 1200px;
  margin: 2rem auto;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.c1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.photo-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin: 10px;

}

.photo-container img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-container img:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}

.overlay {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: bottom 0.3s;
  border-radius: 10px;
}

.photo-container:hover .overlay {
  bottom: 0;
}

.overlay  a {
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s;
}

.overlay  a:hover {
  background-color: #ff8c00;
  color: #fff;
}

.intro_Gallery {
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
}

/*Section blog */


/* Section Blog */
.Sectionblog {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 100px;
  padding-top: 10rem;
}

.blog-title {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;

}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  grid-auto-flow: column;
}

.blog-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  height: 50vh;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card h3 {
  font-size: 20px;
  color: #333;
  margin: 10px;
}

.blog-card p {
  font-size: 16px;
  color: #666;
  margin: 0 15px 10px;
}

.blog-card a {
  background: #2575fc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-bottom: 2rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s;
    
}

.blog-card a:hover {
  background: #1a5fc1;
}

.SectionAbout {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 100px;
  height: 50vh;

  /* Ligne verticale entre les colonnes */
}


.InfosSection {
  column-count: 2;
  /* Divise en deux colonnes */
  column-gap: 20px;
  /* Espacement entre les colonnes */
  column-rule: 1px solid #ccc;
}

.titleAbout {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
}

.Mission,
.StoryJerba {
  font-size: medium;
  color: #ffffff;
}

.missiontitle,
.story {
  font-size: large;
  font-weight: bold;
}


/* Section Contact */
.SectionContact {
  padding: 40px;
  background-color: #f4f4f4;
  text-align: center;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
}

/* Title */
.contacttitle {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;

}

/*  */
.Details {
  max-width: 600px;
  margin: 0 auto;

}

/* Input Fields */
input.name,
input.email,
textarea.message {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}


/* Submit Button */
button.submit-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.5S ease-in-out;
}

button.submit-btn:hover {
  background-color: #28a745;
  /* Couleur plus foncée au survol */
}

/* Section des réseaux sociaux */
.SocialMedia {
  margin-top: 20px;
}

.SocialMedia .icon-link {
  margin: 0 10px;
  font-size: 30px;
  /* Taille de l'icône */
  color: #4A90E2;
  transition: color 0.3s;
  text-decoration: none;
}

.SocialMedia .icon-link:hover {
  color: #357ABD;
  /* Couleur au survol */
}

/* Section des liens */
.Links {
  margin-top: 30px;
  text-align: center;
}

.Links span {
  margin: 0 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  text-decoration: none;
  color: #4A90E2;
  transition: color 0.3s;
}

.Links span:hover {
  color: #357ABD;
  cursor: pointer;

}

.footer {
  color: #000;
  margin-top: 5rem;

}

.footer1,
.footer2 {
  font-weight: 500;
}
</style>
