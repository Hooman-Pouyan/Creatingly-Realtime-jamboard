import {
  Component,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { SharedModule } from '../../shared.module';
import {
  IJamElement,
  TJamElementContent,
} from '../../../pages/brainstorming/jamboard/models/element.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './editable.component.html',
  styleUrl: './editable.component.scss',
})
export class EditableComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  type = input('text');
  placeholder = input('Change Content');
  content: InputSignal<TJamElementContent> = input.required({
    transform: (data) => {
      this.text = data.text;
      return data;
    },
  });
  editMode: WritableSignal<boolean> = signal(false);
  contentEmitter: OutputEmitterRef<TJamElementContent> = output();
  text = '';

  @HostListener('dblclick') onDoubleClick() {
    console.log('asaks');
    this.editMode.set(true);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    if (event.key === 'Enter') {
      this.updateContent();
    }
  }
  updateContent() {
    this.editMode.set(false);
    console.log({ ...this.content(), text: this.text });

    this.contentEmitter.emit({ ...this.content(), text: this.text });
    this.text = '';
  }
}
