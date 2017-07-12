function DashboardModel() {
    var _self = this;

    this.test = ko.observable();
    this.userArray = ko.observableArray();
    this.teamArray = ko.observableArray();
    this.initialize = function (data) {
        _self.test(data.Test);
        userArray2 = _.map(data.userL, function (user, index) {
            return new UserModel(user);
        }
        );

        teamArray2 = _.map(data.teamL, function (team, index) {
            return new TeamModel(team);
        })
        _self.userArray(userArray2);
        _self.teamArray(teamArray2);
    };
}

function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();
    DashboardModel.instance.initialize(data);
    ko.applyBindings(DashboardModel.instance);

}