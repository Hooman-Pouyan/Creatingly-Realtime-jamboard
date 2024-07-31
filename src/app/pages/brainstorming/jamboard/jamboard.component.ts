import { Component } from '@angular/core';
import { NoteComponent } from "./components/note/note.component";

@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss'
})
export class JamboardComponent {

}
