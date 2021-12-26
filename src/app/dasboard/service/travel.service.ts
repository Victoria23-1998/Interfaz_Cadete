import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TravelResponse } from '../interface/travelResponse';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private http:HttpClient) { }
  
  getTravels(statusTravel:number):Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>(`/api/Travel/1/${statusTravel}`)
  }

 //Trae viajes disponibles
  getTravel1():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/1")
  }
  getTravel2():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/5")
  }
 
  
  //viajes pedidos por el cadete
  TravelAccepted(idCadet:string,travelId:string,idUser:string,Reasigned:Boolean,status:string,body:TravelResponse[]):Observable<TravelResponse>{
    return this.http.post<TravelResponse>(`/api/Travel?travelId=${travelId}&statusTravel=${status}&userOperation=${idUser}&cadeteId=${idCadet}&isReasigned=${Reasigned}`,body)
                  
  }

 //para viajes renunciados
 Travelwaived(travelId:string,idUser:string,status:string,body:TravelResponse[]):Observable<TravelResponse>{
  return this.http.post<TravelResponse>(`/api/Travel?travelId=${travelId}&statusTravel=${status}&userOperation=${idUser}&cadeteId=0&isReasigned=true`,body)
 }
  handlerError(error:HttpErrorResponse){
   return throwError(error.status || "Server error")
  }
 
 // get de los viajes aceptados y poder filtrar por el cadete

 getTravelAccepted1():Observable<TravelResponse[]>{
  return this.http.get<TravelResponse[]>("/api/Travel/2/6")
}
getTravelAccepted2():Observable<TravelResponse[]>{
  return this.http.get<TravelResponse[]>("/api/Travel/2/2")
}
 
//get Viajes en curso
  viajesCurso1():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/3")
  }
  viajesCurso2():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/7")
  }

  //traer los viajes finalizados para el historial
  viajeSinConfir():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/8")
  }
  viajeFinalizados2():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/4")
  }
  //trae los viajes con entrega confirmada
  viajesConfirmados():Observable<TravelResponse[]>{
    return this.http.get<TravelResponse[]>("/api/Travel/1/9")
  }
}
