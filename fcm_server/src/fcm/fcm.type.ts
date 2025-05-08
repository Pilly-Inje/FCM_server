interface BaseResponse<T> {
  success : boolean;
  statusCode : number;
  message : string;
  data : T | null;
}

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

interface SaveTokenENTITY {
  id : number;
  user_id : number;
  token : string;
  platform : 'ios' | 'android';
  isActive : boolean;
  createdAt : Date;
  updatedAt : Date;
}

type SaveTokenResponseDTO = BaseResponse<SaveTokenENTITY>;
type getAllTokensResponseDTO = BaseResponse<string[]>;

export { AlarmResponseType, AlarmType, SaveTokenResponseDTO, getAllTokensResponseDTO, SaveTokenENTITY};