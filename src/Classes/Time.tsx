export default class Time {
    /**
     * Formats a time object into a time string
     *
     * @param {{hour: number, minutes: number, seconds: number}} time - A time object 
     * 
     * @example
     * // returns "02:50:10"
     * formatUnit({hour: 2, minutes: 50, seconds: 10})
     * 
     * 
     * @returns A formatted time string
     *
     */
    public format(time: { hour: number, minutes: number, seconds: number }) {
        return `${this.formatUnit(time.hour)}:${this.formatUnit(time.minutes)}:${this.formatUnit(time.seconds)}`
    }


    /**
     * Formats a time unit into a string
     *
     * @param {number} unit - A time unit
     * 
     * @example
     * // returns "01"
     * formatUnit(1)
     * 
     * // returns "10"
     * formatUnit(10)
     * 
     * @returns A formatted time unit
     *
     */
    private formatUnit(unit: number): string {
        return unit < 10 ? `0${unit}` : `${unit}`
    }


    /**
     * Returns the time left until midnight of today
     *
     * @returns an object containing the hours, minutes and seconds left until midnight
     *
     */
    public timeleft = (): { hour: number, minutes: number, seconds: number } => {
        let tonight: Date = new Date();

        tonight.setHours(23); tonight.setMinutes(59); tonight.setSeconds(59)

        let difference = +tonight - +new Date()

        let timeLeft: { hour: number, minutes: number, seconds: number } = {
            hour: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }
}