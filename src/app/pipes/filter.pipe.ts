import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, labelKeys?: string[]): any {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(
      item => {
        if (labelKeys){
          for (const label of labelKeys) {
            item = item[label];
          }
        }
        else {
          item = item['label'];
        }
        return item
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) === true;
      }
    );
  }
}
