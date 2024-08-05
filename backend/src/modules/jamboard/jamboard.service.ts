import { Injectable } from '@nestjs/common';

@Injectable()
export class JamboardService {
  handleStateUpdate(body: any) {
    console.log(body);
  }
  handleElementSizeChange(body: any) {
    console.log(body);
  }
  handleElementPositionChange(body: any) {
    console.log(body);
  }
  handleElementAppearanceChange(body: any) {
    console.log(body);
  }
  handleElementDataChange(body: any) {
    console.log(body);
  }
  handleElementInfoChange(body: any) {
    console.log(body);
  }
  handleCursorMove(body: any) {
    console.log(body);
  }
  handleActiveUsers(body: any) {
    console.log(body);
  }
}
