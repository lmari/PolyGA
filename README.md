# Genetic Algorithm: an example
This is an html5 + js application for experimenting with the implementation of a <a href="https://en.wikipedia.org/wiki/Genetic_algorithm" target="_blank">genetic algorithm</a> for polynomial interpolation.
It exploits <a href="https://www.chartjs.org/">chart.js</a> and <a href="https://jquery.com">jquery</a>, and should run on any sufficiently new browser.

Run it <a href="http://htmlpreview.github.io/?https://github.com/lmari/GA/blob/master/GA.html" target="_blank">here</a>.

This is a short explanation of what can be set up via the control panel of the application.
* _numPts_ (integer from 2 to 20): number of genes = number of points of the polynomials = number of parameters of the polynomials = 1 + order of the polynomials
* _numSrs_ (integer from 1 to 20): number of individuals in the population = number of test polynomials
* _combin%_ (integer from 0 to 50): percentage of crossover in offspring generation = percentage of parameter combination, where 0 means asexual reproduction, i.e., each offspring is identical to a randomly selected parent, and 50 means sexual reproduction from two randomly selected parents which contribute in the same way to the genes of the offspring;
* _change%_ (integer from 0 to 100): probability of mutation = probability of parameter change, where 0 means that no genes are sumbitted to mutation and 100 means that all genes are sumbitted to mutation
* _introd%_ (integer from 0 to 100): percentage of immigrants = percentage of new random polynomials
