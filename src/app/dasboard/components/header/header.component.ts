import { Component, OnInit } from '@angular/core';
import { ShowMenuService } from 'src/app/service/show-menu.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ShowMenu:boolean=false
  constructor(public show:ShowMenuService, private router:Router) { }

  ngOnInit(): void {
  }
  
  logout(){
    
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result): any => {

      if (result.isConfirmed) {

        this.router.navigate(['/auth/login']);
        localStorage.removeItem('Usuario')

      } else if (result.isDenied) {
        console.log('no cerró sesión')
      }
    })


  }
}
