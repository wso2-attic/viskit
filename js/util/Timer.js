/**
 * Constructor for the Timer this creates a timer with the specified time limit as
 * the time interval
 * @param timerInterval the time interval for the timer
 */
Viskit.u.Timer = function(timerInterval) {
	this.timerInterval = timerInterval; // sets the interval

	var timerID = 0;
	var timerRunning = false;
	var thisObject = null;
/**
     * updates the time interval of the timer this will stop the timer and
     * start a new timer with the given time interval
     * @param interval the new time interval for the timer
     */
	this.updateInterval = function(interval) {
		if ((interval > 0) && (interval != this.timerInterval)) {
			this.timerInterval = interval;
			this.stopTimer();
			this.startTimer();
		}
	};
/**
     * starts the timer
     * @param immediate whether the timer should be started immediately
     *
     */
	this.startTimer = function(immediate) {
        this.stopTimer();
		if (timerInterval > 0) {
			this.timerRunning = true;
	
			thisObject = this;
			if (thisObject.timerRunning)
			{
                if(immediate) thisObject.tick();
				thisObject.timerID = setInterval(
					function()
					{
						thisObject.tick();
					}, 
					thisObject.timerInterval);
			}
		}
	};
/**
     * stops the timer
     */
	this.stopTimer = function() {
		if (this.timerRunning)
			clearInterval(thisObject.timerID);
		this.timerRunning = false;        
	};
/**
     * this is the function that will be called when the timer is running and each time it reaches the
     * time interval.The user can specify the function and assign it to this.
     */
	this.tick = function() {	
	};
};

