function waterfall(target, number) {
    this.target = $(target);
    this.target.addClass("waterfall");
    this.number = number;
    this.creatTime = new Date().getTime();
    this.hideFrame = $('<div class="waterfall_hide"></div>').appendTo("body");
    this.init()
}
waterfall.prototype.init = function() {
    var that = this;
    this.target.empty();
    for (var i = 1; i <= that.number; i++) {
        that.target.append('<div class="waterfall_frame"><div class="waterfall_center"></div></div>');
    }
    this.target.find(".waterfall_frame").css({
        width: (1 / that.number * 100) + "%"
    });
    this.target.append('<div class="clear"></div>');
}
waterfall.prototype.total = 0;
waterfall.prototype.add = function(data, isOld) {
    var that = this;
    $.each(data, function(index, value) {
        if (!isOld) {
            that.total++;
        }
        var pointNumber = 0;
        if (!isOld) {
            pointNumber = that.total;
        } else {
            pointNumber = index + 1;
        }
        var newPoint = $('<div class="waterfall_point" number="' + pointNumber + '">' + value + '</div>').appendTo(that.hideFrame);
        var pointDelay = setTimeout(function() {
            var short = false;
            that.target.find(".waterfall_center").each(function() {
                if (!short) {
                    short = $(this)
                } else {
                    if ($(this).height() < short.height()) {
                        short = $(this)
                    }
                }
            });
            short.append(newPoint);
        }, 500);
    });
}
waterfall.prototype.changeNumber = function(number) {
    if (number == this.number) {
        return false;
    } else {
        this.number = number;
    }
    var oldData = [];
    $(".waterfall_point").each(function() {
        oldData[Number($(this).attr("number")) - 1] = $(this).html();
    });
    this.init();
    this.add(oldData, true);
}