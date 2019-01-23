# Goog-Grow-Scaffold (Browserify Version)

## What do I need this for?
This is a boilerplate based on the Scaffold Grow theme (https://github.com/growthemes/scaffold) but with some
modifications to make initial project setup easier.

## What's special about this version?
It uses browserify! This version lets you have live reloads and is a faster recompile of source files.

## Getting started
Start off by installing all external components:

Working on Node v8.8.1 and NPM v5.5.1

```
npm install
```

## Running
To fire up the server and begin development, run the following:
```
grow run
```

To build the project/delete source maps:
```
gulp build & grow run
```

# Bonus Gulp tasks

You can alphabetize your CSS props with CSS comb:
```
gulp css-comb
```

You can strip png images of bulky meta data with:
```
gulp minify-png
```
