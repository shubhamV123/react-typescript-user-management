## React + TypeScript + User + Managemt

This project was made from using weback and typescript with React.

## Installation

1.  For running this project you need to install [nodejs](https://nodejs.org/en/) in your system. If you already installed node in your system you can check out from here by running this command:
        node -v
1.  Install dependencies:

        npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:808-) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Area of improvements

    1.  Each enviornment should have its own webpack and typscipt config file
        1.Ex : webpack.config.prod.js,tsconfig.prod.json
    2. More robust use of typescrip
    3. In Development code works fine but in production it is not taking relative path so need to hashRouter so that it takes relative path
    4. Layout context can be refined
