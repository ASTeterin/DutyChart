﻿using System;
using System.Collections.Generic;
using System.Linq;
using dutyChart.Dto;
using Microsoft.Extensions.Configuration;


namespace dutyChart.Models
{
    public interface IDataProcessor
    {
        List<SlotDto> DistributeSlots(DateTime date);
    }

    public class DataProcessor
    {
        readonly ApplicationContext _db;

        public IConfiguration Configuration { get; }

        public DataProcessor(ApplicationContext db, IConfiguration configuration)
        {
            _db = db;
            Configuration = configuration;
        }

        private bool СanDuty(Worker worker, DateTime date)
        {
            List<AbsentPeriod> absentPeriods = _db.AbsentPeriods.Where(p => p.WorkerId == worker.Id).ToList();
            bool canDuty = true;
            foreach (var period in absentPeriods)
            {
                if ((date >= period.Start) && (date <= period.End))
                {
                    canDuty = false;
                    break;
                }
            }
            return canDuty;
        }

        private WorkerInDay GetWorkerInDay(int workerId, DateTime date)
        {
            return _db.WorkerInDays.FirstOrDefault(x => ((x.Date == date) && (x.WorkerId == workerId)));
        }

        private int GetDutyWorkerGroupId(List<Worker> workers, DateTime date)
        {
            var id = -1;
            foreach (Worker w in workers)
            {
                WorkerInDay workerInDay = GetWorkerInDay(w.Id, date);
                if ((workerInDay != null) && (workerInDay.IsDuty)) 
                {
                    id = w.IdGroup;
                    break;
                }
            }
            return id;
        }

        private bool IsWorkerWithDesirableHours(Worker worker, DateTime date)
        {
            return (_db.SpecialHoursInDay.FirstOrDefault(s => s.WorkerId == worker.Id && s.Date == date && s.Type == true) == null) ? false : true;
        }

        private List<List<Worker>> GetGroups(List<Worker> workers, DateTime date)
        {
            List<List<Worker>> workersInGroupByPriority = new List<List<Worker>> { };
            WorkerInDay workerInDay = new WorkerInDay();
            var idDutyWorkerGroup = GetDutyWorkerGroupId(workers, date);
            List<Worker> dutyGroup = new List<Worker> { };
            List<Worker> dutyOnLettersGroup = new List<Worker> { };
            List<Worker> dutyOnPlanningGroup = new List<Worker> { };
            List<Worker> groupWithSpecialHours = new List<Worker> { };
            List<Group> groups = _db.Groups.OrderBy(g => g.Priority).ToList();

            foreach (Group g in groups)
            {
                workersInGroupByPriority.Add(new List<Worker>());
            }
            foreach (Worker w in workers)
            {
                workerInDay = GetWorkerInDay(w.Id, date);
                if ((workerInDay == null) || (!СanDuty(w, date)))
                    continue;
                if (workerInDay.IsDutyOnLetters)
                {
                    dutyOnLettersGroup.Add(w);
                    continue;
                }
                
                if (workerInDay.IsDuty)
                {
                    dutyGroup.Add(w);
                    idDutyWorkerGroup = w.IdGroup;
                    continue;
                }

                if (workerInDay.IsDutyOnWedn)
                {
                    dutyOnPlanningGroup.Add(w);
                    continue;
                }

                if (IsWorkerWithDesirableHours(w, date))
                {
                    groupWithSpecialHours.Add(w);
                    continue;
                }

                if (w.IdGroup == idDutyWorkerGroup)
                {
                    continue;
                }
                var groupIndex = groups.FindIndex(g => g.Id == w.IdGroup);
                workersInGroupByPriority[groupIndex].Add(w);
                
            }           
            workersInGroupByPriority.Insert(0, groupWithSpecialHours);
            workersInGroupByPriority.Insert(0, dutyOnPlanningGroup);
            workersInGroupByPriority.Insert(0, dutyGroup);
            return workersInGroupByPriority;
        }

        private List<int> GetArrayOfZeroesAndOnes(int countHours, List<int> numbersOfHours)
        {
            List<int> listOfZerosAndOnes = new List<int>();
            for (var i = 0; i < countHours; i++)
            {
                listOfZerosAndOnes.Add(0);
            }
            foreach (var index in numbersOfHours)
            {
                listOfZerosAndOnes[index] = 1;
            }
            return listOfZerosAndOnes;
        }

        public Boolean IsTwoHoursConsistently(List<int> listOfZerosAndOnes)
        {
            var count = 1;
            for (int i = 1; i < listOfZerosAndOnes.Count; i++)
            {
                if ((listOfZerosAndOnes[i] == 1) && (listOfZerosAndOnes[i - 1] == 1))
                {
                    count++;
                    if (count > 2)
                        return true;
                }
                else
                {
                    count = 1;
                }
            }
            return false;
        }

        private int GetSumm(List<int> list)
        {
            int summ = 0;
            foreach (int item in list)
            {
                summ += item;
            }
            return summ;
        }
        private void GenerateSlotsForDutyWorker(ref List<int> listNumbers, ref int countSlotsForWorker)
        {
            listNumbers.Add(0);
            listNumbers.Add(10);
            listNumbers.Add(11);
            countSlotsForWorker -= 3;
        }

        private void ReduceCountFreeSlotsInHour(ref int countFreeSlots, ref List<int> hoursInDay, int index)
        {
            countFreeSlots--;
            int temp = hoursInDay[index];
            hoursInDay.RemoveAt(index);
            temp--;
            hoursInDay.Insert(index, temp);
        }

        private List<int> GetSlotNumbersForWorker(ref List<int> hoursInDay, /*ref int countSlotsForWorker,*/ Worker worker, DateTime date)
        {
            int maxCountAttempts = Convert.ToInt32(Configuration["MaxCountAttempts"]);

            bool isDesirableSlot = true;
            int number, countFreeSlots;
            int countHoursInDay = hoursInDay.Count;
            countFreeSlots = GetSumm(hoursInDay);
            Random rand = new Random();
            int countAttemps = 0;
            List<int> listNumbers = new List<int>();
            WorkerInDay workerInDay = GetWorkerInDay(worker.Id, date);
            if (workerInDay == null)
                return listNumbers;
            List<Group> groups = _db.Groups.ToList();
            List<int> desirableSlots = new List<int>();
            List<int> unwantedSlots = new List<int>();
            desirableSlots = _db.SpecialHoursInDay.Where(slot => slot.WorkerId == worker.Id && slot.Date == date && slot.Type == isDesirableSlot).Select(h => h.HourNumber).ToList();
            unwantedSlots = _db.SpecialHoursInDay.Where(slot => slot.WorkerId == worker.Id && slot.Date == date && slot.Type == !isDesirableSlot).Select(h => h.HourNumber).ToList();
            var countSlotsForWorker = _db.Groups.FirstOrDefault(g => g.Id == worker.IdGroup).NumberDutyHours;
            if (workerInDay.IsDuty)
            {
                countSlotsForWorker = 6;
                GenerateSlotsForDutyWorker(ref listNumbers, ref countSlotsForWorker);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 0);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 10);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 11);
            }
            if (workerInDay.IsDutyOnWedn)
            {
                listNumbers.Add(1);
                ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, 1);
                countSlotsForWorker -= 1;//_db.Groups.FirstOrDefault(g => g.Id == worker.IdGroup).NumberDutyHours - 1;
            }
            for (int i = 0; i < countSlotsForWorker; i++)
            {
                countAttemps = 0;
                if (desirableSlots.Count == 0)
                {
                    number = rand.Next(0, countHoursInDay);
                }
                else 
                {
                    number = desirableSlots[0];
                    desirableSlots.RemoveAt(0);
                    if ((hoursInDay[number] > 0))
                    {
                        listNumbers.Add(number);
                        ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, number);
                    }                        
                    continue;
                }

                while (listNumbers.Contains(number) || (hoursInDay[number] <= 0) || unwantedSlots.Contains(number))
                {
                    countAttemps++;
                    number = rand.Next(0, countHoursInDay - 1);
                    if (countAttemps == maxCountAttempts)
                        break;
                }
                

                if ((countFreeSlots == 0) || (countAttemps == maxCountAttempts))
                    break;

                listNumbers.Add(number);
                //проверка на подряд идущие часы
                List<int> arrOfZeroesAndOnes = GetArrayOfZeroesAndOnes(countHoursInDay, listNumbers);
                if (IsTwoHoursConsistently(arrOfZeroesAndOnes))
                {
                    countAttemps++;
                    listNumbers.Remove(number);
                    i--;
                    if (countAttemps == maxCountAttempts)
                        break;
                }
                else
                {
                    ReduceCountFreeSlotsInHour(ref countFreeSlots, ref hoursInDay, number);
                }
            }
            return listNumbers;
        }

        private List<int> GetListOfNumbersSlot(int count)
        {
            List<int> ListOfNumbers = new List<int> { };
            for (int i = 0; i < count; i++)
            {
                ListOfNumbers.Add(i);
            }
            return ListOfNumbers;
        }

        private void GetPermutationForSlotsInHour(List<Hour> hours)
        {
            foreach (var hour in hours)
            {
                var slotsInHour = _db.Slots.Where(s => s.HourId == hour.Id).ToList();
                List<int> listOfNumbers = GetListOfNumbersSlot(slotsInHour.Count);
                List<int> randomPermutation = GetRandomPermutation(listOfNumbers);
                var i = 0;
                foreach (var s in slotsInHour)
                {
                    s.Index = randomPermutation[i++];
                }
                _db.Slots.UpdateRange(slotsInHour);
                _db.SaveChanges();
            }
            
        }

        public List<SlotDto> GetSlotsDto(List<Hour> hours)
        {
            List<SlotDto> slotsDto = new List<SlotDto> { };
            foreach (var hour in hours)
            {
                var slotsInHour = _db.Slots.Where(s => s.HourId == hour.Id).OrderBy(s => s.Index).ToList();
                foreach (var s in slotsInHour)
                {
                    slotsDto.Add(new SlotDto
                    {
                        HourId = s.HourId,
                        Id = s.Id,
                        Index = s.Index,
                        WorkerId = s.WorkerId
                    });
                }
            }
            return slotsDto;
        }
        private void ResetSlots(List<Hour> hours)
        {
            foreach (var h in hours)
            {
                List<Slot> slotsForRemove = new List<Slot> { };
                var slots = _db.Slots.Where(s => s.HourId == h.Id).ToList();
                int countSlots = 0;
                foreach (var slot in slots)
                {
                    countSlots++;
                    if (h.MinCount < countSlots)
                    {
                        slotsForRemove.Add(slot);
                        continue;
                    }
                    slot.WorkerId = null;
                }
                if (h.MinCount < countSlots)
                {
                    slots.RemoveRange(h.MinCount, slotsForRemove.Count());
                    _db.Slots.RemoveRange(slotsForRemove);
                }

                while (countSlots < h.MinCount)
                {
                    slots.Add(GetNewSlot(countSlots++, h.Id));
                }
                _db.Slots.UpdateRange(slots);
            }
            _db.SaveChanges();
        }

        private Slot GetNewSlot(int slotIndex, int hourId)
        {
            Slot slot = new Slot();
            slot.Index = slotIndex++;
            slot.HourId = hourId;
            return slot;
        }
        private void CreateSlots(List<Hour> hours)
        {

            foreach (var h in hours)
            {
                var slotIndex = 0;
                List<Slot> slotsInHour = new List<Slot> { };
                for (var i = 0; i < h.MinCount; i++)
                {
                    slotsInHour.Add(GetNewSlot(slotIndex++, h.Id));
                }
                _db.Slots.AddRange(slotsInHour);
            }
            _db.SaveChanges();
        }

        private static List<T> GetRandomPermutation<T>(List<T> data)
        {
            List<T> result = new List<T> { };
            Random rand = new Random();
            int i = 0;
            while (data.Count > 0)
            {
                int position = rand.Next(0, data.Count);
                result.Insert(i++, data[position]);
                data.RemoveAt(position);
            }
            return result;
        }

        private Worker GetDutyWorker(List<Worker> workers)
        {
            return workers.FirstOrDefault(w => w.IsDuty == true);
        }

        private void FillSlots(Worker worker, List<int> slotNumbers, List<Hour> hours)
        {
            List<int> hourIds = hours.Select(h => h.Id).ToList();
            Dictionary<int, List<Slot>> slotsInCurrentHourById = _db.Slots
                .Where(s => hourIds.Contains(s.HourId))
                .GroupBy(s => s.HourId)
                .ToDictionary(g => g.Key, g => g.ToList());
            foreach (var slotNumber in slotNumbers)
            {
                List<Slot> slotsInCurrentHour = slotsInCurrentHourById[hours[slotNumber].Id];
                foreach (var slotInCurrentHour in slotsInCurrentHour)
                {
                    if (slotInCurrentHour.WorkerId == null)
                    {
                        slotInCurrentHour.WorkerId = worker.Id;
                        _db.Slots.Update(slotInCurrentHour);
                        break;
                    }
                }
            }
            _db.SaveChanges();
        }

        private void FillSlotsForGroup(List<Worker> workers,
            int countSlotsForWorker,
            ref List<Hour> hours,
            ref List<int> countFreeSlots,
            ref List<Worker> notBusyWorkers,
            DateTime date)
        {
            foreach (var w in workers)
            {
                if (GetSumm(countFreeSlots) != 0)
                {
                    List<int> slotsNumber = GetSlotNumbersForWorker(ref countFreeSlots, /*ref countSlotsForWorker,*/ w , date);
                    FillSlots(w, slotsNumber, hours);
                }
                else
                {
                    notBusyWorkers.Add(w);
                }
            }
        }

        private void GetData(DateTime date, ref List<Hour> hours, ref List<Worker> workers, ref List<int> countFreeSlots)
        {
            hours = _db.Hours.Where(h => h.Date == date).ToList();
            workers = _db.Workers.ToList();
            foreach (var h in hours)
            {
                countFreeSlots.Add(h.MinCount);
            }

        }

        private void ChekingExistenceOfSlots(List<Hour> hours)
        {
            var slotsInHour = _db.Slots.Where(s => s.HourId == hours[0].Id).ToList();
            if (slotsInHour.Count == 0)
            {
                CreateSlots(hours);
            }
            else
            {
                ResetSlots(hours);
            }
        }

        private Boolean IsPlanningDay(DateTime date)
        {
            return (date.DayOfWeek == DayOfWeek.Wednesday) ? true : false;
        }

        private Dictionary<int, int> getWorkersWithNumbersOfFirsSlot(DateTime date)
        {
            Dictionary<int, int> numbersWorkersInFirstSlot = new Dictionary<int, int>();
            var workersIdInFirstSlots = new List<int>();
            var hours = _db.Hours.Where(h => h.Date == date).ToList();
            foreach (var hour in hours)
            {
                var workerId1 = _db.Slots.FirstOrDefault(s => s.HourId == hour.Id && s.Index == 0).WorkerId.GetValueOrDefault();
                var workerId = hour.Slots.FirstOrDefault(h => h.Index == 0).WorkerId.GetValueOrDefault();
                if (numbersWorkersInFirstSlot.ContainsKey(workerId))
                    numbersWorkersInFirstSlot[workerId]++;
                else
                    numbersWorkersInFirstSlot.Add(workerId, 1);
            }
            return numbersWorkersInFirstSlot;
        }

        private List<int> getWorkersIdWithMoreSlotsInFirshHour(DateTime date)
        {
            var numbersWorkersInFirstSlot = getWorkersWithNumbersOfFirsSlot(date);
            int ALLOWED_NUMBER_SLOTS = 2;
            var workersIdWithMoreSlotsInFirshHour = new List<int>();
            foreach (var keyValue in numbersWorkersInFirstSlot)
            {
                if (keyValue.Value > ALLOWED_NUMBER_SLOTS) 
                    workersIdWithMoreSlotsInFirshHour.Add(keyValue.Key); 
            }
            return workersIdWithMoreSlotsInFirshHour;
        }

        private void GetSlotsPermutation(ref List<Slot> sourceSlots)
        {
            var slotIndexes = new List<int> { };
            foreach(var slot in sourceSlots)
            {
                slotIndexes.Add((slot.Index + 1) % sourceSlots.Count());
            }
            var j = 0;
            foreach (var slot in sourceSlots)
            {
                slot.Index = slotIndexes[j++];
            }
        }

        private void ChangeSlotInHour(List<int> workersIdWithMoreSlotsInFirshHour, DateTime date)
        {
            foreach (var workerId in workersIdWithMoreSlotsInFirshHour)
            {
                var hourIds = _db.Hours.Where(h => h.Date == date).Select(h => h.Id).ToList();
                var firstHourIdForUserWithMoreSlots = _db.Slots.FirstOrDefault(s => s.WorkerId == workerId && hourIds.Contains(s.HourId) && s.Index == 0).HourId;
                var slotsInfirstHourIdForUserWithMoreSlots = _db.Slots.Where(s => s.HourId == firstHourIdForUserWithMoreSlots).ToList();
                GetSlotsPermutation(ref slotsInfirstHourIdForUserWithMoreSlots);
                _db.Slots.UpdateRange(slotsInfirstHourIdForUserWithMoreSlots);
                _db.SaveChanges();
            }
        }

        public List<SlotDto> DistributeSlots(DateTime date)
        {
            var MAX_NUMBER_SLOTS = 6;
            var NUMBER_SLOTS_FOR_DUTY_ON_LETTERS = 5;
            var slots = new List<SlotDto>();
            var hours = new List<Hour>();
            var workers = new List<Worker>();
            var countFreeSlots = new List<int>();
            var dateUTC = date.ToUniversalTime();

            GetData(date, ref hours, ref workers, ref countFreeSlots);
            ChekingExistenceOfSlots(hours);

            List<List<Worker>> workersInGroupByPriority = new List<List<Worker>> { };
            List<Worker> notBusyWorkers = new List<Worker>();
            List<Group> groups = _db.Groups.OrderBy(g => g.Priority).ToList();

            groups.Insert(0, new Group());
            var dutyOnLettersGroup = new Group();
            dutyOnLettersGroup.NumberDutyHours = NUMBER_SLOTS_FOR_DUTY_ON_LETTERS;
            groups.Insert(0, dutyOnLettersGroup);

            var dutyGroup = new Group();
            dutyGroup.NumberDutyHours = MAX_NUMBER_SLOTS;
            groups.Insert(0, dutyGroup);
            workersInGroupByPriority = GetGroups(workers, date);
            var i = 0;
            foreach (List<Worker> group in workersInGroupByPriority)
            {
                FillSlotsForGroup(group, groups[i++].NumberDutyHours, ref hours, ref countFreeSlots, ref notBusyWorkers, date);
            }
            var workersWorkersIdWithMoreSlotsInFirshHour = getWorkersIdWithMoreSlotsInFirshHour(date);
            while (workersWorkersIdWithMoreSlotsInFirshHour.Count > 0)
            {
                ChangeSlotInHour(workersWorkersIdWithMoreSlotsInFirshHour, date);
                workersWorkersIdWithMoreSlotsInFirshHour = getWorkersIdWithMoreSlotsInFirshHour(date);
            }
                
            slots = GetSlotsDto(hours);
            return slots;
        }
    }
}
