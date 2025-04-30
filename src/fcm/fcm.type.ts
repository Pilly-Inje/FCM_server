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

interface SaveTokenDTO {
  id : number;
  userid : number;
  token : string;
  platform : 'ios' | 'android';
  isActive : boolean;
  createdAt : Date;
  updatedAt : Date;
}

interface SaveTokenResponseDTO {
  success: boolean,
  statusCode: number,
  message: string,
  data: SaveTokenDTO | null
}

interface getAllTokensResponseDTO {
  success: boolean,
  statusCode: number,
  message: string,
  data: string[] | null
}

export { AlarmResponseType, AlarmType, SaveTokenDTO, SaveTokenResponseDTO, getAllTokensResponseDTO};