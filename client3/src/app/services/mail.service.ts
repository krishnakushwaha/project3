import { Injectable } from '@angular/core';

@Injectable()
export class MailService {

 

  message='you have a mail';

  constructor() { }

  setValue(val: string): void{
  	this.message = val;
  }

  getValue(): string {
  	return this.message;
  }


}
