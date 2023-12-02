# Projet Test PFE - Développement Full Stack chez InDatacore

Bienvenue dans le projet test évaluant vos compétences en développement full stack pour le stage PFE chez InDatacore.

## Front End

### Application Angular

Réalisez une application Angular (de préférence)  avec les fonctionnalités suivantes :

- Page SIGN IN / SIGN UP.
- Un sidenav bar permettant à l'utilisateur de naviguer entre 3 pages.
- Une page avec un dashboard intégrant 3 graphes :
  1. Stacked bar chart,
  2. Pie chart,
  3. Un graphe au choix du candidat.
- Une page avec un datatable, permettant la suppression ou la modification des lignes.
- Une page pour uploader un fichier avec une simulation du transfert en cours.

L'application doit suivre un design minimaliste.

## Back End

### Application REST avec Spring Boot

Réalisez une application Spring Boot avec les fonctionnalités suivantes :

- L'application lit un fichier .CSV au démarrage pour créer une liste d'objets (1 objet / ligne).
- 1 API "GET" retournant une liste d'objets au format JSON.
- 1 API "POST" permettant d'ajouter un objet à la base de données en le passant en paramètre.
- 1 API "POST" permettant d'ajouter un objet à la base de données en générant des valeurs aléatoires.
- Documentation via SWAGGER UI.
- L'application doit être packagée dans un fichier WAR.

### Tests

Les 3 APIs doivent être testables via l'interface SWAGGER UI.

## Instructions

1. Clonez ce repository.
2. Réalisez le front end et le back end selon les spécifications mentionnées ci-dessus.

