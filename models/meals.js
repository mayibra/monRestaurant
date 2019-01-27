const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;


let MealsSchema = new Schema({
    //TODO
    name: { type: String, es_indexed: true },
    allergies: [String],
    ingredients: [String],
    vegan: { type: Boolean, es_indexed: true },
    halal:  { type: Boolean, es_indexed: true },
    kosher:  { type: Boolean, es_indexed: true }
});

MealsSchema.plugin(mongoosastic, {});
const Meal = mongoose.model('Meal', MealsSchema);

Meal.createMapping({
    analysis :{
      filter : {
        ngram_filter: {
          type: 'nGram',
          min_gram: 3,
          max_gram: 10,
          token_chars: [
            'letter', 'digit', 'symbol', 'punctuation'
          ]
        }
      },
      analyzer : {
        ngram_analyzer : {
          type: 'custom',
          tokenizer : 'whitespace',
          filter: [
            'lowercase',
            'asciifolding',
            'ngram_filter'
          ]
        },
        keyword_analyzer : {
          tokenizer: 'keyword',
          filter : [
            'lowercase',
            'asciifolding'
          ]
        }
      }
    }
  }, (err, mapping) => {
    if(err)
      return console.log(err);
    console.log(mapping);

});

const stream = Meal.synchronize();
let count = 0;

stream.on('data', (err, doc) => count++);
stream.on('close', () => console.log(`Indexed ${count} documents`));
stream.on('error', err => console.log(err));


module.exports = Meal;

