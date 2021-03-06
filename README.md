Labyrinth survival - a melonJS game
-------------------------------------------------------------------------------

<img src="https://s3-eu-west-1.amazonaws.com/mom-cloud/man.png" width="56">

**Demo link:** https://codekonami.github.io/labyrinth/

## Want to contribute?

To build, be sure you have [node](http://nodejs.org) installed. You will also need [grunt](http://gruntjs.com/getting-started)

    git clone https://github.com/codeKonami/labyrinth

Then in the cloned directory, simply run:

    npm install

Running the game:

	grunt serve

And you will have the game running on http://localhost:8000

## Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

You can test the release version like this

    cd build
    python -m SimpleHTTPServer

And you will have the game running on http://localhost:8000

-------------------------------------------------------------------------------
Copyright (C) 2016 Thomas Foricher
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
