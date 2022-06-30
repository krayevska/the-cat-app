import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cat } from '../model/interfaces';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public breedsList: any;
  public patternFromInput: string;

  @Output() pattern = new EventEmitter<String[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  public setPattern(pattern: string): void {
    if (pattern !== 'all') {
      const breedInfo = this.breedsList.find((breed) => breed.name === pattern);
      this.pattern.emit([breedInfo.id, 'select']);
      console.log('breedInfo ', breedInfo);
    } else {
      console.log('pattern ', pattern);
      this.pattern.emit([pattern, 'all']);
    }
  }

  public getBreeds(): void {
    const url = 'https://api.thecatapi.com/v1/breeds';
    this.http.get<any>(url).subscribe((data: Cat[]) => {
      console.log('BREED DATA ', data);
      this.breedsList = data;
    });
  }

  public inputPattern(): void {
    this.pattern.emit([this.patternFromInput, 'name']);
  }

  //https://api.thecatapi.com/v1/breeds
}
