import { Pipe, PipeTransform } from '@angular/core';
import { SocketEvents } from '../../core/models/socket.model';
@Pipe({
  name: 'ConvertToProperty',
  standalone: true,
  pure: true,
})
export class ConvertToPropertyPipe implements PipeTransform {
  transform(value: string, page: string): string | undefined {
    switch (value) {
      case SocketEvents.JAMBOARD.ELEMENT.APPEARENCE:
        return 'appearence';
      case SocketEvents.JAMBOARD.ELEMENT.POSITION:
        return 'position';
      case SocketEvents.JAMBOARD.ELEMENT.SIZE:
        return 'size';
      case SocketEvents.JAMBOARD.ELEMENT.DATA:
        return 'data';
      case SocketEvents.JAMBOARD.ELEMENT.INFO:
        return 'info';
      default:
        return undefined;
    }
  }
}
