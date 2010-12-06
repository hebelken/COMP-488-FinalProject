This is a project that toys around with MongoDB's mapReduce function.

It uses the same database as my fork of Dean Wampler's AkkaWebSampleExercise
	http://infochimps.org/datasets/daily-1970-current-open-close-hi-low-and-volume-nyse-exchange-up--2
	
	
Plotting the data with the .bat executable requires gnuplot is installed and your PATH variable is pointing to its binaries.	
	
Once the database is installed and mongod is running, if you want to plot the data, set any valid dates (beginDate(8), endDate(9))
	And the section of the database you wish to query in volatile.js
	
	Unfortunately, this database, and version of volatile.js enforces querying only one letter of the alphabet at a time.
	To change the letter, change lines (29, 42, 65, and 72)
	From: 
		db.A_prices....
	To:
		db.x_prices....
		
	x = your letter.
	
	I will work on allowing users to only have to change it in one place.
	
