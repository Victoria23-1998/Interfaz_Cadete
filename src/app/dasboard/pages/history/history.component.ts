import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { TravelResponse } from '../../interface/travelResponse';
import { TravelService } from '../../service/travel.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  panelOpenState = false;
  viajesFinalizados:TravelResponse[]=[]
  viajesNoConfirmados:TravelResponse[]=[]
  idCade:number=0
  opcionSelect: string  = '1';
  seleccion: string = '1';
  loader:boolean=true
  constructor(private travelService: TravelService) { }
  ngOnInit(): void {
    
    let local = JSON.parse(localStorage.getItem('Usuario') ||'');
    this.idCade= local.id
    if(this.opcionSelect === '1'){
      
      this.viajesSinConfir()
     
    }
  }
  //logica del select
  
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.seleccion = this.opcionSelect;
    if(this.seleccion == '2'){
      this.loader=true
      this.viajesNoConfirmados=[]
      this.viajesFinalizados1()
      this.viajesFinalizados2()
  
      
    }else if(this.seleccion === '1'){
      
      this.loader=true
      this.viajesFinalizados = []
      this.viajesSinConfir()

      
    }
  }
  
  //Traer viajes 
  viajesFinalizados1(){
    
   
    this.travelService.viajesConfirmados().subscribe(data =>{
      
      data.forEach(travel =>{
        if(travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete !== null &&
          travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete.id == this.idCade ){
            console.log("hayviajesmiosEstado9")
            this.viajesFinalizados.push(travel)

        } 
        
      })
     
    },(error =>{
      console.log(error.error)
    }))
  }
  
  viajesFinalizados2(){
    this.travelService.viajeFinalizados2().subscribe(data =>{
     
      data.forEach(travel =>{
        if(travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete !== null &&
          travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete.id == this.idCade ){
             console.log("hayviajesmiosEstado4")
             this.viajesFinalizados.push(travel)
            
        } 
      })
      this.loader=false
    },(error =>{
      console.log(error.error)
    }))
  }
  
  viajesSinConfir(){
   
    this.travelService.viajeSinConfir().subscribe(data =>{
    
      data.forEach(travel =>{
        if(travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete !== null &&
          travel .travelEquipmentDTOs[travel .travelEquipmentDTOs.length-1].cadete.id == this.idCade ){
            console.log("hayviajesmiosEstado8")
            this.viajesNoConfirmados.push(travel)
           
        } 
      })
      this.loader=false
    },(error =>{
      console.log(error.error)
    }))
  }
  

}
