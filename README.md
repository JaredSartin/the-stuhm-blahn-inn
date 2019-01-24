## Getting started
Start off by installing all external components:
```
npm install
```

You must be using `node 7.x` or `node 8.x`. Node 9+ is not supported by the image converting pre-processors.

## Running
To fire up the server and begin development, run the following:
```
grow run
```

To build the project/delete source maps:
```
gulp build & grow run
```

`grow build` includes `gulp optimize` which pre-processes all the images.

# Bonus Gulp tasks

You can alphabetize your CSS props with Stylefmt + stylelint:
```
gulp css-fmt
```

You can strip png images of bulky meta data with:
```
gulp minify-png
```

# Deploying

You can build the static files for a particular deployment with the
`grow deploy` task. You must add an environment flag for the environment you're
building for:

`grow deploy production`
