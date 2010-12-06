@echo off

mongo --quiet < volatile.js > volatile.txt

gnuplot data.plt

graph.png

pause -1

rm "graph.png"