const Parent = require ("../models/parent.model")
const Student = require("../models/student.model")
const createError = require('http-errors')


  
// Usecase 1 - GetAll
function getAll() {
  console.log("imprimiendo desde parent, usecase dentro de getAll")

  return Parent.find({}).populate('students')
}



// Usecase 2 - GetById
const getById = async (id) => {
  console.log("imrpimiendo desde parent.usecase dentro de getById")
  const parentById = await Parent.findById(id)
  if(!parentById) {
    const error = createError(404, "El padre/tutor no fue encontrado")
    throw error
  }
  return parentById
}



// Usecase 3 - Post
/*
const create = async (parentData) => {
  console.log("imprimiendo desde parent.usecase dentro de Post")
  const parentToCreate = await Parent.create(parentData)
  return parentToCreate
}
*/

// con populate
const create = async(newParent) => {
  console.log("imprimiendo desde parent, usecase dentro de Post-populate")

  const studentFound = await Student.findById(newParent.students)

  if(!studentFound) {
    const error = createError(404, "El estudiante no fue encontrado")
    throw error
  }

  const parentToCreate = await Parent.create(newParent)

  await Student.updateOne(
    {_id: studentFound._id},
    {
        $push: { parents: parentToCreate._id}
    }
  )
  return parentToCreate
}



// Usecase 4 - Update
const update = (id, parentData) => {
  console.log("imprimiendo desde parent.usecase dentro de Update")
  const parentToPatch = Parent.findByIdAndUpdate(id, parentData, { returnDocument: 'after'})
  return parentToPatch
  }



// Usecase 5 - Delete
const remove = (id) => {
    console.log("imprimiendo desde parent.usecase dentro de Delete")
    const parentToDelete = Parent.findByIdAndDelete(id)
    return parentToDelete
  }





module.exports = { getAll, getById, create, update, remove }