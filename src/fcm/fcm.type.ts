interface AlarmType {
  alarmTime : string,
  medicineCount : number,
  prescriptionIds : number[],
}

interface AlarmResponseType {
  totalMedicineCount : number,
  allMedicineIds : number[],
  alarm : AlarmType[]
}

export { AlarmResponseType, AlarmType};