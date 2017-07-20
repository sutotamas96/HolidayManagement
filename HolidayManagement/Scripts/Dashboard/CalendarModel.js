function CalendarModel(data) {
    
    var _self = this;
    this.vacations = ko.observableArray();
    this.monthdays = ko.observableArray();

    if (data != null) {
        monthdaysc = _.map(data.monthdays, function (mday, index) {
            return new MonthDaysModel(mday);
        });
        vacationss = _.map(data.vacations, function (day, index) {
            return new VacationModel(day);
        });
        _self.vacations(vacationss);
        _self.monthdays(monthdaysc);
    }
}