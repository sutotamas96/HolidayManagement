function UserModel(data) {
    var _self = this;
    this.id = ko.observable(0);
    this.Email = ko.observable();
    this.FirstName = ko.observable();
    this.LastName = ko.observable();
    this.HireDate = ko.observable();
    this.MaxDays = ko.observable();
    this.UserID = ko.observable();
    this.TeamId = ko.observable();

    if (data != null) {
        _self.id(data.ID);
        if (data.AspNetUser != null) {
            _self.Email(data.AspNetUser.Email);
        }
        _self.FirstName(data.FirstName);
        _self.LastName(data.LastName);
        _self.HireDate(data.HireDate);
        _self.MaxDays(data.MaxDays);
        _self.TeamId(data.TeamId);
        _self.UserID(data.UserID);
    }


}