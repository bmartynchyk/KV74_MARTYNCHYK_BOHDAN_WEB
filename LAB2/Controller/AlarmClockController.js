class AlarmClockController {

    startAlarm = (alarmTime) => {
        alarmsBuffer.forEach(alarm => {
            if (alarm === alarmTime) {
                let audio = document.getElementById("alarm-sound");
                audio.loop = false;
                audio.play();
            }
        });
    }
}
