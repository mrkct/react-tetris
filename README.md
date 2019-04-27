## React Tetris

### What is this
This is the classic game 'Tetris' remade using Javascript with React. This is only the base game, it does not include any of the features of the modern tetris version. You can try it out at this link: [http://mrkct.it/stuff/tetris](http://mrkct.it/stuff/tetris). 


### How to run
The only dependencies are the one from react, you can just run:

    npm install
    npm start

If you want to build this, to use in your website maybe, change the `"homepage"` variable in `package.json` to the path to the folder you will deploy. If you will deploy in your server root you can also delete this variable. After that, run:

    npm react-scripts build


### What is missing
- Fix the blocks rotation: they don't use the same block pivot as the original game
- Allowing to rotate blocks at the borders of the game, moving away the blocks if they don't fit
- Nicer buttons for mobile play
- An actual site style, right now it's just the game in an empty page