import { Component } from '@angular/core';
import { Person, Role} from 'client/src/app/api/models';
import { ApplicationApiService, PersonApiService } from 'client/src/app/api/services';

@Component({
  selector: 'app-sample-component',
  templateUrl: './sample-component.component.html',
  styleUrls: ['./sample-component.component.css']
})
export class SampleComponentComponent {

  constructor(
    private readonly applicationApiService:ApplicationApiService
  ){}

  createPerson(){
    let person:Person ={};
    person.email="email";
    person.lastName="lastName";
    person.name="name";
    person.password="abcd";
    person.role=Role.User;
    person.username="username";

    this.applicationApiService.storeCreatePersonPost({body:person})
    .subscribe(
      x => console.log(x),
      err => console.error(err)
    )
  } 
}
