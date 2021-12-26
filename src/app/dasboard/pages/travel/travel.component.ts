import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../service/travel.service';
import { TravelResponse } from '../../interface/travelResponse';
import { User } from '../../interface/local';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
  
  constructor(private travelService:TravelService) { }

  mensaje:string=''
  viajesDisponibles:TravelResponse[]=[]
  idCadete:number=0
  local:User={} as User
  loader:boolean=true
  acceptedTravel:TravelResponse[]=[]
  opcionSeleccionada: string  = '1';
  seleccion: string        = '';
  viajesEmpezados:TravelResponse[]=[]
  ViajeLocalS:TravelResponse[]=[]

  ngOnInit(): void {
    this.getTravels1()
    this.getTravels2()
   
   //traer el id del cadete
    this.local = JSON.parse(localStorage.getItem('Usuario')|| '')
    this.idCadete= this.local.id

  }
 //traer viajes disponibles estado 1
  getTravels1(){
    this.travelService.getTravel1().subscribe(data => {

      data.forEach(element => {
        this.viajesDisponibles.push(element)
      })

    }, (error) => {
      console.log(error.error)
    });
  }
 //traer viajes disponibles estado 2
  getTravels2(){
    this.travelService.getTravel2().subscribe(data => {

      data.forEach(element => {
        this.viajesDisponibles.push(element)
      });
      this.loader = false

    }, (error) => {
      console.log(error.error)
    });
  }
 
 
 // Código del select

  capturar() {
  
   this.seleccion = this.opcionSeleccionada;
   if (this.seleccion == '2') {

     this.loader = true
     this.viajesDisponibles = []
     this.TravelAccepted1()
     this.TravelAccepted2()

   } else if (this.seleccion === '1') {
     this.loader = true
     this.acceptedTravel = []

     this.getTravels1()
     this.getTravels2()
   } else if (this.seleccion === '3') {
     this.loader = true
     this.viajeEnCurso1()
     this.viajeEnCurso2()
    console.log(this.viajesEmpezados)
   }

}

//Traer los viajes en curso estado 3
 viajeEnCurso1(){

     this.travelService.viajesCurso1().subscribe(data => {

     let response = data.filter(el => el.travelEquipmentDTOs[el.travelEquipmentDTOs.length - 1].cadete.id == this.idCadete)
     
     response.forEach(travel => {

       let index = this.viajesEmpezados.findIndex(elm => elm.id == travel.id);
       if (index === -1) {
         this.viajesEmpezados.push(travel)
       }
     })

   }, (error) => {
     console.log(error.error)
   })
 }
//Traer los viajes en curso estado 7
 viajeEnCurso2(){
   this.travelService.viajesCurso2().subscribe(data => {

     let response = data.filter(el => el.travelEquipmentDTOs[el.travelEquipmentDTOs.length - 1].cadete.id == this.idCadete)
     response.forEach(travel => {
       let index = this.viajesEmpezados.findIndex(elm => elm.id == travel.id);
       if (index === -1) {
         this.viajesEmpezados.push(travel)
       }
     })
     this.loader = false
   }, (error) => {
     console.log(error.error)
   })
}

  // traer viajes aceptados por el cadete estado 2
 
  TravelAccepted1(){
      this.travelService.getTravelAccepted1().subscribe(data => {
      let response = data.filter(el => el.travelEquipmentDTOs[el.travelEquipmentDTOs.length - 1].cadete.id == this.idCadete)

      response.forEach(el => {
        let index = this.acceptedTravel.findIndex(elm => elm.id == el.id);
        if (index === -1) {
          this.acceptedTravel.push(el)
        }

      })

    }, (error) => {
      console.log(error.error)
    });
  }

  

   // traer viajes aceptados por el cadete estado 6
  TravelAccepted2(){
    this.travelService.getTravelAccepted2().subscribe(data => {

      let response = data.filter(el => el.travelEquipmentDTOs[el.travelEquipmentDTOs.length - 1].cadete.id == this.idCadete)
      response.forEach(el => {
        let index = this.acceptedTravel.findIndex(elm => elm.id == el.id);
        if (index === -1) {
          this.acceptedTravel.push(el)
        }

      })

      this.loader = false
      //ordenar array por fecha
      this.ordenarArray(this.acceptedTravel)
    
   
    }, (error) => {
      console.log(error.error)
    });

   }
 

  //ordenar array por fecha

  ordenarArray(array:TravelResponse[]){

    let tmp: TravelResponse;
    for (let i: number = 0; i < array.length; i++) {
      for (let x: number = i + 1; x < array.length; x++) {
        let fecha1 = new Date(array[i].travelEquipmentDTOs[array[i].travelEquipmentDTOs.length - 1].operationDate).getTime();
        let fecha2 = new Date(array[x].travelEquipmentDTOs[array[x].travelEquipmentDTOs.length - 1].operationDate).getTime();

        if (fecha1 > fecha2) {
          tmp = array[x];
          array[x] = array[i];
          array[i] = tmp;
        }
      }
    }

    return array

  }

}
