function DashboardModel() {
    var _self = this;

    this.test = ko.observable();
    this.userArray = ko.observableArray();
    this.teamArray = ko.observableArray();
    this.manageUser = new UserModel();
    this.errorMessage = ko.observable();
    this.selectedTeamID = ko.observable();
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


    this.createUser = function () {       
        $.ajax({ 
            type: "POST",
            url: "/Account/CreateUser",         
            data: {
                FirstName: _self.manageUser.FirstName(),
                LastName: _self.manageUser.LastName(),
                AspNetUser: {
                    Email: _self.manageUser.Email
                },
                HireDate: _self.manageUser.HireDate(),
                MaxDays: _self.manageUser.MaxDays(),
                TeamId: _self.selectedTeamID()
            },
            success: function (data) {
                if (data.successed) {
                    $("#myModal").modal("hide");
                    location.reload();
                }
                else {
                    _self.errorMessage ( data.messages) ;
                    document.getElementById('error').innerHTML = _self.errorMessage();
                    document.getElementById('error').style.visibility = 'visible';
                }
            }
        });

    };
}

function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();
    DashboardModel.instance.initialize(data);
    ko.applyBindings(DashboardModel.instance);

}
