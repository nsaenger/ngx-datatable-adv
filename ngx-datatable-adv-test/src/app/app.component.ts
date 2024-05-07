import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {NgxDatatableAdvModule} from "../../../ngx-datatable-adv/projects/ngx-datatable-adv/src/lib/ngx-datatable-adv/ngx-datatable-adv.module";
import {IColumnDefinition, ColumnDefinition, EColumnType} from "../../../ngx-datatable-adv/projects/ngx-datatable-adv/src/lib/ngx-datatable-adv/classes/column-definition.class";

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Person {
  name: string;
  birthday: Date;
  address: Address;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxDatatableAdvModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public data: Person[] = Array.from({ length: 5 }).map((_, index) => ({
    name: `Person ${index + 1}`,
    birthday: new Date(Date.now() - ((index) * 1000 * 60*60*24*365) - (1000 * 60 * 60 * 24 * 365 * 25)),
    address: {
      street: `Street ${index + 1}`,
      city: `City ${index + 1}`,
      zipCode: `ZipCode ${index + 1}`
    }
  }));

  public colDefs: IColumnDefinition<Person>[] = [
    {
      key: 'name',
      type: EColumnType.STRING,
    },
    {
      key: "birthday",
      type: EColumnType.DATETIME,
      formatString: "shortDate"
    },
    {
      key: "age",
      type: EColumnType.NUMBER,
      formatString: "0.0-0",
      value: (row: Person) => {
        return Math.floor((Date.now() - row.birthday.getTime()) / (1000 * 60 * 60 * 24 * 365));
      }
    },
    {
      key: "address",
      type: EColumnType.DYNAMIC,
      value: (row: Person) => `${row.address.street}, ${row.address.zipCode} ${row.address.city}`,
      isSortable: false
    },

  ];
}
