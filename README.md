# Creatingly-demo

This is A Real Time Collaboration app built on top of Angular 18 and nest js

i have tried to implement readltime multi user editing feature like figma



similar to other known apps with such feature such as figma jam, google docs, etc this app uses below technologies with best practises and
clean architecture to allow multiple users join a session, create a doc (we call it jam board here) and simoultinously interact with elements on the screen (add, edit, resize, drag & drop, change content, ...)

this app is developed with the best of my abilities to show how you can keep the performance and speed of the app at maximum and use real time data transmission with multiple users without sacrificing
performance:

Angular 18.1 (Latest)
NgRx Signal Store (Latest)
RxJS (90% of the app is implemented using pure reactive code with RXJS)
Nest.js
Socket.IO
Ant-Design
Tailwind
Json Server (Mock Data)
Uuid
No Real-time Libraries (i have implement every directive, and feature from scratch to make them more flexible)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
