function MonthDaysModel(data) {

    _self = this;
    this.ID = ko.observable(null);
    this.name = ko.observable(null);
    this.isFreeDay = ko.observable(null);
    this.description = ko.observable(null);

    if (data != null) {
        _self.ID(data.day);
        _self.name(data.name);
        _self.isFreeDay(data.isFreeDay);
        _self.description(data.description);

    }
}