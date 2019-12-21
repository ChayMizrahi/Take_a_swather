import { CurrentConditionsApiRes } from '../shared/apiResultes/CurrentConditionsApiRes';
import { FiveDaysOfDailyForecastsApiRes, Day, Night } from '../shared/apiResultes/FiveDaysOfDailyForecastsApiRes';

export class CurrentCondition {
    constructor(
        public byCelsius: boolean = true,
        public discription: string,
        public fahrenheit: number,
        public celsius: number,
        public lastUpdate: Date,
        public icon: number,
        public hasPrecipitation: boolean,
        public isDayTime: boolean,
    ) { }
}

export class partDay {
    constructor(
        public icon: number,
        public temperature: number,
        public hasPrecipitation: boolean,
        public iconPhrase: string,
    ) { }
}

export class DailyForecast {
    constructor(
        public date: Date,
        public byCelsius: boolean = true,
        public day: partDay,
        public night: partDay,
        public mobileLink: string,
        public link: string,
    ) { }
}

export class LocationWeather {
    public currentCondition?: CurrentCondition;
    public FiveDayForecasts?: DailyForecast[];
    constructor(
        public name: string,
        public country: string,
        private _key: string,
        public administrativeArea: string
    ) { }

    get key(): string {
        return this._key;
    }

    setCurrentCondition(cc: CurrentConditionsApiRes) {
        this.currentCondition = new CurrentCondition(
            true,
            cc.WeatherText,
            cc.Temperature.Imperial.Value,
            cc.Temperature.Metric.Value,
            new Date(cc.LocalObservationDateTime),
            cc.WeatherIcon,
            cc.HasPrecipitation,
            cc.IsDayTime
        )
    }

    setFiveDayForecasts(fd: FiveDaysOfDailyForecastsApiRes) {
        this.FiveDayForecasts = [];
        fd.DailyForecasts.forEach(d => {
            const daily = new DailyForecast(
                new Date(d.Date),
                true,
                new partDay(d.Day.Icon, d.Temperature.Maximum.Value, d.Day.HasPrecipitation, d.Day.IconPhrase),
                new partDay(d.Night.Icon, d.Temperature.Minimum.Value, d.Night.HasPrecipitation, d.Night.IconPhrase),
                d.MobileLink,
                d.Link
            )
            this.FiveDayForecasts.push(daily);
        })
    }

}