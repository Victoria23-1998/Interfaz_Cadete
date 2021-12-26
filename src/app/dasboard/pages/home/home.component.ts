import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/local';
import { Router } from '@angular/router';
import { ShowMenuService } from 'src/app/service/show-menu.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private router:Router, private showMenuService:ShowMenuService) { }
  name:string ='' 
  local:User={
    id: 0,
    email:'',
    fullName: '',
    address:'',
    cellPhone: ''
  }
  ngOnInit(): void {
    this.local =JSON.parse(localStorage.getItem('Usuario') ||'');
    this.name= this.local.fullName
    /*uso showMenu para poder terminar el requerimiento de redireccionar
    si no inicio sesión luego sera mejorado*/
    if(!this.showMenuService.showMenu())this.router.navigate(['login'])
  }



}
