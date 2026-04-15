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

- [src/pages/game.tsx](src/pages/game.tsx) : page principale du jeu, orchestre le header et le bouton de clic.
- [src/components/GameHeader.tsx](src/components/GameHeader.tsx) : bandeau supérieur avec le titre et les indicateurs de partie.
- [src/components/MoneyDisplay.tsx](src/components/MoneyDisplay.tsx) : affiche le montant d’argent courant avec le format abrégé.
- [src/components/ClickButton.tsx](src/components/ClickButton.tsx) : bouton d’action qui déclenche l’ajout d’argent à chaque clic.
- [src/utils/formatNumber.tsx](src/utils/formatNumber.tsx) : utilitaire de formatage (`K`, `M`, `B`) pour l’affichage des montants.

### Où se trouve le state

- Le state principal du TP6 est `money` dans [src/pages/game.tsx](src/pages/game.tsx).
- Il est déclaré avec `useState(0)` dans le composant de page.

### Comment remonte l’événement

1. [src/pages/game.tsx](src/pages/game.tsx) crée la fonction `handleClick` qui met à jour `money` via `setMoney`.
2. Cette fonction est passée en prop `onClick` à [src/components/ClickButton.tsx](src/components/ClickButton.tsx).
3. Au clic, [src/components/ClickButton.tsx](src/components/ClickButton.tsx) exécute `onClick`.
4. Le state `money` est mis à jour dans [src/pages/game.tsx](src/pages/game.tsx), puis la nouvelle valeur est redescendue en prop `amount` vers [src/components/GameHeader.tsx](src/components/GameHeader.tsx), puis vers [src/components/MoneyDisplay.tsx](src/components/MoneyDisplay.tsx).
