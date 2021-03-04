export const themes = {
	'default': {
		css: `
			ha-card {
				height:100%;
			}

			#htc-weather-card-container {
    		    width:95%;
				height:100%;
    		    background-repeat:no-repeat!important;
    		    position:relative;
    		    overflow:hidden;
    		    font-family:Arial, Verdana, Tahoma, Helvetica, sans-serif;
    		    margin: auto;
                background: url("../local/custom_ui/htc-weather/themes/default/background.png") 50% 11%;
				background-size:100%;
    		}

    		#htc-weather-card-container p {
    		    margin:3% 0 0 0;
    		    /*padding:0;*/
    		}

    		#htc-clock {
    		    /*float:left;
    		    margin-left:4%;*/
				justify-content: space-evenly;
				display: flex;
				flex-direction: row;
    		}

    		#hours, #minutes {
    		    width:45%;
    		    height:44%;
				/*display:flex;*/
    		    position:relative;
    		}

    		/*#minutes {
    		    margin-left:1%;
    		}*/

    		#hours_bg, #minutes_bg {
    		    width:100%;
    		    height:100%;
    		    /*position:absolute;
    		    top:0;
    		    left:0;
    		    z-index:99;*/
    		}

    		.first_digit {
    		    /*max-width:24%;
    		    z-index:100;
				top:0;
				*/
				position:absolute;    
    		    left:10%;
				max-height:100%
    		}

    		.second_digit {
				max-height:100%;
    		    position:absolute;
				left:47%;
    		    /*top:0;
    		    z-index:100;
				*/
    		}

    		.line {
    		    /*width:175px;*/
				width:80%;
    		    height:2px;
    		    background:#efefef;
    		    position:absolute;
    		    top:47.5%;
				margin:0%;
    		    left:7%;
    		    z-index:105;
    		    /*font-size:1px;*/
    		}

    		#am_pm {
    		    position:absolute;
    		    top:156px;
    		    left:130px;
    		    z-index:110;
    		}


    		#htc-weather {
    		    width:100%;
    		    /*height:70%;//313px;*/
    		    position:relative;
				/*top:25%; 135px;*/
				margin-top:-35%;
    		    /*left:0;*/
    		    z-index:101;
    		}

    		#htc-weather .loading {
    		    float:left;
    		    margin:90px 0 0 45px;
    		}
    		#htc-weather #local{
    		    float:left;
    		    margin:35% 0 0 5%;
    		    color: #fff;
				width:17%;
    		}

    		.city {
    		    font-size:large;
    		}
    		.high_low {
    		    font-size:18pt;
    		}

    		#htc-weather #temp {
    		    float:right;
    		    margin-top:35%;
				margin-right: 5%;
    		    text-align:right;
    		    color:#fff;
    		}

    		#htc-weather #date {
    		    font-size:large;
    		    padding-right:2px;
				color: #fff;
    		}

    		.temp {
    		    font-size:large;
    		    padding:0;
    		}

    		/*.temp .metric {
    		    margin-left:-3px;
    		}*/


    		#htc-weather #forecast {
    		    width:100%;
				list-style-type:none;
				padding-top:27%;
				padding-left:0%;
				display:flex;
    		    /*height:100px;
    		    position: relative;
				margin:40% 0 0 0px;
    		    padding:0;*/
    		}
    		#htc-weather #forecast li:first-child {
    		    border-left: 0px solid;
    		}
    		#htc-weather #forecast li {
    		    width:24%;
    		    height:100%;
    		    float:left;
    		    text-align:center;
    		    border-left: 0.1em solid rgb(217, 217, 217);
				z-index:100;
    		}
    		

    		#htc-weather #forecast li p {
    		    width:100%;
    		    height:15px;
    		    margin:0;
    		    padding:0;
    		    font-size:18pt;
    		    line-height:20px;
    		}

    		#htc-weather #forecast li .dayname {
    		    font-size: large;//12pt;
    		    font-weight: bold;
    		}

    		#htc-weather #forecast li img {
    		    width:100%;//106px;
				margin-top: 15%;
    		}

    		#htc-weather #forecast li .daytemp {
    			/*position:absolute;
    		    bottom: 0px;
    		    //width: 25%;
    		    //text-align:center;
				*/
    		    font-weight: bold;
				font-size:x-small;
    		}


    		#htc-weather #bottom {
    		    text-align:right;
    		    margin-right: 3%;
    		    height: 7%;
				fonst-size:small;
    		}
    		#htc-weather #sun_details {
    		    margin: 2% 0px 0px 0px;
    		    float: left;
    		    text-align:left;
    		    font-size: smaller;
    		}

    		#htc-weather #wind_details{
    			margin: 1% 0px 0px 0px;
    		    float: right;
    		    text-align: left;
    		    font-size: smaller;
    		}

    		#htc-weather #update {
    		    margin:4px 0px 0px 0px;
    		    float:right;
    		    text-align:right;
    		    font-size:10px;
    		    clear: both;
    		}

    		#htc-weather #update img {
    		    margin:-2px 4px 0 0;
    		    vertical-align:middle;
    		    width: 10px;
    		}
			#digit_bg{
				max-width: 100%;
				max-height: 100%;
			}
			`,

	},
	'dusk': {
		css: `#htc-weather-card-container {
    		    width:440px;
    		    height:448px;
    		    background-repeat: no-repeat!important;
    		    background-size:100%!important;
    		    position:relative;
    		    overflow:hidden;
    		    font-family:Arial, Verdana, Tahoma, Helvetica, sans-serif;
    		    margin: auto;
    		}

    		#htc-weather-card-container p {
    		    margin:0;
    		    padding:0;
    		}

    		#htc-clock {
    		    float:left;
    		    margin-left:18px;
    		}

    		#hours, #minutes {
    		    width:200px;
    		    height:200px;
    		    float:left;
    		    position:relative;
    		}

    		#minutes {
    		    margin-left:4px;
    		}

    		#hours_bg, #minutes_bg {
    		    width:100%;
    		    height:100%;
    		    position:absolute;
    		    top:0;
    		    left:0;
    		    z-index:99;
    		}

    		.first_digit {
    		    width:80px;
    		    height:100%;
    		    position:absolute;
    		    top:0;
    		    left:20px;
    		    z-index:100;
    		}

    		.second_digit {
    		    width:80px;
    		    height:100%;
    		    position:absolute;
    		    top:0;
    		    left:100px;
    		    z-index:100;
    		}

    		.line {
    		    width:0px;
    		    height:0px;
    		    background:#efefef;
    		    position:absolute;
    		    top:97px;
    		    left:12px;
    		    z-index:101;
    		    font-size:1px;
    		}

    		#am_pm {
    		    position:absolute;
    		    top:156px;
    		    left:130px;
    		    z-index:110;
    		}


    		#htc-weather {
    		    width:100%;
    		    height:313px;
    		    position:absolute;
    		    top:135px;
    		    left:0;
    		    z-index:105;
    		}

    		#htc-weather .loading {
    		    float:left;
    		    margin:90px 0 0 45px;
    		}
    		#htc-weather #local {
    		    float:left;
    		    margin:70px 0 0 30px;
    		    color: #fff
    		}

    		.city {
    		    font-size:14pt;
    		}
    		.high_low {
    		    font-size:18pt;
    		}

    		#htc-weather #temp {
    		    float:right;
    		    margin:70px 30px 0 0;
    		    text-align:right;
    		    color:#fff
    		}

    		#htc-weather #date {
    		    font-size:14pt;
    		    padding-right:2px;
    		}

    		.temp {
    		    font-size:18pt;
    		    padding:0;
    		}

    		.temp .metric {
    		    margin-left:-3px;
    		}


    		#htc-weather #forecast {
    		    width:440px;
    		    height:100px;
    		    list-style:none;
    		    margin:175px 0 0 0px;
    		    padding:0;
    		    position: relative;
    		    background-repeat: no-repeat;
    		    background-size:cover !important
    		}
    		#htc-weather #forecast li:first-child {
    		    border-left: 0px solid;
    		}
    		#htc-weather #forecast li {
    		    width:24%;
    		    height:100%;
    		    float:left;
    		    text-align:center;
    		    border-left: 0.1em solid rgb(217, 217, 217);
    		}
    		

    		#htc-weather #forecast li p {
    		    width:100%;
    		    height:15px;
    		    margin:0;
    		    padding:0;
    		    font-size:18pt;
    		    line-height:20px;
    		}

    		#htc-weather #forecast li .dayname {
    		    font-size:12pt;
    		    font-weight: bold;
    		}

    		#htc-weather #forecast li img {
    		    width:70px;
    		}

    		#htc-weather #forecast li .daytemp {
    		    position:absolute;
    		    bottom: 0px;
    		    width: 25%;
    		    text-align:center;
    		    font-weight: bold
    		}


    		#htc-weather #bottom {
    		    text-align:right;
    		    margin: 0px 14px 0px 1px;
    		    height: 25px;
    		}
    		#htc-weather #sun_details {
    		    margin: 4px 0px 0px 0px;
    		    float: left;
    		    text-align:left;
    		    font-size: 14px;
    		}

    		#htc-weather #wind_details{
    			margin: 4px 0px 0px 0px;
    		    float: right;
    		    text-align: left;
    		    font-size: 14px;
    		}

    		#htc-weather #update {
    		    margin:4px 0px 0px 0px;
    		    float:right;
    		    text-align:right;
    		    font-size:10px;
    		    clear: both;
    		}

    		#htc-weather #update img {
    		    margin:-2px 4px 0 0;
    		    vertical-align:middle;
    		    width: 10px;
    		}`
	}
};
