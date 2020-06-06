class Timer {

    static startTime = () => {
        let worker = new Worker("./Model/CurrentTime.js");
        if (typeof (Worker) !== "undefined") {
            let today = new Date();
            worker.postMessage(today);

            worker.onmessage = function (event) {
                document.getElementById('chr').innerHTML = event.data[0]; //hours
                document.getElementById('cmin').innerHTML = event.data[1]; //minutes
                document.getElementById('csec').innerHTML = event.data[2]; //seconds
                document.getElementById('current-date').innerHTML = event.data[3]; //date

                if (event.data[2] === "00") {
                    let alarmTime = event.data[0] + ':' + event.data[1] + ':' + event.data[3];
                    new AlarmClockController().startAlarm(alarmTime);
                }
            };
        } else {
            console.log("Sorry, your browser does not support Web Workers ...");
        }

        setTimeout(this.startTime, 500);
    }
}
