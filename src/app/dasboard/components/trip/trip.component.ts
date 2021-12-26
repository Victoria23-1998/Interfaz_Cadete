import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { TravelResponse } from '../../interface/travelResponse';
import { User } from '../../interface/local';
import { TravelService } from '../../service/travel.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  //variables
  travelId:number = 0
  viajesSolicitados:TravelResponse[]=[]
  idCadet:number=0
  toggle:boolean=false
  local:User={
    id: 0,
    email: '',
    fullName:'',
    address:'',
    cellPhone: ''
  }
  idUserLoged:number=0
  isReasigned:boolean=false
  statusTravel:number=0
  error:string=''


  @Input() availableTrips:TravelResponse[]=[]
  @Input() valueSelectTravel:string=''
  @Input() travelAccepted:TravelResponse[]=[]
  @Input()viajesComenzados:TravelResponse[]=[]
  
  constructor(private travelService:TravelService) { }
  
  ngOnInit(): void {
   this.local = JSON.parse(localStorage.getItem('Usuario') ||'')
   this.idCadet = this.local.id
  }
  
  setViaje(id:number,status:number,ressigned:boolean){

    this.travelId = id

    //viajes solicitados es el body para la url de post
    this.viajesSolicitados = this.availableTrips.filter(travel => travel.id === this.travelId);

    //obtener id del viaje para luego pasarlo a la url
    this.viajesSolicitados.forEach(travel => {

      this.idUserLoged = travel.travelEquipmentDTOs[0].operator.id;

    })

    //viaje no cancelado
    this.isReasigned = ressigned

    // ver si el status será entrega asignada o retiro asignado

    if (status === 1) {
      //cambia de solicitud retiro a retiro asignado
      this.statusTravel = 2
    } else if (status === 5) {
      //cambia de reparado a entrega asignada
      this.statusTravel = 6

    }


    this.travelService.TravelAccepted(this.idCadet.toString(), this.travelId.toString(), this.idUserLoged.toString(), this.isReasigned, this.statusTravel.toString(), this.viajesSolicitados).subscribe((data: TravelResponse) => {

      console.log(data)
      Swal.fire({
        position: 'center-start',
        icon: 'success',
        title: 'Viaje asignado con éxito',
        showConfirmButton: false,
        timer: 1400
      })
      let newArray: TravelResponse[] = this.availableTrips.filter(el => el.id !== this.travelId);
      return this.availableTrips = newArray
    }, (error) => {

      if (error.error = 'Cadete supera los 3 viajes en estado entrega asignada o retiro asignado') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No puede tomar más de 4 viajes en simultáneo',

        })
      } else {
        console.log(error.error)
      }
    })

  
  
  }
 
  //condicional para el html de viajes aceptados
 
   trips:string= 'No tienes viajes en curso'

   //estado del viaje para mostrarlo en la card de asignados
   statusMenssage(status:number){
     let result: string = ''
     switch (status) {
       case 2:
         result = 'Retiro Asignado'
         break;
       case 6:
         result = 'Entrega Asignada'
         break;
     }
     return result
   }


   isUser:number=0
   viajeRenunciar:TravelResponse[]=[]


   abandonar(idTravel:number,status:number){
    Swal.fire({
      title: '¿Estas seguro de abandonar el viaje?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result):any=> {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let travelStatus:number=0

        switch (status) {
          case 2:
            travelStatus=1
            break;
            case 6:
              travelStatus=5
              break;
          default:
            break;
        }
    
    //buscar el viaje a renunciar para enviarlo al API
    
    this.viajeRenunciar = this.travelAccepted.filter(travel => travel.id === idTravel);
    
    this.viajeRenunciar.forEach(travel =>{
     this.isUser= travel.travelEquipmentDTOs[0].operator.id;
    
    })
   
    this.travelService.Travelwaived(idTravel.toString(),this.isUser.toString(),travelStatus.toString(), this.viajeRenunciar).subscribe(data =>{
      console.log(data)
    },(error =>{
      console.log(error.error)
    }))
     
    

    let newArray:TravelResponse[]= this.travelAccepted.filter(el => el.id !== idTravel);
    
    return this.travelAccepted = newArray
        
      } else if (result.isDenied) {
        console.log('no abandono el viaje')
    }
  })
  }

   //Empezar viaje
   viajeComenzar:TravelResponse[]=[]
   User:number=0
   statusViaje:number=0
   viajesCurso:TravelResponse[]=[]

   startTrip(idTravel:number,status:number){
    this.viajeComenzar = this.travelAccepted.filter(travel => travel.id === idTravel);
    this.viajeComenzar.forEach(travel =>{
      this.User= travel.travelEquipmentDTOs[0].operator.id;
    })

    if(status === 2 ){
      //cambia de estado retiro asignado a retirado
      this.statusViaje = 3

      
    }else if(status === 6){
      //cambia de estado entrega asignada a pendiente de entrega
      this.statusViaje = 7
    }
   
    this.travelService.TravelAccepted(this.idCadet.toString(),idTravel.toString(),this.User.toString(),false, this.statusViaje.toString(),this.viajeComenzar)
    .subscribe(data =>{
       
      console.log(data)
    },(error =>{
      console.log(error.error)
    }))

   
     let newArray:TravelResponse[]= this.travelAccepted.filter(el => el.id !== idTravel);
     this.start(idTravel)
    return this.travelAccepted = newArray
  }

  
  direccion:string='';
  hora:string= '';
  fecha:string=''
  equipo:string='';
  nombre:string='';
  apellido:string=''
  estadoViaje:string=''

  start(idTravel:number){

    let viajeIniciado:TravelResponse[]= this.travelAccepted.filter(el => el.id == idTravel);
    
    viajeIniciado.forEach(el =>{
      this.nombre=el.travelEquipmentDTOs[el.travelEquipmentDTOs.length-1].operator.fullName
      this.direccion= el.travelEquipmentDTOs[el.travelEquipmentDTOs.length-1].operator.address
      this.equipo=el.travelEquipmentDTOs[el.travelEquipmentDTOs.length-1].equipment.mark
      this.hora=el.travelEquipmentDTOs[el.travelEquipmentDTOs.length-1].operationDate.toString().slice(11,16)
      this.fecha=el.travelEquipmentDTOs[el.travelEquipmentDTOs.length-1].operationDate.toString().slice(0,9)
    })
     
    Swal.fire({
      imageUrl: '../../../../assets/img/icons8-delivery-64.png',
      imageHeight: 64,
      text: '!Buen viaje!',
      showCloseButton: true,
      confirmButtonText: 'Ver detalle',

     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          html:
          `<div>
            <p>Nombre:${this.nombre}</p>
            <p>Dirección:${this.direccion}</p>
            <p>Hora:${this.hora} </p>
            <p>Fecha:${this.fecha} </p>
            <p>Equipo:${this.equipo}</p>
            <p>Estado viaje:${this.estadoViaje='En curso'}</p>
            <h2>Puedes seguir tu viaje en la sección viajes en curso</h2>
            </div>`,
          showCloseButton: true,

        })
      } 
    })
  }

  finalizarViaje(idTravel:number,status:number){

    
    let viajeFinalizar = this.viajesComenzados
    let statusT: number = 0
    viajeFinalizar.forEach(travel => {
      this.User = travel.travelEquipmentDTOs[0].operator.id;
    })

    if (status === 7) {

      statusT = 8


    } else if (status === 3) {

      statusT = 4
    }
    
    this.travelService.TravelAccepted(this.idCadet.toString(), idTravel.toString(), this.User.toString(), false, statusT.toString(), viajeFinalizar)
      .subscribe(data => {
        // lo guardo en el local para evitar hacer una llamada a la api nuevamente
        console.log(data)
      }, (error => {
        console.log(error.error)
      }))
    Swal.fire({
      position: 'center-start',
      icon: 'success',
      title: 'Viaje Finalizado con éxito',
      showConfirmButton: false,
      timer: 1600
    })

    let newArray: TravelResponse[] = this.viajesComenzados.filter(el => el.id !== idTravel);
    return this.viajesComenzados = newArray

  }

}