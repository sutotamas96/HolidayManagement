using HolidayManagement.Repository.Interfaces;
using HolidayManagement.Repository.Models;
using System.Collections.Generic;
using System.Linq;

namespace HolidayManagement.Repository
{
    public class VacationStateRepository : BaseRepository<VacationState>, IVacationStateRepository
    {
        public VacationState GetVacationStateById(int vacationStateId)
        {
            return DbContext.VacationStates.FirstOrDefault(x => x.ID == vacationStateId);
        }

        public List<VacationState> GetVacationStates()
        {
           var vacStates = DbContext.VacationStates.ToList();

            foreach (var vacState in vacStates)
            {
                if (vacState.Vacations != null)
                    foreach (var vac in vacState.Vacations)
                        vac.State = null;
            }

            return vacStates;
        }
    }
}
