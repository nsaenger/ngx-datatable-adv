export enum EColumnType {
  STRING,
  NUMBER,
  DATETIME,
  DYNAMIC
}


export interface SortSubject<T> {
  subject: keyof T | string;
  desc: boolean;
}


/**
 * Represents the definition of a column in a data table.
 *
 * @template T
 */
export interface IColumnDefinition<T> {
  /**
   * Represents a key for a column in a data table.
   *
   * @type {keyof T | string} key
   */
  key: keyof T | string;

  /**
   * Represents the name of a column.
   *
   * @type {string} name
   * @description The name of the column, if none given the key will be used, if ng-translate is provided an
   * automatic translation via the name as the translation key will be performed
   */
  name?: string;

  /**
   * Represents the type of column in a data table.
   *
   * @type {EColumnType} type
   * @default EColumnType.STRING
   * @description This type is used for rendering optimizations and automatic search & sorting functions. Except for the
   * EColumnType.INDEX type, this is used to index each row of your dataset, this needs to be a unique identifier, if
   * none is given each row is index by its position which may not what you want it to be
   */
  type?: EColumnType;

  /**
   * The formatString variable specifies the format pattern for a string.
   *
   * @type {string} formatString
   * @default "0.2-2"
   * @description Used to format the value in the table. Highly depends on type.
   *  - For EColumnType.DATETIME refer to https://angular.io/api/common/DatePipe
   *  - For EColumnType.DATETIME refer to https://angular.io/api/common/DecimalPipe
   *  - For everything else this value is ignored
   */
  formatString?: string;

  /**
   * Flag indicating whether the column is searchable.
   *
   * @type {boolean}
   * @default false
   */
  isSearchable?: boolean;

  /**
   * Flag indicating whether the column is sortable.
   *
   * @type {boolean}
   * @default false
   */
  isSortable?: boolean;

  /**
   * Optional sort function that can be provided to specify custom sorting logic.
   *
   * @type {function}
   * @param {T} a - The first element for comparison.
   * @param {T} b - The second element for comparison.
   * @returns {number} - Returns a negative value if `a` should be sorted before `b`,
   *                    0 if both elements are considered equal,
   *                    or a positive value if `a` should be sorted after `b`.
   */
  sortFunction?: (a:T, b:T) => number;

  /**
   * Represents the visibility state of an element.
   *
   * @type {boolean}
   */
  isVisible?: boolean;

  /**
   * Indicates whether the value is an index.
   *
   * @type {boolean}
   * @default false
   */
  isIndex?: boolean;

  /**
   * Represents an optional callback function that retrieves the value of a specific column from a given row object.
   *
   * @param {T} row - The row object from which to retrieve the column value.
   * @returns {any} - The value of the specific column from the given row.
   * @description You can use this function to return a simple value for a complex data type to make a column sortable
   * and searchable even if its datatype is a object
   */
  value?: (row: T) => any;

  /**
   * Represents a tooltip function that generates the tooltip text based on the provided row data.
   *
   * @param {T} row - The row data for which to generate the tooltip.
   * @returns {string} - The generated tooltip text.
   */
  tooltip?: (row: T) => string;
}

/**
 * Represents a column definition for a data table.
 *
 * @template T - The type of data contained in the rows.
 */
export class ColumnDefinition<T> implements IColumnDefinition<T> {
  /**
   * Represents a key for a column in a data table.
   *
   * @type {keyof T | string} key
   */
  public key: keyof T | string;

  /**
   * Represents the name of a column.
   *
   * @type {string} name
   * @description The name of the column, if none given the key will be used, if ng-translate is provided an
   * automatic translation via the name as the translation key will be performed
   */
  public name?: string;

  /**
   * Represents the type of column in a data table.
   *
   * @type {EColumnType} type
   * @default EColumnType.STRING
   * @description This type is used for rendering optimizations and automatic search & sorting functions. Except for the
   * EColumnType.INDEX type, this is used to index each row of your dataset, this needs to be a unique identifier, if
   * none is given each row is index by its position which may not what you want it to be
   */
  public type?: EColumnType = EColumnType.STRING;

  /**
   * The formatString variable specifies the format pattern for a string.
   *
   * @type {string} formatString
   * @default "0.2-2"
   * @description Used to format the value in the table. Highly depends on type.
   *  - For EColumnType.DATETIME refer to https://angular.io/api/common/DatePipe
   *  - For EColumnType.DATETIME refer to https://angular.io/api/common/DecimalPipe
   *  - For everything else this value is ignored
   */
  public formatString?: string = "0.2-2";

  /**
   * Flag indicating whether the column is searchable.
   *
   * @type {boolean}
   * @default false
   */
  public isSearchable?: boolean = true;

  /**
   * Flag indicating whether the column is sortable.
   *
   * @type {boolean}
   * @default false
   */
  public isSortable?: boolean = true;

  /**
   * Indicates whether the value is an index.
   *
   * @type {boolean}
   * @default false
   */
  public isIndex?: boolean = false;

  /**
   * Optional sort function that can be provided to specify custom sorting logic.
   *
   * @type {function}
   * @param {T} a - The first element for comparison.
   * @param {T} b - The second element for comparison.
   * @returns {number} - Returns a negative value if `a` should be sorted before `b`,
   *                    0 if both elements are considered equal,
   *                    or a positive value if `a` should be sorted after `b`.
   */
  public sortFunction?: (a:T, b:T) => number;

  /**
   * Represents the visibility state of an element.
   *
   * @type {boolean}
   */
  public isVisible?: boolean = true;

  /**
   * Represents an optional callback function that retrieves the value of a specific column from a given row object.
   *
   * @param {T} row - The row object from which to retrieve the column value.
   * @returns {any} - The value of the specific column from the given row.
   * @description You can use this function to return a simple value for a complex data type to make a column sortable
   * and searchable even if its datatype is a object
   */
  public value: (row: T) => any = (row) => row[this.key as keyof T];

  /**
   * Represents a tooltip function that generates the tooltip text based on the provided row data.
   *
   * @param {T} row - The row data for which to generate the tooltip.
   * @returns {string} - The generated tooltip text.
   */
  public tooltip: (row: T) => string;

  public constructor(colDef: IColumnDefinition<T>) {
    Object.assign( this, colDef);

    this.key = colDef.key;
    this.name = this.name ?? (colDef.key as string);
    this.tooltip = colDef.tooltip ?? this.value;


    /**
     * Defining sort functions
     */
    if (this.sortFunction === undefined) {
      if (this.isSortable && this.type === EColumnType.DYNAMIC)
        throw new Error("Column '" + (this.key as string) + "' is marked as a sortable dynamic type but has no custom sort function defined.")

      if ((this.type === EColumnType.NUMBER || this.type === EColumnType.DATETIME))
        this.sortFunction = (a, b) => this.value(a) - this.value(b);

      if (this.type === EColumnType.STRING)
        this.sortFunction = (a, b) => this.value(a).localeCompare(this.value(b));
    }
  }
}
