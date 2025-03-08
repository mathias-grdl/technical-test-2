# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups!

All other developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend too much time on it.

We need you to follow these steps to understand the app and to fix the bug:
 - Sign up to the app
 - Create at least 2 other users on the people page (not with signup)
 - Edit these profiles and add additional information
 - Create a project
 - Input some information about the project
 - Input some activities to track your work in the good project
  
Then, see what happens in the app and fix the bug you found doing that.

## Then
Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature that could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer these simple questions:
- What bugs did you find? How did you solve these and why?
- Which feature did you develop and why?
- Do you have any feedback about the code/architecture of the project and what was the difficulty you encountered while doing it?

---

## Analyse du code

### Backend:
#### Problème API:
- Pas de validation robuste des données entrantes
- Manque un middleware centralisé de gestion d'erreurs
- Manque de documentation API
- Manque un dossier Routes et Middlewares, j'aurais aussi créé un dossier Config
- auth.js devrait être un middleware
- .env qui n'est pas dans un gitignore (mais c'est 'normal' pour le test)

#### Problème de nom:
- Pour les models j'aurais appelé activityModel.js et non activity.js
- Pour les controllers j'aurais appelé activityController.js et non activity.js
- Dans le dossier Utils j'aurais appelé le fichier index.js => validatePassword.js ou quelque chose de semblable pour savoir ce que fait le fichier sans l'ouvrir

#### Ajout possible:
- On aurait pu ajouter des tests avec jest ou même tester les routes avec des fichiers index.html

Lien vers mon projet perso : https://github.com/mathias-grdl/API-NodeJS-Own-Template (qui est en privé)

### Frontend:
#### Problème:
- Utilisation de redux dans un projet aussi petit, l'utilisation de context ou de librairie plus moderne comme zustand ou autre aurait été un choix plus judicieux.
- Aucun component ui: par exemple typography ou section pour avoir les mêmes espacements partout tout en pouvant réutiliser le code partout et créer des variantes si besoin.
- Le dossier scènes devrait s'appeler pages.
- Les assets ne sont pas rangés, c'est le bordel.
- Il manque une documentation (documenter une fonctionnalité par exemple comme je faisais chez radioAnalyzer)
- Mot de passe non caché et non confirmé 2 fois dans la popup création user par exemple.
- Les erreurs affichées ne sont pas précises.

---

## Réponses aux questions

### Quels bugs avez-vous trouvés ? Comment les avez-vous résolus et pourquoi ?
J'ai suivi les consignes sur le README.md, ce qui m'a permis de trouver des problèmes en front et de les corriger avec des console.log par exemple pour afficher les données et voir ce que je recevais notamment pour le name.

- Quand j'ai lancé le projet j'ai eu un bug dans le terminal 
 mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
j'ai dû ajouter du code pour que ça fonctionne :
mongoose.connect(MONGO_URL, {
     useCreateIndex: true,
     useNewUrlParser: true,
     useUnifiedTopology: true,
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000, 
   });

- fix: change username field to name in user creation form
https://github.com/mathias-grdl/technical-test-2/commit/8b5f017bde7d7fd9279b420f2c5c2077f8c2d398
Utilisation de console.log pour récupérer l'objet et voir que je récupérais name et non username mais j'aurais aussi pu le voir via le model dans l'api

- fix: update button event handler from onChange to onClick
https://github.com/mathias-grdl/technical-test-2/commit/7d003b853751085c32d63459865ef8f43b9d9a9c
L'update ne fonctionnait pas j'ai juste remplacé le onChange par onSubmit.

Explication :
onChange sert à gérer les changements individuels des champs, tandis que onSubmit est spécifiquement destiné à gérer la soumission complète du formulaire.

- fix: handle project data array in project view page
https://github.com/mathias-grdl/technical-test-2/commit/14e74c4f5cfa1a0e434e02178192f0f626fd9fb7

Sur la page spécifique c'est-à-dire via l'id on recevait un tableau d'objets mais dans tous les cas il n'y a qu'un objet correspondant à l'id.

Explication:
On vérifie si u est un tableau avec Array.isArray(u)
Si c'est un tableau, on prend le premier élément avec u[0]
Sinon, on garde u tel quel

- fix: handle project data array and display objective in project page
Même correction qu'au-dessus

J'aurais pu faire mieux en envoyant seulement l'objet et non l'objet dans un tableau mais j'ai choisi cette solution car je voulais faire attention au temps restant et il y aura toujours qu'un id correspondant soit un objet renvoyé dans le tableau. J'ai donc opté pour une dette technique que je n'aurais jamais fait sur un projet réel. C'est un contournement qui masque potentiellement un problème côté API voici la solution :

// Backend
// filepath: /api/routes/project.js
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project); // Retourne un objet, pas un tableau
});

- add: backend data validation & update README
J'ai ajouté express-validator pour valider les données côté backend, par exemple un minimum de 6 caractères pour le mot de passe.

Un middleware est une fonction qui :

Accède à :

L'objet Request (req)
L'objet Response (res)
La fonction suivante (next)
Peut :

Exécuter du code
Modifier req/res
Passer au middleware suivant

---
exemple de comment ça fonctionne sur la route :
router.post"/", passport.authenticate("user", { session: false }), validateProject validationMiddleware, async (req, res) => 


validationMiddleware est exécuté après validateProject et vérifie les résultats de la validation tandi que validateProject s'exécute en premier et définit les règles de validation.


---

### Quelle fonctionnalité avez-vous développée et pourquoi ?
J'ai développé une page analytics pour voir le nombre d'utilisateurs, le nombre de projets car il est important d'avoir de la data (KPI) pour l'incubateur. Le design est loin d'être parfait mais pour le coup j'ai misé sur la fonctionnalité (le but étant de respecter le délai de réalisation du test). Selon moi il manque un sélecteur de date pour choisir la période comme on peut avoir sur l'onglet activité.

---

### Avez-vous des retours sur le code / l'architecture du projet et quelle a été la difficulté que vous avez rencontrée lors de sa réalisation ?

Je suis en plein changement Windows vers Mac que je ne maîtrise pas encore totalement donc ça m'a fait perdre beaucoup de temps, je suis même revenu sur mon ancien PC. La principale difficulté a été de s'y retrouver dans le code car je ne l'ai pas trouvé très bien rangé et l'utilisation de redux n'était pas nécessaire. Je suis loin d'être parfait mais pour moi qui m'efforce à faire du code lisible, clair, réutilisable ça m'a quand même perturbé au début et au final j'ai l'impression que j'ai continué dans la lignée du code existant et donc je n'ai pas utilisé de composant ui, je n'ai pas l'impression que j'ai assez découpé le code comme je l'aurais fait sur mes projets. Les erreurs ne sont pas affichées clairement pour l'utilisateur.

Lien vers un projet perso full stack (encore en dev) : https://github.com/mathias-grdl/NextJS-Loto (qui est en privé) et lien du site : https://rosaliablake.com/

