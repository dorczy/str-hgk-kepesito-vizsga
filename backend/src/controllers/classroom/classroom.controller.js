/**
 * @TODO classroom controller kialakítása
 */

 const createError = require('http-errors');

 const Classroom = require('../../models/classroom.model');
 const service = require('./classroom.service');

 exports.create = (req, res, next) => {
  const validationErrors = new Classroom(req.body).validateSync();
  if (validationErrors) {
    return next( new createError.BadRequest(validationErrors) );
  }

  return service.create(req.body)
    .then( createdClassroom => {
      res.status(201);
      res.json(createdClassroom);
    } )
    .catch( err => next(new createError.InternalServerError(err.message)) );
};

exports.findAll = (req, res, next) => {
  return service.findAll()
    .then(classroomList => {
      res.json(classroomList);
    });
};

exports.findOne = (req, res, next) => {
  return service.findOne(req.params.id)
    .then(classroom => {
      if (!classroom) {
        return next(new createError.NotFound("Classroom is not found!"));
      }
      return res.json(classroom);
    });
};

exports.update = (req, res, next) => {
  const validationErrors = new Classroom(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }

  return service.update(req.params.id, req.body)
    .then(updatedClassroom => {
      res.json(updatedClassroom);
    })
    .catch(err => {
      console.log(err);
      next(new createError.InternalServerError('Classroom could not updated!'));
    });
};

exports.delete = (req, res, next) => {
  return service.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => {
      console.log(err);
      return next(new createError.InternalServerError('Could not deleted classroom!'));
    });
};