# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- Hello World
- [Basic Interactivity]
- [Basic Components]
- [Navigation]
- [The Angular CLI]
- [Directives]
- [Services]
- [RxJS]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## Initial setup

You must use [angular cli](https://angular.dev/tools/cli) to generate a
new project:

```bash
rm .gitignore
mv README.md _README.md
sudo npm i -g @angular/cli
ng new hello-world \
    --directory . \
    --style=scss \
    --ssr=false \
    --ai-config=none \
    --minimal \
    --skip-tests \
    --skip-git \
    --inline-style \
    --inline-template \
    --zoneless
mv README.md HELP.md
mv _README.md README.md
```

## How to build

Uou can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- Ideally provide an empty directory for new angular projects.
- The command used to create the project was intended to avoid all interactive
  prompts, bu you still might get one from angular cli itself.
- Even being a minimal project, this is actually an
  [angular workspace](https://angular.dev/reference/configs/workspace-config).
- Project also comes prepared to use
  [routes](https://angular.dev/api/router/Route#simple-configuration) for
  navigation.

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>
