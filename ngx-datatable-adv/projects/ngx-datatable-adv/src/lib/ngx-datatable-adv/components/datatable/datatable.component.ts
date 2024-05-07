import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ColumnDefinition, EColumnType, IColumnDefinition, SortSubject} from "../../classes/column-definition.class";

@Component({
  selector: 'adv-datatable',
  standalone: false,
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent<T> implements OnInit {

  constructor() {  }

  public ngOnInit() {
    if (this.visibleColumns.length > 0 && !!this.sortSubject && this.data.length > 0) {
      this.onSortChange();
    }
  }

  @Input()
  public data: T[] = [];
  @Input()
  public sortSubject?: SortSubject<T>;
  @Input()
  public sortable: boolean = false;
  public eColumnType = EColumnType;

  private _columnDefinitions: ColumnDefinition<T>[] = [];
  public get columnDefinitions(): ColumnDefinition<T>[] {
    return this._columnDefinitions;
  }

  @Input("columnDefinitions")
  public set columnDefinitions(colDefs: IColumnDefinition<T>[]) {
    this._columnDefinitions = colDefs.map(x => {
      return new ColumnDefinition<T>(x);
    });
  };

  public get visibleColumns(): ColumnDefinition<T>[] {
    return this._columnDefinitions.filter(x => x.isVisible);
  }

  public onSortChange() {
    if (!this.sortSubject)
      this.sortSubject = {
        subject: this.visibleColumns[0].key,
        desc: false
      };

    this.data = this.data.sort((a, b): number => {
      const column = this.columnDefinitions.find(x => x.key == this.sortSubject?.subject);

      if (!column)
        throw new Error("Unknown column '"+ (this.sortSubject?.subject as string) +"' defined in sortSubject");

      const sortFn = column.sortFunction;

      if (!sortFn)
        throw new Error("No sort function defined for column: '"+ (this.sortSubject?.subject as string) +"'")

      return sortFn(a, b) * (this.sortSubject?.desc ? -1 : 1);
    });
  }

  public headerClick(column: ColumnDefinition<T>) {
    if (this.sortable && column.isSortable) {
      if (this.sortSubject === undefined || this.sortSubject?.subject != column.key) {
        this.sortSubject = {subject: column.key, desc: false};
      } else {
        this.sortSubject.desc = !this.sortSubject.desc;
      }

      this.onSortChange();
    }

  }
}
