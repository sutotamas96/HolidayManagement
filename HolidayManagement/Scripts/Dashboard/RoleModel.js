function RoleModel(data) {
    var _self = this;
    this.ID = ko.observable();
    this.name = ko.observable();

    if (data != null) {
        _self.ID(data.Id);
        _self.name(data.Name);
    }
}