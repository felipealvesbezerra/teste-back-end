"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.resource("addresses", "AddressController").apiOnly();
})
  .prefix("v1")
  .namespace("Address");
