"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("users", "UserController.store");
})
  .prefix("v1")
  .namespace("User");
