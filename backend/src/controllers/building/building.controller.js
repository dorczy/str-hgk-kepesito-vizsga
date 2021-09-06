/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const createError = require('http-errors');

const Building = require('../../models/building.model');
const service = require('./building.service');


exports.updateBuilding = (req, res, next) => {
  const buildingId = req.body.id;
  const className = req.body.name;

  const validationErrors = new Building(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest('Missing field'));
  }

  return service.update(buildingId, className)
    .then(updatedBuilding => {
      res.json(updatedBuilding);
    })
    .catch(() => {
      next(new createError.InternalServerError('Could not updated building'));
    });
}


exports.getAllBuildingWithClassrooms = (req, res, next) => {
  return service.getAll()
    .then(buildingList => {
      res.json(buildingList);
    });
};