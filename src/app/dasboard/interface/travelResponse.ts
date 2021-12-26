

export interface TravelResponse {
    id:                  number;
    creationDate:        Date;
    lastStatusTravel:    number;
    travelEquipmentDTOs: TravelEquipmentDTO[];
}

export interface TravelEquipmentDTO {
    id:            number;
    operationDate: Date;
    observation:   null;
    cadete:        Cadete;
    operator:      Operator;
    equipment:     Equipment;
    statusTravel:  number;
}
interface Cadete{
    id:        number;
    email:     string;
    fullName:  string;
    address:   string;
    cellPhone: string;
}
export interface Equipment {
    id:       number;
    mark:     string;
    model:    string;
    failure:  string;
    clientId: number;
    cliente:  Operator;
}

export interface Operator {
    id:        number;
    email:     string;
    fullName:  string;
    address:   string;
    cellPhone: string;
}
