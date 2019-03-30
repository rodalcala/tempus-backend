# tempus, SIM recycling

## Description

tempus is an app build with the idea of recycling your SIM cards whenever you don't need it anymore.
So if you're flying back home and there is some data left in your plan, maybe you can leave it for the next traveller.

## Set-up the database

### Install MongoDB

You can skip this step if you already have MongoDB installed.

```bash
brew install mongodb
```

If you don't have Homebrew installed (you should), install it.

### Run the database

To run MongoDB, execute the following command:

```bash
mongod
```

And if you would like to use MongoDB's toolbox, in a different terminal run:

```bash
mongo
```

## Run the server

Finally, execute the following command in a terminar to have the server up and running, and listening for changes:

```bash
npx nodemon
```
