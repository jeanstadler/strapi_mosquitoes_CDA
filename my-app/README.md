npm install react-router-dom

## Pagination et Recherche

La pagination et la recherche utilisent la **même requête**, la recherche ajoute simplement un paramètre de filtre.

### Sans recherche
```
http://localhost:1337/api/movies?pagination[page]=1&pagination[pageSize]=10&sort=titre:asc
```

### Avec recherche
```
http://localhost:1337/api/movies?pagination[page]=1&pagination[pageSize]=10&sort=titre:asc&filters[titre][$containsi]=amour
```

Le filtre `&filters[titre][$containsi]=amour` est ajouté **uniquement si l'utilisateur tape quelque chose** dans le champ de recherche.

### Comment ça fonctionne
1. Quand tu tapes dans le champ de recherche → `searchQuery` change
2. Le `useEffect` détecte le changement → réinitialise la page à 1
3. Une nouvelle requête part à Strapi avec le filtre de recherche
4. Strapi cherche dans **toute la BDD** et applique la pagination sur les résultats

## Navigation vers les détails (Page de détail)

Quand tu cliques sur "Voir +" sur un film, tu es redirigé sur la page détail du **bon film**. Voici comment :

### Sur la homepage (MovieCard)
```javascript
onClick={() => navigate(`/movie/${movie.documentId}`)}
```
L'ID du film est passé dans l'URL : `/movie/abc123xyz`

### La route (App.jsx)
```javascript
<Route path="/movie/:documentId" element={<MovieDetail />} />
```
Le `:documentId` capture l'ID depuis l'URL

### Sur la page de détail (MovieDetail)
```javascript
const { documentId } = useParams();
const response = await getMovieById(documentId);
```
On récupère l'ID depuis l'URL et on cherche le film correspondant dans Strapi

### Afficher les acteurs liés au film
Dans `movieService.js`, on utilise `?populate=actors` :
```javascript
const response = await fetch(`http://localhost:1337/api/movies/${documentId}?populate=actors`);
```

Le `?populate=actors` dit à Strapi : **"Inclus aussi tous les acteurs liés à ce film"**

Sans `populate`, on n'aurait que les IDs. Avec `populate`, on reçoit les données **complètes** de chaque acteur (nom, prénom, etc.)

**L'ID passe par l'URL** → React l'extrait → Strapi renvoie le film + ses acteurs !

## Cliquer sur un acteur pour voir sa page profil

Sur la page de détail du film, tu peux cliquer sur un acteur pour aller sur sa page profil.

### Sur la page film (MovieDetail)
```javascript
onClick={() => navigate(`/actor/${actor.documentId}`)}
```
L'ID de l'acteur passe dans l'URL : `/actor/xyz789`

### La route (App.jsx)
```javascript
<Route path="/actor/:documentId" element={<ActorDetail />} />
```
Le `:documentId` capture l'ID de l'acteur depuis l'URL

### Sur la page profil (ActorDetail)
```javascript
const { documentId } = useParams();
const response = await getActorById(documentId);
```
Même logique : on récupère l'ID depuis l'URL et on charge les données de l'acteur

**Bonus :** On utilise aussi `?populate=movies` pour afficher tous les films de l'acteur, et tu peux cliquer dessus pour revenir à leur page de détail !