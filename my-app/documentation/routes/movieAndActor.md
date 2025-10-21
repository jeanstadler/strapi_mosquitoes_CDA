 Pour obtenir les relations, tu dois utiliser le paramètre populate dans l'URL :

  Pour les acteurs avec leurs films :
  GET http://localhost:1337/api/actors?populate=movies
  GET http://localhost:1337/api/actors/:id?populate=movies

  Pour les films avec leurs acteurs :
  GET http://localhost:1337/api/movies?populate=actors
  GET http://localhost:1337/api/movies/:id?populate=actors

  Pourquoi tu ne voyais pas les relations ?

  1. Dans l'admin panel Strapi : Il utilise automatiquement le paramètre populate en interne, c'est pourquoi tu vois les relations.    
  2. Dans tes routes de documentation : Tu appelles /api/actors et /api/movies sans le paramètre populate, donc Strapi ne retourne     
  que les données de base.

  Configuration actuelle du backend :

  - Routes (back-end-strapi/src/api/actor/routes/actor.js et movie/routes/movie.js) : Utilisent le router par défaut de Strapi,        
  donc toutes les routes standards sont disponibles.
  - Schémas : Les relations sont correctement configurées :
    - Actor a un champ movies (manyToMany vers Movie)
    - Movie a un champ actors (manyToMany vers Actor)
  - Controllers et Services : Utilisent les contrôleurs par défaut (sauf pour la route custom syncFrenchMovies).

  Solution pour ton front-end :

  Tu dois simplement modifier tes appels API pour ajouter ?populate=movies ou ?populate=actors selon les besoins :

  - Page détail acteur : GET /api/actors/:id?populate=movies
  - Page détail film : GET /api/movies/:id?populate=actors



  exemple:
  GET http://localhost:1337/api/movies/nqvgigarall1dumlqd6xxa3i?populate=actors


  response:

  {
    "data": {
        "id": 3,
        "documentId": "nqvgigarall1dumlqd6xxa3i",
        "tmdb_id": "840873",
        "titre": "Marcel et Monsieur Pagnol",
        "description": "A l’apogée de sa gloire, Marcel Pagnol reçoit la commande d’une rédactrice en chef d’un grand magazine féminin pour l’écriture d’un feuilleton littéraire, dans lequel il pourra raconter son enfance, sa Provence, ses premières amours...\r En rédigeant les premiers feuillets, l’enfant qu’il a été autrefois, le petit Marcel, lui apparaît soudain. Ainsi, ses souvenirs ressurgissent au fil des mots : l’arrivée du cinéma parlant, le premier grand studio de cinéma, son attachement aux acteurs, l'expérience de l’écriture. Le plus grand conteur de tous les temps devient alors le héros de sa propre histoire.",
        "date_de_sortie": "2025-10-15",
        "realisateur": [
            {
                "name": "Sylvain Chomet"
            }
        ],
        "affiche": "https://image.tmdb.org/t/p/w500/3kvKO2pcUOKF180ySMx4xmiVH9u.jpg",
        "createdAt": "2025-10-21T03:59:23.555Z",
        "updatedAt": "2025-10-21T03:59:23.555Z",
        "publishedAt": "2025-10-21T03:59:23.555Z",
        "actors": [
            {
                "id": 21,
                "documentId": "cym67mco15uuieahvde69h5z",
                "tmdb_id": "93532",
                "prenom_nom": "Laurent Lafitte",
                "date_de_naissance": "1973-08-22",
                "photo": "https://image.tmdb.org/t/p/w500/lpF5sb1aEMEmxxfZT3u8PWGEipC.jpg",
                "createdAt": "2025-10-21T03:59:22.446Z",
                "updatedAt": "2025-10-21T03:59:22.446Z",
                "publishedAt": "2025-10-21T03:59:22.446Z"
            },
            {
                "id": 22,
                "documentId": "o36yqmqz9v9p0wpqz0g97feh",
                "tmdb_id": "19888",
                "prenom_nom": "Géraldine Pailhas",
                "date_de_naissance": "1971-01-08",
                "photo": "https://image.tmdb.org/t/p/w500/e1xAdLDPKOO3sfMU2I52vL6pL2I.jpg",
                "createdAt": "2025-10-21T03:59:22.561Z",
                "updatedAt": "2025-10-21T03:59:22.561Z",
                "publishedAt": "2025-10-21T03:59:22.561Z"
            },
            {
                "id": 23,
                "documentId": "ety1iplzs47pyhglna16ox5w",
                "tmdb_id": "1814783",
                "prenom_nom": "Thierry Garcia",
                "date_de_naissance": null,
                "photo": "https://image.tmdb.org/t/p/w500/fmSAqMishfHAsVwyX2F6CdklDUX.jpg",
                "createdAt": "2025-10-21T03:59:22.689Z",
                "updatedAt": "2025-10-21T03:59:22.689Z",
                "publishedAt": "2025-10-21T03:59:22.689Z"
            },
            {
                "id": 24,
                "documentId": "ovtdxzu89p6169gcq48pj4ym",
                "tmdb_id": "1732197",
                "prenom_nom": "Olivia Gotanègre",
                "date_de_naissance": "1979-02-12",
                "photo": "https://image.tmdb.org/t/p/w500/6sGKFvanGBFbEb6Cz8jvtzDsAjz.jpg",
                "createdAt": "2025-10-21T03:59:22.805Z",
                "updatedAt": "2025-10-21T03:59:22.805Z",
                "publishedAt": "2025-10-21T03:59:22.805Z"
            },
            {
                "id": 25,
                "documentId": "b80hywkkmeln4zfb20w53jsm",
                "tmdb_id": "2022358",
                "prenom_nom": "Sophie Maréchal",
                "date_de_naissance": null,
                "photo": "https://image.tmdb.org/t/p/w500/9XDUDkEwYQfrFqy7toekdBiT11Q.jpg",
                "createdAt": "2025-10-21T03:59:22.930Z",
                "updatedAt": "2025-10-21T03:59:22.930Z",
                "publishedAt": "2025-10-21T03:59:22.930Z"
            },
            {
                "id": 26,
                "documentId": "l21xcpurad6izabxi62fzxcs",
                "tmdb_id": "30435",
                "prenom_nom": "Flora Montgomery",
                "date_de_naissance": "1974-01-04",
                "photo": "https://image.tmdb.org/t/p/w500/lvhauPYpnvHfTFOoJbpxoz3V7Up.jpg",
                "createdAt": "2025-10-21T03:59:23.051Z",
                "updatedAt": "2025-10-21T03:59:23.051Z",
                "publishedAt": "2025-10-21T03:59:23.051Z"
            },
            {
                "id": 27,
                "documentId": "qjwgis6blzlngyyu5gn8hav6",
                "tmdb_id": "1423214",
                "prenom_nom": "Matthew Gravelle",
                "date_de_naissance": "1976-09-24",
                "photo": "https://image.tmdb.org/t/p/w500/3aZe6GqjJ701AERGEYRAMsotZFq.jpg",
                "createdAt": "2025-10-21T03:59:23.170Z",
                "updatedAt": "2025-10-21T03:59:23.170Z",
                "publishedAt": "2025-10-21T03:59:23.170Z"
            },
            {
                "id": 28,
                "documentId": "vl5q6o11lwmrr3eix7hmxgx8",
                "tmdb_id": "1238452",
                "prenom_nom": "Lu Corfield",
                "date_de_naissance": "1979-11-01",
                "photo": "https://image.tmdb.org/t/p/w500/pUtLj4vPHs70s8mclARFUvNOqG8.jpg",
                "createdAt": "2025-10-21T03:59:23.295Z",
                "updatedAt": "2025-10-21T03:59:23.295Z",
                "publishedAt": "2025-10-21T03:59:23.295Z"
            },
            {
                "id": 29,
                "documentId": "xxl9b4udj8tw1nh9uva6xehe",
                "tmdb_id": "2438358",
                "prenom_nom": "Jonathan Keeble",
                "date_de_naissance": null,
                "photo": "https://image.tmdb.org/t/p/w500/qwClGyzLztNtcNk5017Ih9u7mD8.jpg",
                "createdAt": "2025-10-21T03:59:23.415Z",
                "updatedAt": "2025-10-21T03:59:23.415Z",
                "publishedAt": "2025-10-21T03:59:23.415Z"
            },
            {
                "id": 30,
                "documentId": "zw0ij3o21fh88mrwrkirxx3g",
                "tmdb_id": "206161",
                "prenom_nom": "Celyn Jones",
                "date_de_naissance": "1979-06-04",
                "photo": "https://image.tmdb.org/t/p/w500/7aDQ4sZDyWAhUx15jlPhQPm9apH.jpg",
                "createdAt": "2025-10-21T03:59:23.546Z",
                "updatedAt": "2025-10-21T03:59:23.546Z",
                "publishedAt": "2025-10-21T03:59:23.546Z"
            }
        ]
    },
    "meta": {}
}




exemple:
GET http://localhost:1337/api/actors/ogij8upymk2van1hznixloqk?populate=movies

{
    "data": {
        "id": 12,
        "documentId": "ogij8upymk2van1hznixloqk",
        "tmdb_id": "2352694",
        "prenom_nom": "Brahim Bouhlel",
        "date_de_naissance": null,
        "photo": "https://image.tmdb.org/t/p/w500/sBQIOJz7VlEJRPCWJDWagqnqmnM.jpg",
        "createdAt": "2025-10-21T03:59:21.329Z",
        "updatedAt": "2025-10-21T03:59:21.329Z",
        "publishedAt": "2025-10-21T03:59:21.330Z",
        "movies": [
            {
                "id": 2,
                "documentId": "ib70w97wa98kydpapqlbd23b",
                "tmdb_id": "1318037",
                "titre": "Le Jour J",
                "description": "Juin 1944. L’Europe est déchirée par la guerre, le Débarquement se prépare. Denis Porte continue avec dévouement son travail quotidien sur une base militaire anglaise... factice. Sa mission : déplacer chaque jour des soldats postiches et tromper ainsi l’ennemi. Chez les Porte, on a tendance de père en fils à mourir en héros pour la France. Alors pas question pour sa mère que Porte prenne le moindre risque. S’occuper d’une base factice, c’est le maximum qu’elle tolère pour son fils. Mais après avoir fait la rencontre de Sami, un médecin algérien qui rêve de rencontrer De Gaulle, ils décident lors d’une soirée arrosée d’y prendre part. Ils prennent le large avec bravoure (et pas mal de grammes dans le sang). Sauf qu’ils n’ont pas la bonne date ni le bon lieu. Ajoutez à cela un héros qui ne veut surtout pas s’exposer au danger. Le jour J, euh ou presque …",
                "date_de_sortie": "2025-10-15",
                "realisateur": [
                    {
                        "name": "Claude Zidi Jr."
                    }
                ],
                "affiche": "https://image.tmdb.org/t/p/w500/pXHJAhv6GQvacV10fUOwUa9Hkji.jpg",
                "createdAt": "2025-10-21T03:59:22.305Z",
                "updatedAt": "2025-10-21T03:59:22.305Z",
                "publishedAt": "2025-10-21T03:59:22.306Z"
            }
        ]
    },
    "meta": {}
}