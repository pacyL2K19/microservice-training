require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: {type: [String], index: true}
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person ({
    name: 'Pacifique',
    age: 22,
    favoriteFoods : ["Shawarma"]
  })
  person.save((err, data) => {
    return err ? done(err) : done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
      if (err) {
        done(err);
      }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    return err ? done(err) : done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  var foodToAdd = 'hamburger';
  Person.findById(personId,(err,data)=>{
    if(err){
      done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=>{
      if(err){
        console.log(err);
      }
      done(null,data);
      console.log(data);
    });
    //done(null,data);
  });
  //done(null/*, data*/);
};

const findAndUpdate = (personName, done) => {
  var ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {$set: {age: ageToSet}},
    {new: true},
    (err, data) => {
      if (err) return done(err, data);
      return done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  var nameToRemove = 'Mary';
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err)
    return console.log(err);
    done(null,data);
  });
};

const queryChain = (done) => {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    err ? done(err) : done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
