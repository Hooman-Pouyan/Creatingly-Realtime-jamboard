import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../../pages/brainstorming/jamboard/models/jamboard.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnInit {
  constructor() {
    // Let us open our database
    const DBOpenRequest = window.indexedDB.open('CreatinglyDatabase', 1);

    DBOpenRequest.onerror = (event: any) => {
      console.error(`Database error: ${event.target.errorCode}`);
    };
    DBOpenRequest.onsuccess = (event: any) => {
      // this.db ??= event?.target?.result;
      console.log(this.db);
    };

    DBOpenRequest.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      // Create an objectStore to hold information about our customers. We're
      // going to use "ssn" as our key path because it's guaranteed to be
      // unique - or at least that's what I was told during the kickoff meeting.
      const objectStore = db.createObjectStore('users', { keyPath: 'id' });

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex('name', 'name', { unique: false });

      // Create an index to search customers by email. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex('email', 'email', { unique: true });

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = (event: any) => {
        // Store values in the newly created objectStore.
        const UserObjectStore = db
          .transaction('users', 'readwrite')
          .objectStore('users');
        this.mockUsers.forEach((customer) => {
          UserObjectStore.add(customer);
        });
      };

      const transaction = db.transaction(['customers'], 'readwrite');
      transaction.oncomplete = (event: any) => {
        console.log('All done!');
      };
    };
  }

  mockUsers: IUser[] = [
    {
      id: '1',
      name: 'user 1',
      avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
      curser: {
        id: '1',
        color: 'red',
        position: {
          x: 100,
          y: 100,
        },
      },
      status: 'online',
      activeModule: 'jamboard',
    },
  ];

  private db!: IDBDatabase;
  ngOnInit(): void {}
}
