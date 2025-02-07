const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');  // Importer le module path

const app = express();
const port = 3001;

// Middleware pour servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, '../public'))); // Assurez-vous que le chemin est correct

// Middleware pour le traitement des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Assurez-vous de définir un mot de passe sécurisé ici
  database: 'djerba_guide'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Configurer Nodemailer avec les informations de connexion directes
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mjdbamin@gmail.com', // Remplacez par votre email
    pass: 'popg zayc eplu zzbz' // Remplacez par votre mot de passe
  }
});

// Fonction de validation d'email
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Route pour l'enregistrement de l'email
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Vérification du format de l'email
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Vérification si l'email est déjà dans la base
  db.query('SELECT * FROM emails WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    // Insertion de l'email et du mot de passe en texte brut dans la base de données
    db.query('INSERT INTO emails (email) VALUES (?)', [email], (err, result) => {
      if (err) {
        console.error('Error inserting email:', err);
        return res.status(500).json({ message: 'Error during registration' });
      }

      // Send confirmation email
      const mailOptions =
      {
        from: 'mjdbamin@gmail.com',
        to: email,
        subject: 'Registration Confirmation',
        text: 'Thank you for registering with Djerba Guide! Explore the beauty of Djerba now.'
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          return res.status(500).json({ message: 'Email not sent, but registration was successful.' });
        }

        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email registered and confirmation sent!' });
      });
    });
  });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Define the mail options
  const mailOptions = {
    from: email, // The email from the form
    to: 'mjdbamin@gmail.com', // Your email address
    subject: 'New Message from Contact Form',
    text: `
      You have a new message from ${name} (${email}):
      
      Message: ${message}
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérification que le nom d'utilisateur et le mot de passe sont fournis
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Recherche de l'utilisateur dans la base de données
  db.query('SELECT * FROM users_admins WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Database query error:', err);  // Journaliser l'erreur
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    // Vérification si l'utilisateur existe
    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Username not found' });
    }

    const user = results[0];

    // Comparaison du mot de passe en clair avec celui stocké dans la base de données
    if (user.password === password) {
      return res.status(200).json({ success: true, message: 'Login successful!' });
    } else {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
