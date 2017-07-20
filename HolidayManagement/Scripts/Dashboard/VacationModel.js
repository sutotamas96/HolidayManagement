function VacationModel(data) {
    var _self = this;
    this.ID = null;
    this.stateID = null;
    this.userID = null;
    this.startDate = null;
    this.endDate = null;


    if (data != null) {
        _self.ID = data.ID;
        _self.stateID = data.StateId;
        _self.userID = data.UserId;
        _self.startDate = data.StartDate;
        _self.endDate = data.EndDate;
    }


}