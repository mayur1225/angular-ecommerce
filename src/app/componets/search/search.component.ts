import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private router:Router){}

  ngOnInit(): void {
     
  }

  onSearch(keyword: string) {
    this.router.navigate(['/search', keyword]);
  }

}
