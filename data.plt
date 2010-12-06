set terminal png
set output "graph.png"
set datafile commentschars "#>" 
set xlabel "Date"
set ylabel "Dollars"
set autoscale xy
set xdata time
set timefmt "%Y-%m-%d"  
set format x "%b" 

plot "volatile.txt" using 1:3:4:5:6 notitle with candlesticks whiskerbars 1.5 lt 3 lw 1,\
	"volatile.txt" using 1:2 smooth bezier title "bezier" with lines    