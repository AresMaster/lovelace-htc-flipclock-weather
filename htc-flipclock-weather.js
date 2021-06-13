//import "https://unpkg.com/wired-card@0.8.1/wired-card.js?module";
//import "https://unpkg.com/wired-toggle@0.8.0/wired-toggle.js?module";
import {
    LitElement,
    html
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
//const LitElement = Object.getPrototypeOf(customElements.get("hui-view"));
//const html = LitElement.prototype.html;
import { regional } from './regional.js?v1.1.4';
import { themes } from './themes.js?v1.0.1';

const weatherDefaults = {
    widgetPath: '/local/custom_ui/htc-weather/',
    lang: 'en',
    am_pm: false,
    svrOffset: 0,
    render: true,
    renderClock: true,
    renderDetails: true,
    high_low_entity: false,
    theme: {
        name: 'default',
        weather_icon_set: 'default'
    }
};
weatherDefaults['imagesPath'] = weatherDefaults.widgetPath + 'themes/' + weatherDefaults.theme['name'] + '/'
weatherDefaults['clockImagesPath'] = weatherDefaults.imagesPath + 'clock/'
weatherDefaults['weatherImagesPath'] = weatherDefaults.imagesPath + 'weather/' + weatherDefaults.theme['weather_icon_set'] + '/'

const htcVersion = "1.3.1";


const weatherIconsDay = {
    clear: "sunny",
    "clear-night": "night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "hail",
    lightning: "thunder",
    "lightning-rainy": "thunder",
    partlycloudy: "partlycloudy",
    pouring: "pouring",
    rainy: "pouring",
    snowy: "snowy",
    "snowy-rainy": "snowy-rainy",
    sunny: "sunny",
    windy: "cloudy",
    "windy-variant": "cloudy-day-3",
    exceptional: "na"
};

const weatherIconsNight = {
    ...weatherIconsDay,
    fog: "fog",
    clear: "night",
    sunny: "night",
    partlycloudy: "cloudy-night-3",
    "windy-variant": "cloudy-night-3"
};

/*
const windDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N"
];
*/
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

function hasConfigOrEntityChanged(element, changedProps) {
    if (changedProps.has("_config")) {
        return true;
    }
    const oldHass = changedProps.get("hass");
    if (oldHass) {
        return (
            oldHass.states[element._config.entity] !==
            element.hass.states[element._config.entity] ||
            oldHass.states["sun.sun"] !== element.hass.states["sun.sun"] ||
            oldHass.states["sensor.date_time_iso"] !== element.hass.states["sensor.date_time_iso"]
        );
    }
    return true;
}
console.info("%c HTC Flip Clock %c ".concat(htcVersion, " "), "color: white; background: #555555; ", "color: white; background: #3a7ec6; ");
class HtcWeather extends LitElement {
    static get getConfig(){
        return this._config;
    }
    static set setConfig(config){
        this._config = config;
    }
    static get getHass(){
        return this.hass;
    }
    static set setHass(hass){
        this.hass = hass;
    }
    static get properties() {
        return {
            _config: this.getConfig,
            hass: this.getHass
        };
    }

    async importJquery() {
        await import("./lib/jquery-3.6.0.min.js")
        return {config:this._config, entity: this.hass.states[this._config.entity], hass_states:this.hass.states}
    }

    static getStubConfig() {
        return {};
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error(`Entity not available/installed: ${config.entity}`);
        }
        var defaultConfig = {}
        for (const property in config) {
            defaultConfig[property] = config[property]
        }
        for (const property in weatherDefaults) {
            if(config[property] === undefined){
                defaultConfig[property] = weatherDefaults[property]
            }
        }
        defaultConfig['imagesPath'] = defaultConfig.widgetPath + 'themes/' + defaultConfig.theme['name'] + '/'
        defaultConfig['clockImagesPath'] = defaultConfig.imagesPath + 'clock/'
        defaultConfig['weatherImagesPath'] = defaultConfig.imagesPath + 'weather/' + defaultConfig.theme['weather_icon_set'] + '/'
        this._config = defaultConfig;
    }
    shouldUpdate(changedProps) {
        var shouldUpdate = hasConfigOrEntityChanged(this, changedProps);
        if(shouldUpdate){
            HtcWeather.setHass = this.hass
            this.render();

        }
        return shouldUpdate;
    }

    render() {
        if (!this._config || !this.hass) {
            return html``;
        }
        HtcWeather.setConfig = this._config
        HtcWeather.setHass = this.hass
        //var entity = this._config.entity;
        //var entity_name = this._config.entity;
        if(this._config.high_low_entity){
            if(!this.hass.states[this._config.high_low_entity.entity_id]){
                entity = this.hass.states[this._config.high_low_entity.entity_id]
                entity_name = this._config.high_low_entity.entity_id;
            }
        }
/*
        if (!entity) {
          return html`
            <style>
              .not-found {
                flex: 1;
                background-color: red;
                padding: 8px;
              }
            </style>
            <ha-card>
              <div class="not-found">
                Entity not available/installed: ${entity_name}
              </div>
            </ha-card>
          `;
        }
        */
        return this.renderCard()
    }
    renderCard() {

        if (!this.content) {
          const card = document.createElement('ha-card');
          const style = document.createElement('style');
          style.textContent = this.getStyle(this._config);
          card.appendChild(style);
          const script = document.createElement('script');
          script.textContent = this.getScript();
          card.appendChild(script);
          this.content = card;
          this.appendChild(card);
        }

        var old_time = HtcWeather.getOldTime()
        const root = this.content;
        if (root.lastChild) root.removeChild(root.lastChild);
        //root.innerHTML = '';

        //const card = document.createElement('ha-card');
        //root.appendChild(card);
        root.onclick = function () {
            this._handleClick(this._config.entity);
        }.bind(this);
        const container = document.createElement('div');
        container.id = 'htc-weather-card-container';
        root.appendChild(container);

        const htc_clock = document.createElement('div')
        htc_clock.id = 'htc-clock'
        container.appendChild(htc_clock)

        const htc_clock_hours = document.createElement('div')
        htc_clock_hours.id = 'hours'
        htc_clock.appendChild(htc_clock_hours)

        const htc_clock_hours_line = document.createElement('div')
        htc_clock_hours_line.classList.add('line')
        htc_clock_hours.appendChild(htc_clock_hours_line)


        const hours_bg_img = document.createElement('img')
        hours_bg_img.src = `${this._config.clockImagesPath + 'clockbg1.png'}`
        hours_bg_img.id = 'digit_bg'
        htc_clock_hours.appendChild(hours_bg_img)

        const hours_bg_first = document.createElement('img')
        hours_bg_first.id = 'fhd';
        hours_bg_first.src = `${this._config.clockImagesPath + old_time.firstHourDigit + '.png'}`
        hours_bg_first.classList.add('first_digit')
        htc_clock_hours.appendChild(hours_bg_first)

        const hours_bg_second = document.createElement('img')
        hours_bg_second.id = 'shd'
        hours_bg_second.src = `${this._config.clockImagesPath + old_time.secondHourDigit + '.png'}`
        hours_bg_second.classList.add('second_digit')
        htc_clock_hours.appendChild(hours_bg_second)

        const htc_clock_minutes = document.createElement('div')
        htc_clock_minutes.id = 'minutes'
        htc_clock.appendChild(htc_clock_minutes)

        

        const hours_min_img = document.createElement('img')
        hours_min_img.src = `${this._config.clockImagesPath + 'clockbg1.png'}`
        hours_min_img.id = 'digit_bg'
        htc_clock_minutes.appendChild(hours_min_img)

        const htc_clock_minutes_line = document.createElement('div')
        htc_clock_minutes_line.classList.add('line')
        htc_clock_minutes.appendChild(htc_clock_minutes_line)
        
        if(this._config.am_pm !== false){

            const htc_clock_am_pm = document.createElement('div')
            htc_clock_am_pm.id = 'am_pm'
            htc_clock.appendChild(htc_clock_am_pm)

            const am_pm_img = document.createElement('img')
            am_pm_img.src = `${this._config.clockImagesPath +'am.png'}`
            htc_clock_am_pm.appendChild(am_pm_img)
        }

        const min_bg_first = document.createElement('img')
        min_bg_first.id = 'fmd'
        min_bg_first.src = `${this._config.clockImagesPath + old_time.firstMinuteDigit + '.png'}`
        min_bg_first.classList.add('first_digit')
        htc_clock_minutes.appendChild(min_bg_first)

        const min_bg_second = document.createElement('img')
        min_bg_second.id = 'smd'
        min_bg_second.src = `${this._config.clockImagesPath + old_time.secondMinuteDigit + '.png'}`
        min_bg_second.classList.add('second_digit')
        htc_clock_minutes.appendChild(min_bg_second)

        const htc_weather = document.createElement('div')
        htc_weather.id = 'htc-weather'
        container.appendChild(htc_weather)

        const spinner = document.createElement('p')
        spinner.classList.add('loading')
        spinner.innerHTML = `Fetching weather...`
        htc_weather.appendChild(spinner)

        if(!window.jQuery){
            this.importJquery().then(function(result){
                HtcWeather.setNewTime(htc_clock)
                HtcWeather.setNewWeather(htc_weather)
            })  
        }else{
            HtcWeather.setNewTime(htc_clock)
            HtcWeather.setNewWeather(htc_weather)
        }
        return html`${root}`;
    }
    static setNewWeather(elem){
        var config = HtcWeather.getConfig;
        var stateObj = HtcWeather.getHass.states[HtcWeather.getConfig.entity];
        var hass_states = HtcWeather.getHass.states;
        var temp_now = stateObj.attributes.temperature.toFixed(1)
        var weatherIcon = HtcWeather.getWeatherIcon(config, stateObj.state)
        var curr_temp = `<p class="temp">${String(temp_now).trim()}
                       <span class="metric">
                       ${HtcWeather.getUnit("temperature").trim()}</span></p>`;
        $(elem).css('background','url('
                 + weatherIcon 
                 + ') 50% 0 no-repeat');
        $(elem).css('background-position','center');
        $(elem).css('background-size','100%');
        var weather = `<div id="local">
                            <p class="city">${stateObj.attributes.friendly_name.trim()}</p>
                            ${curr_temp.trim()}
                        </div>`;
        weather += HtcWeather.getHighLow();
        
        weather += '</p></div>';

        $(elem).html(weather);
        if(config.renderForecast){
            var ulElement = `<ul id="forecast"></ul>`;
            $(elem).append(ulElement);
         
            for (var i = 0; i <= 3; i++) {

                var d_date = new Date(stateObj.attributes.forecast[i].datetime);
                var forecastIcon =  HtcWeather.getWeatherIcon(config, stateObj.attributes.forecast[i].condition)
                var forecast = `<li>`;
                forecast    += `<p class="dayname">${regional[config.lang]['dayNames'][d_date.getDay()]}&nbsp;${d_date.getDate()}</p>
                                <img src="${forecastIcon}" alt="${stateObj.attributes.forecast[i].condition}" title="${stateObj.attributes.forecast[i].condition}" />
                                <div class="daytemp">${stateObj.attributes.forecast[i].temperature.toFixed(1)}${this.getUnit("temperature")}`
                if($.isNumeric(stateObj.attributes.forecast[i].templow)){
                    forecast += `&nbsp;/&nbsp;${stateObj.attributes.forecast[i].templow.toFixed(1)}${this.getUnit("temperature")}`;
                }
                forecast += `</div></li>`;
                $(elem).find('#forecast').append(forecast);
            }
        }
        if(config.renderDetails){
            HtcWeather.renderDetails(elem, config,stateObj,hass_states) 
        }
    }

    static getHighLow(){
        var config = HtcWeather.getConfig
        var returnEntityHtml = '';
        var high_low_state = '';
        var today_date = `${regional[config.lang]['dayNames'][new Date().getDay()]}&nbsp;${new Date().getDate()}`;
        var is_forecast = true;
        if(config.high_low_entity){
            var stateObj = HtcWeather.getHass.states[config.high_low_entity.entity_id]
            high_low_state = stateObj.state
            var high_low_date = (config.high_low_entity.name)?config.high_low_entity.name:today_date;
            is_forecast = false
        }else{
            var stateObj = HtcWeather.getHass.states[config.entity]
            high_low_state = stateObj.attributes.forecast[0].temperature.toFixed(1)+this.getUnit("temperature")
            var high_low_date = today_date;
        }
        returnEntityHtml += `<div id="temp"><p id="date">&nbsp${high_low_date}</p>
         ${high_low_state}`
        if(is_forecast && $.isNumeric(stateObj.attributes.forecast[0].templow)){
            returnEntityHtml += `&nbsp;/&nbsp;${stateObj.attributes.forecast[0].templow.toFixed(1)}${this.getUnit("temperature")}`;
        }
        return returnEntityHtml;
    }
    static getOldTime() {
        var config = HtcWeather.getConfig
        var localtime = new Date(HtcWeather.getHass.states["sensor.date_time_iso"].state);
        var now = new Date(localtime.getTime() - (config.svrOffset*1000));
        var old = new Date();
        old.setTime(now.getTime() - 60000);
        
        var old_hours, old_minutes, timeOld = '';
        old_hours =  old.getHours();
        old_minutes = old.getMinutes();

        if (config.am_pm) {
            old_hours = ((old_hours > 12) ? old_hours - 12 : old_hours);
        } 

        old_hours   = ((old_hours <  10) ? "0" : "") + old_hours;
        old_minutes = ((old_minutes <  10) ? "0" : "") + old_minutes;

        var firstHourDigit = old_hours.substr(0,1);
        var secondHourDigit = old_hours.substr(1,1);
        var firstMinuteDigit = old_minutes.substr(0,1);
        var secondMinuteDigit = old_minutes.substr(1,1);
        var old_time = {
            firstHourDigit : firstHourDigit,
            secondHourDigit: secondHourDigit,
            firstMinuteDigit : firstMinuteDigit,
            secondMinuteDigit: secondMinuteDigit,
            old_hours:old_hours,
            old_minutes:old_minutes
        }
        return old_time
        // set minutes
    }
    static setNewTime(elem){
        var config = HtcWeather.getConfig
        var localtime = new Date(HtcWeather.getHass.states["sensor.date_time_iso"].state);
        var now = new Date(localtime.getTime() - (config.svrOffset*1000));
        var old = new Date();
        old.setTime(now.getTime() - 60000);
        
        var now_hours, now_minutes, old_hours, old_minutes, timeOld = '';
        now_hours =  now.getHours();
        now_minutes = now.getMinutes();
        old_hours =  old.getHours();
        old_minutes = old.getMinutes();

        if (config.am_pm) {
            var am_pm = now_hours > 11 ? 'pm' : 'am';
            $(elem).find("#am_pm").find('img').attr("src",config.clockImagesPath + am_pm+".png")
            now_hours = ((now_hours > 12) ? now_hours - 12 : now_hours);
            old_hours = ((old_hours > 12) ? old_hours - 12 : old_hours);
        } 

        now_hours   = ((now_hours <  10) ? "0" : "") + now_hours;
        now_minutes = ((now_minutes <  10) ? "0" : "") + now_minutes;
        old_hours   = ((old_hours <  10) ? "0" : "") + old_hours;
        old_minutes = ((old_minutes <  10) ? "0" : "") + old_minutes;

        var firstHourDigit = old_hours.substr(0,1);
        var secondHourDigit = old_hours.substr(1,1);
        var firstMinuteDigit = old_minutes.substr(0,1);
        var secondMinuteDigit = old_minutes.substr(1,1);

        if (secondMinuteDigit != '9') {
            firstMinuteDigit = firstMinuteDigit + '1';
        }

        if (old_minutes == '59') {
            firstMinuteDigit = '511';
        }
        var fmd = $(elem).find('#minutes').find("#fmd")
        var smd = $(elem).find('#minutes').find("#smd")
        var bg = $(elem).find('#minutes').find("#digit_bg")
        
        for (let i = 1; i < 6; ++i){
            var time = 100 * i + 20; //time equation
            if (i % 2 != 0) { //odd
                var image_number = (Math.ceil(i / 2)).toString();
                setTimeout(function () {
                    $(fmd).attr('src', config.clockImagesPath + firstMinuteDigit + '-' + image_number + '.png');
                    $(smd).attr('src', config.clockImagesPath + secondMinuteDigit + '-' + image_number + '.png');
                    $(bg).attr('src', config.clockImagesPath + 'clockbg' + (i + 1).toString() + '.png');
                },time);
            }else{
                setTimeout(function() { 
                    $(bg).attr('src', config.clockImagesPath + 'clockbg'+(i+1).toString()+'.png');
                },time);
            }
        } 
      
        setTimeout(function () {
            $(fmd).attr('src', config.clockImagesPath + now_minutes.substr(0,1) + '.png');
            $(smd).attr('src', config.clockImagesPath + now_minutes.substr(1,1) + '.png');
            $(bg).attr('src', config.clockImagesPath + 'clockbg1.png');
        }, 100 * 6 + 20);

        if (now_minutes == '00') {
           
            if (config.am_pm) {
                if (now_hours == '00') {                   
                    firstHourDigit = firstHourDigit + '1';
                    now_hours = '12';
                } else if (now_hours == '01') {
                    firstHourDigit = '001';
                    secondHourDigit = '111';
                } else {
                    firstHourDigit = firstHourDigit + '1';
                }
            } else {
                if (now_hours != '10') {
                    firstHourDigit = firstHourDigit + '1';
                }

                if (now_hours == '20') {
                    firstHourDigit = '1';
                }

                if (now_hours == '00') {
                    firstHourDigit = firstHourDigit + '1';
                    secondHourDigit = secondHourDigit + '11';
                }
            }
            var fhd = $(elem).find('#hours').find('#fhd')
            var shd = $(elem).find('#hours').find('#shd')
            var bg = $(elem).find('#hours').find("#digit_bg")

            for (let i = 1; i < 6; ++i){
                var time = 100 * i + 20; //time equation
                if (i % 2 != 0) { //odd
                    var image_number = (Math.ceil(i / 2)).toString();
                    setTimeout(function() {
                        $(fmd).attr('src', config.clockImagesPath + firstHourDigit + '-'+ image_number +'.png');
                        $(smd).attr('src', config.clockImagesPath + secondHourDigit + '-'+ image_number +'.png');
                        $(bg).attr('src', config.clockImagesPath + 'clockbg'+(i+1).toString()+'.png');
                    }, time);
                }else{
                    setTimeout(function() { 
                        $(bg).attr('src', config.clockImagesPath + 'clockbg'+(i+1).toString()+'.png');

                    }, time);
                }
            } 
           
            setTimeout(function() { 
                $(fhd).attr('src', config.clockImagesPath + now_hours.substr(0,1) + '.png');
                $(shd).attr('src', config.clockImagesPath + now_hours.substr(1,1) + '.png')
                $(bg).attr('src', config.clockImagesPath + 'clockbg1.png');

            }, 100 * 6 + 20);
        }
    }
    static getUnit(measure) {
        const lengthUnit = HtcWeather.getHass.config.unit_system.length;
        switch (measure) {
            case "air_pressure":
                return lengthUnit === "km" ? "hPa" : "inHg";
            case "length":
                return lengthUnit;
            case "precipitation":
                return lengthUnit === "km" ? "mm" : "in";
            default:
                return HtcWeather.getHass.config.unit_system[measure] || "";
        }
    }

    static renderDetails(elem, config,stateObj,hass_states) {
    
        const sun = hass_states["sun.sun"];
        let next_rising;
        let next_setting;

        if (sun) {
            next_rising = new Date(sun.attributes.next_rising);
            next_setting = new Date(sun.attributes.next_setting);
            $(elem).append(`<div id="bottom">
                <div id="sun_details"></div>
                <div id="wind_details"></div>
                <div id="update">
                    <img src="${config.imagesPath}refresh_grey.png" alt="Last update" title="Last update" id="reload" />${new Date(stateObj.last_updated).toLocaleTimeString()}
                </div>
            </div>`);
            var sun_details = `<font color="orange">☀</font> <font color="green"><ha-icon icon="mdi:weather-sunset-up"></ha-icon></font>&nbsp;${next_rising.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;<font color="red"><ha-icon icon="mdi:weather-sunset-down"></ha-icon></font>&nbsp;${next_setting.toLocaleTimeString()}`;
            $(elem).find('#sun_details').append(sun_details);   
            $(elem).find('#wind_details').append(`
                    <span class="ha-icon"><ha-icon icon="mdi:weather-windy"></ha-icon></span>
                    ${
                        regional[config.lang]['windDirections'][
                          parseInt((stateObj.attributes.wind_bearing + 11.25) / 22.5)
                        ]
                    } ${stateObj.attributes.wind_speed}<span class="unit">
                    ${this.getUnit("length")}/h</span>
                `);
        }
        return
    }
    _handleClick(entity) {
        fireEvent(this, "hass-more-info", { entityId: entity });
    }
    static getWeatherIcon(config, condition) {
        var hass_states = HtcWeather.getHass.states;

        return `${config.weatherImagesPath}${
            hass_states["sun.sun"] && hass_states["sun.sun"].state == "below_horizon"
            ? weatherIconsNight[condition]
            : weatherIconsDay[condition]
        }.png`;
    }


    getCardSize() {
        return 3;
    }
    getScript(){}

    getStyle(config) {
        return themes[config.theme['name']]['css'];
    }
    static get styles() {
        // return css(themes[this._config.theme['name']]['css']);
    }
}
customElements.define("htc-weather-card", HtcWeather);
