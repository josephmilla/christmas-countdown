(function($) {

    var TargetDate;
    var BackColor;
    var ForeColor;
    var CountActive;
    var CountStepper;
    var LeadingZero;
    var DisplayFormat;
    var FinishMessage;
    var SetTimeOutPeriod;
    var PutSpan;

    function calcage(secs, num1, num2) {
        s = ((Math.floor(secs / num1)) % num2).toString();
        if (LeadingZero && s.length < 2)
            s = "0" + s;
        return "<b>" + s + "</b>";
    }

    function CountBack(secs, element) {
        if (secs < 0) {
            $(element).html(FinishMessage);
            return;
        }
        DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs, 86400, 100000));
        DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs, 3600, 24));
        DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs, 60, 60));
        DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs, 1, 60));
        $(element).html(DisplayStr);
        if (CountActive) {
            setTimeout(function() {
                CountBack(secs + CountStepper, element);
            }, SetTimeOutPeriod);
        }
    }

    function putspan(backcolor, forecolor, element) {
        $(element).css('background-color', backcolor);
        $(element).css('color', forecolor);
    }

    $.fn.christmasCountdown = function(options) {
        var dt = new Date();
        var params = $.extend({
            TargetDate: "12/25/" + dt.getYear() + " 12:00 AM",
            BackColor: "white",
            ForeColor: "black",
            PutSpan: false,
            CountActive: true,
            CountStepper: -1,
            LeadingZero: true,
            DisplayFormat: "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.",
            FinishMessage: "It is finally here! Merry Christmas!"
        }, options);

        TargetDate = params.TargetDate;
        BackColor = params.BackColor;
        ForeColor = params.ForeColor;
        PutSpan = params.PutSpan;
        CountActive = params.CountActive;
        CountStepper = params.CountStepper;
        LeadingZero = params.LeadingZero;
        DisplayFormat = params.DisplayFormat;
        FinishMessage = params.FinishMessage;

        if (typeof(BackColor) == "undefined")
            BackColor = "white";
        if (typeof(ForeColor) == "undefined")
            ForeColor = "black";
        if (typeof(TargetDate) == "undefined")
            TargetDate = "12/31/2020 5:00 AM";
        if (typeof(DisplayFormat) == "undefined")
            DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
        if (typeof(CountActive) == "undefined")
            CountActive = true;
        if (typeof(FinishMessage) == "undefined")
            FinishMessage = "";
        if (typeof(CountStepper) != "number")
            CountStepper = -1;
        if (typeof(LeadingZero) == "undefined")
            LeadingZero = true;


        CountStepper = Math.ceil(CountStepper);
        if (CountStepper == 0)
            CountActive = false;
        SetTimeOutPeriod = (Math.abs(CountStepper) - 1) * 1000 + 990;
        if (PutSpan) {
            putspan(BackColor, ForeColor, this);
        }

        var dthen = new Date(TargetDate);
        var dnow = new Date();
        if (CountStepper > 0)
            ddiff = new Date(dnow - dthen);
        else
            ddiff = new Date(dthen - dnow);
        gsecs = Math.floor(ddiff.valueOf() / 1000);
        return CountBack(gsecs, this);

    }

}(jQuery));
