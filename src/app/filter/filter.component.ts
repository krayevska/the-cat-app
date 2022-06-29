import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cat } from '../model/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public breedsList: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  public getBreeds(): void {
    const url = 'https://api.thecatapi.com/v1/breeds';
    this.http.get<any>(url).subscribe((data: Cat[]) => {
      console.log('BREED DATA ', data);
      this.breedsList = data;
    });
  }

  //https://api.thecatapi.com/v1/breeds
}
