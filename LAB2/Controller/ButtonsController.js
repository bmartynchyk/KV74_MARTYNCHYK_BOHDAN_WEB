class ButtonsController {

    setAlarmClock = () => {
        let time = document.getElementById("appt-time").value;
        let selectedDate = document.getElementById("appt-date").value;

        if(time === undefined || time === "" || time === null){
            alert("Error! Enter time");
            return;
        }

        if(selectedDate === undefined || selectedDate === "" || selectedDate === null){
            alert("Error! Enter date");
            return;
        }

        let alarmTime = time + ':' + selectedDate;
        if (alarmsBuffer.includes(alarmTime)) {
            alert("This alarm clock already exists");
            return;
        }

        alarmsBuffer.push(alarmTime);

        let hours = this.parseTime(alarmTime)[0];
        let minutes = this.parseTime(alarmTime)[1];
        let date = this.parseTime(alarmTime)[2];

        new AlarmsList(hours, minutes, date).showAlarms();
    }

    resetSound = () => {
        document.getElementById("alarm-sound").pause();
        document.getElementById("alarm-sound").currentTime = 0;
    }

    parseTime = (time) => {
        return time.split(':');
    }
}
