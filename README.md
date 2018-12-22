# PolyGA: an example of Genetic Algorithm
This is a simple html5 + js application for experimenting with the implementation of a <a href="https://en.wikipedia.org/wiki/Genetic_algorithm" target="_blank">genetic algorithm</a> for polynomial interpolation.
It exploits <a href="https://www.chartjs.org/">chart.js</a> and <a href="https://jquery.com">jquery</a>, and should run on any sufficiently new browser.

Run it <a href="http://htmlpreview.github.io/?https://github.com/lmari/GA/blob/master/GA.html" target="_blank">here</a>.

This is a short explanation of what can be set up via the control panel of the application.
* _#genes_ (integer from 2 to 20): number of genes of each individual / points of the polynomials / of parameters of the polynomials (= 1 + order of the polynomials)
* _#individuals_ (integer from 1 to 50): number of individuals in the population / of the test polynomials
* _#killed_ (integer from 0 to #individuals): number of individuals in the population killed by selection in each generation / number of test polynomials deleted in each loop
* _%crossover_ (integer from 0 to 50): percentage of crossover in offspring generation / of parameter combination, where 0 means asexual reproduction, i.e., each offspring is identical to a randomly selected parent, and 50 means sexual reproduction from two randomly selected parents which contribute in the same way to the genes of the offspring;
* _%mutation_ (integer from 0 to 100): probability * 100 of mutations / of parameter change, where 0 means that no genes are submitted to mutation and 100 means that all genes are submitted to mutation
* _ampl mutation_ (integer from 0 to 100): relative amplitude of mutations / of parameter change
* _#new individuals_ (integer from 0 to #individuals): number of immigrants in each generation / of new random polynomials

A presentation about Genetic Algorithms in Italian is <a href="https://github.com/lmari/GA/blob/master/GA.pdf">here</a>.
