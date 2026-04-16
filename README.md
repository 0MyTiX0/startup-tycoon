# Choix du SPA

React.

## Commandes

- Lancer l’application en local : npm run dev
- Générer le build de production : npm run build

## Rôle des dossiers dans `src`

- `src/assets` : contient les ressources statiques utilisées par l’application, comme les images, icônes, polices ou médias.
- `src/components` : regroupe les composants réutilisables de l’interface, pensés pour être partagés entre plusieurs pages.
- `src/pages` : contient les vues principales de l’application, c’est-à-dire les écrans accessibles par navigation.
- `src/services` : centralise les appels à des services externes, la logique de récupération de données et les interactions avec une API.
- `src/state` : rassemble l’état global ou partagé de l’application, ainsi que la logique de gestion associée.
- `src/styles` : regroupe les styles communs, les variables de thème et les feuilles de style globales.

## Point d’entrée de l’application

1. L’application est montée dans le DOM dans [src/main.tsx](src/main.tsx).
2. Le composant racine est [src/App.tsx](src/App.tsx), qui rend `<App />`.
3. Le router est configuré dans [src/App.tsx](src/App.tsx).
4. L’élément HTML servant de point d’ancrage est le `div` avec l’id `root` dans [index.html](index.html).

### Description des composants

- [src/pages/game.tsx](src/pages/game.tsx) : page du jeu et orchestration des états.
- [src/components/GameHeader.tsx](src/components/GameHeader.tsx) : affiche le titre, l’argent et le revenu/sec.
- [src/components/MoneyDisplay.tsx](src/components/MoneyDisplay.tsx) : affiche l’argent formaté.
- [src/components/ClickButton.tsx](src/components/ClickButton.tsx) : bouton qui ajoute de l’argent au clic.
- [src/utils/formatNumber.tsx](src/utils/formatNumber.tsx) : formatage `K`, `M`, `B`.

### Où se trouve le state

- Le state principal est `money` dans [src/pages/game.tsx](src/pages/game.tsx).
- Il est créé avec `useState(0)` dans la page.

### Comment remonte l’événement

1. [src/pages/game.tsx](src/pages/game.tsx) crée `handleClick` et met à jour `money`.
2. `handleClick` est passé en prop `onClick` à [src/components/ClickButton.tsx](src/components/ClickButton.tsx).
3. Au clic, le bouton appelle `onClick`.
4. `money` remonte dans [src/components/GameHeader.tsx](src/components/GameHeader.tsx) puis [src/components/MoneyDisplay.tsx](src/components/MoneyDisplay.tsx).

### Gestion du tick

- L’interval est créé dans [src/pages/Game.tsx](src/pages/Game.tsx) dans `useEffect`.
- Il ajoute `incomePerSecond` à `money` toutes les secondes.
- Il est nettoyé avec `window.clearInterval(intervalId)` au démontage.
- Si `incomePerSecond` change, l’ancien interval est remplacé.

Pourquoi c’est important :

- Un seul interval reste actif.
- Pas de doublon après navigation ou hot reload.
- Sinon le jeu accélère car plusieurs ticks s’additionnent.

### Preuve du bon fonctionnement

- Le log temporaire montre 1 message par seconde si l’interval est unique.
- Plusieurs logs par secondes permettent de vérifier si il y a un décalage
- Un interval mal géré accélère le jeu parce que chaque interval ajoute son propre tick.
- Le cleanup évite cette accumulation.

### Analyse Event Loop

1. `setInterval` ne met pas le code dans la Call stack directement : il enregistre un callback à exécuter plus tard.
2. Le callback attend d’abord dans les Web APIs du navigateur.
3. Quand le délai est atteint, il passe dans la Task queue (macrotask).
4. Il n’entre dans la Call stack que quand elle est libre.
5. Si le thread principal est occupé, le callback reste en attente.
6. Le timer peut donc être retardé par du rendu, du calcul ou d’autres tâches JavaScript.

## Observation du besoin de state global

1. `money` et `incomePerSecond` vivent dans [src/App.tsx](src/App.tsx), puis sont passés aux pages via des props.
2. Oui. [src/pages/game.tsx](src/pages/game.tsx) et [src/pages/shop.tsx](src/pages/shop.tsx) utilisent les mêmes données: argent, revenu/sec, et état des upgrades.
3. Les données sont partagées via le "lifting state up": état centralisé dans [src/App.tsx](src/App.tsx), callbacks passés aux pages (`onCollect`, `onBuyUpgrade`) et rendu piloté par props.
4. La solution devient fragile avec le prop drilling: beaucoup de props à faire transiter, couplage plus fort entre pages/composants, maintenance plus lourde quand on ajoute de nouvelles vues ou nouvelles stats partagées.

## Structure du state global

Le state global est défini dans [src/state/gameStore.tsx](src/state/gameStore.tsx).

Structure actuelle:

- `money` : argent disponible.
- `clickValue` : valeur gagnée à chaque clic.
- `incomePerSecond` : revenu automatique par seconde.
- `upgrades` : liste des upgrades avec leur compteur.
- `totalClicks` : nombre total de clics effectués.
- `totalEarned` : argent total généré par le tick.

## Liste des actions

Les actions sont définies dans [src/state/gameStore.tsx](src/state/gameStore.tsx).

- `CLICK` : augmente `money` de `clickValue` et incrémente `totalClicks`.
- `TICK` : ajoute `incomePerSecond` à `money` et incrémente `totalEarned`.
- `BUY_UPGRADE` : reçoit `upgradeId`, vérifie les fonds, décrémente `money`, incrémente `count`, met à jour `incomePerSecond`.
- `RESET_GAME` : remet le state à zéro.

## Où se trouve le tick

Le tick est déclenché dans [src/App.tsx](src/App.tsx) avec un `useEffect` qui envoie `dispatch({ type: "TICK" })` toutes les secondes.

Pourquoi ici:

- le tick est global et ne dépend pas de la page affichée;
- il continue même si l'utilisateur navigue vers Shop, Stats ou Settings;
- le state reste centralisé au même endroit.

## Schéma du flux unidirectionnel

![Schéma du flux unidirectionnel](src/assets/schema.png)

## Justification de l’architecture choisie

L’application utilise `Context + reducer` parce que c’est une solution simple, adaptée à React, et suffisante pour un state partagé de petite taille.

- Lecture du state depuis un point unique via le store.
- Modifications uniquement via des actions.
- Flux unidirectionnel clair: vue -> action -> reducer -> nouveau state -> render.
- Moins de props à transmettre entre les pages et les composants.
- Plus facile à faire évoluer quand on ajoute de nouvelles statistiques ou de nouvelles actions.

## Vérifications manuelles

Tests à faire dans l’application:

1. Cliquer dans Game augmente `money` dans Game et dans la Navbar.
2. Acheter un upgrade dans Shop augmente `income/sec` dans Shop et dans la Navbar.
3. Rester sur Shop pendant plusieurs secondes: `money` continue d’augmenter grâce au tick global.
4. Passer de Game à Shop puis à Stats: les valeurs restent synchronisées partout.
