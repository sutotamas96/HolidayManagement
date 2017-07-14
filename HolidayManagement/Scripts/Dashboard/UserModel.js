function UserModel(data) {
    var _self = this;
    this.Email = ko.observable();
    this.FirstName = ko.observable();
    this.LastName = ko.observable();
    this.HireDate = ko.observable();
    this.MaxDays = ko.observable();
    this.TeamId = ko.observable();

    if (data != null) {
        if (data.AspNetUser != null) {
            _self.Email(data.AspNetUser.Email);
        }
        _self.FirstName(data.FirstName);
        _self.LastName(data.LastName);
        _self.HireDate(data.HireDate);
        _self.MaxDays(data.MaxDays);
        _self.TeamId(data.TeamId);
    }


}