function DashboardModel() {
    var _self = this;
    this.succes = ko.observable();  ////create and edituser functions status is stored in this observable
    this.userArray = ko.observableArray(); //users observable array
    this.teamArray = ko.observableArray(); //teams observable array
    this.roleArray = ko.observableArray(); //roles list
    this.manageUser = new UserModel(); // modal "test" usermodel object
    this.errorMessage = ko.observable(); //create and edituser functions error messages are stored in this observable
    this.calendar = ko.observable(); //calendar dashboard
    this.manageUserRoleID = ko.observable(); // manageUser's role
    this.currentMonth = ko.observable(); // store current month
    this.currentYear = ko.observable(); // store current year
    this.currentUser = ko.observable(); // our user id 
    this.searchUser = ko.observable(null); // search user calendar

    this.searchydi = function (data) { // search after our user calendar
        _self.currentUser(_self.searchUser());
        _self.searchUser(null);
        if (_self.currentMonth() == 12) {
            _self.currentMonth(1);
            _self.currentYear(_self.currentYear() + 1);
        }
        else {
            _self.currentMonth(_self.currentMonth() + 1);
        }
        _self.previousm();
        

    }
    this.names = new Array();
    _self.names[1] = "January";
    _self.names[2] = "February";
    _self.names[3] = "March";
    _self.names[4] = "April";
    _self.names[5] = "May";
    _self.names[6] = "June";
    _self.names[7] = "July";
    _self.names[8] = "August";
    _self.names[9] = "September";
    _self.names[10] = "October";
    _self.names[11] = "November";
    _self.names[12] = "December";


    //return current month name
    this.returnM = function (data){
        return _self.names[data];
    }

    //initialize method
    this.initialize = function (data) {
        _self.currentUser(data.userID); // our user id -  string
        userArray2 = _.map(data.userL, function (user, index) {
            var temp = new UserModel(user);
            temp.HireDate(dateTimeReviver(temp.HireDate()));
            return temp;
            
        }
        ); // mapping users 

        teamArray2 = _.map(data.teamL, function (team, index) {
            return new TeamModel(team);
        }); //mapping teams

        roleArray2 = _.map(data.roleL, function (role, index) {
            return new RoleModel(role);
        });
        _self.userArray(userArray2); 
        _self.teamArray(teamArray2);
        _self.roleArray(roleArray2);
        _self.calendar(new CalendarModel(data.calendar));
        var today = new Date();
        _self.currentMonth(today.getMonth() + 1);
        _self.currentYear(today.getFullYear());
    };

    this.clear = function () {
        _self.manageUser.TeamId(1);
        _self.manageUser.Email(null);
        _self.manageUser.FirstName(null);
        _self.manageUser.LastName(null);
        _self.manageUser.HireDate(null);
        _self.manageUser.MaxDays(null);
        _self.manageUserRoleID("8f039df0-5c0b-4c2f-9283-969bef8d3e1a"); //back to the first option
        _self.errorMessage(null);
    }

    this.createUser = function () {        
        //sends a post request to /Account/CreateUser passing the user’s properties and expects a JSON response.
        $.ajax({
            type: "POST",
            url: "/Account/CreateUser",
            data: {
                FirstName: _self.manageUser.FirstName(),
                LastName: _self.manageUser.LastName(),
                AspNetUser: {
                    Email: _self.manageUser.Email()
                },
                HireDate: _self.manageUser.HireDate(),
                MaxDays: _self.manageUser.MaxDays(),
                TeamId: _self.manageUser.TeamId(),
                ManageUserRoleID: _self.manageUserRoleID(), //manageUser role 
            },
            datatype: "json",
            success: function (data) {
                if (data.successed) {
                    $("#myModal").modal("hide");//close the modal
                    
                    var temp = new UserModel(data.newUser);
                    temp.HireDate (dateTimeReviver(temp.HireDate()));
                    //in case of true insert the new user to the users array
                    _self.userArray.push(temp);
                    _self.manageUser.TeamId(1);
                    _self.manageUser.Email(null);
                    _self.manageUser.FirstName(null);
                    _self.manageUser.LastName(null);
                    _self.manageUser.HireDate(null);
                    _self.manageUser.MaxDays(null);
                    _self.manageUserRoleID("8f039df0-5c0b-4c2f-9283-969bef8d3e1a");
                    _self.errorMessage(null);
                    _self.succes(false);
                }
                else {
                    _self.succes(!data.successed);
                    _self.errorMessage(data.messages);
                }
            },
            error: function (data) {
                alert("Please fill out all of the inputs!");
                

            }
        });
    }
           
        

  

    this.OpenEditUser = function (user,manageUserRoleID) {
        $('#fejlec').text('Edit user');
        $("#createb").hide();
        $("#edit").show();
        _self.manageUser.id(user.id());
        _self.manageUser.LastName(user.LastName());
        _self.manageUser.FirstName(user.FirstName());
        _self.manageUser.Email(user.Email());
        _self.manageUser.HireDate(user.HireDate());
        _self.manageUser.MaxDays(user.MaxDays());
        if (user.TeamId() != null) {
            _self.manageUser.TeamId(user.TeamId());
        }
        else {
            _self.manageUser.TeamId(new TeamModel());
        }
    }

    this.editUser = function () {

        //will send the post request to the server
        _self.errorMessage("");
        $.ajax({
            type: "POST",
            url: "/Account/EditUser",
            data: {
                ID: _self.manageUser.id,
                FirstName: _self.manageUser.FirstName(),
                LastName: _self.manageUser.LastName(),
                AspNetUser: {
                    Email: _self.manageUser.Email
                },
                HireDate: _self.manageUser.HireDate(),
                MaxDays: _self.manageUser.MaxDays(),
                TeamId: _self.manageUser.TeamId(),
                ManageUserRoleID: _self.manageUserRoleID(),
            },
            //Handle the server’s response
            success: function (data)
            {
                if (data.successed) {
                    $("#myModal").modal("hide");
                    //In case of success update the users list with the changed user details
                    var usera = _.map(data.userLst, function (user, index) {
                        var temp = new UserModel(user);
                        temp.HireDate(dateTimeReviver(temp.HireDate()));
                        return temp;
                    }
                   );
                    _self.userArray(usera);                    
                    _self.manageUser.TeamId(1);
                    _self.manageUser.Email(null);
                    _self.manageUser.FirstName(null);
                    _self.manageUser.LastName(null);
                    _self.manageUser.HireDate(null);
                    _self.manageUser.MaxDays(null);
                    _self.errorMessage(null);
                    _self.manageUserRoleID("8f039df0-5c0b-4c2f-9283-969bef8d3e1a");
                }
                else {
                    _self.succes(!data.successed);
                    _self.errorMessage(data.messages);
                }
               
            },
            error: function (data) {
                alert("Please fill out all of the inputs!");


            }
            })
    }

    
    // jump to next month
    this.nextm = function () {
        if (_self.currentMonth() == 12) {
            _self.currentMonth(1);
            _self.currentYear(_self.currentYear() + 1);
        }
        else {
            _self.currentMonth(_self.currentMonth() + 1);
        }
        $.ajax({
            type: "POST",
            url: "/Dashboard/generateCalendarJ",
            data: {
                year: _self.currentYear(),
                month: _self.currentMonth(),
                userID: _self.currentUser()
            },
            dataType: 'json',
            success: function (data) {
                _self.calendar(new CalendarModel(data.Calendar));
            }
        });
    }


    //jump to previous month
    this.previousm = function () {
        if (_self.currentMonth() == 1) {
            _self.currentMonth(12);
            _self.currentYear(_self.currentYear() - 1);
        }
        else {
            _self.currentMonth(_self.currentMonth() - 1);
        }
        $.ajax({
            type: "POST",        
            url: "/Dashboard/generateCalendarJ",
            data: {
                year: _self.currentYear(),
                month: _self.currentMonth(),
                userID: _self.currentUser()
            },
            success: function (data) {
                _self.calendar(new CalendarModel(data.Calendar));
            }

        });
    }

    var setDateWithZero = function (date) {
        if (date < 10)
            date = "0" + date;

        return date;
    };

    var dateTimeReviver = function (value) {
        var match;

        if (typeof value === 'string') {
            match = /\/Date\((\d*)\)\//.exec(value);
            if (match) {
                var date = new Date(+match[1]);
                return date.getFullYear() + "-" + setDateWithZero(date.getMonth() + 1) + "-" + setDateWithZero(date.getDate()); //+
                       //"T" + setDateWithZero(date.getHours()) + ":" + setDateWithZero(date.getMinutes()) + ":" + setDateWithZero(date.getSeconds()) + "." + date.getMilliseconds();
            }
        }
        return value;
    };


}
//pass information from server’s DashboardViewModel to DashboardModel and apply ko bindings
function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();
    DashboardModel.instance.initialize(data);
    ko.applyBindings(DashboardModel.instance);

}

function hidee() {
    $('#fejlec').text('Create new user');
    $("#edit").hide();
    $("#createb").show();
    
}
