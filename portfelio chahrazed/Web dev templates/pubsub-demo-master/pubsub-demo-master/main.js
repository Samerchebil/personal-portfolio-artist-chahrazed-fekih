/**
 * build the interface and decide which modules to display
 * on the web page
 **/

import { movies } from './movies.js';
import { movieForm } from './movie-form.js';
import { stats } from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');
  let aside = document.querySelector('aside');
  //add a movies module
  movies.render(main);

  //add a form to add movies
  movieForm.render(aside);

  //add a stats module
  stats.render(aside);

  
});
