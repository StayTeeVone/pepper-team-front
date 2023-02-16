import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class localStorageService{
    
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

    setToStorage(key: string, str: string): void{
        this.storage.remove(key);
        this.storage.set(key, str);
    }

    getFromStorage(key: string): string{
        return this.storage.get(key);
    }

    dropFromStorage(key: string): void {
        this.storage.remove(key);
    }
}



