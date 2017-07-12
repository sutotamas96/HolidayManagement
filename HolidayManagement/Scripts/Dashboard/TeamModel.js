function TeamModel(data) {
    var _self = this;
    this.ID = ko.observable();
    this.name = ko.observable();

    if (data != null)
    {
        _self.ID (data.ID);
        _self.name (data.Description);
    }
}