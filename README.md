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
