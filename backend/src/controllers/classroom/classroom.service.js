/**
 * @TODO service kapcsolat és CRUD műveletek a  Mongoose modellek segítségével
 */

const Classroom = require('../../models/classroom.model');


exports.create = classroomData => {
  const newClassroom = new Classroom(classroomData);
  return newClassroom.save();
};

exports.findAll = () => Classroom.find();

exports.findOne = id => Classroom.findById(id);

exports.update = (id, updatedData) => Classroom.findByIdAndUpdate(id, updatedData, { new: true });

exports.delete = id => Classroom.findByIdAndRemove(id);
