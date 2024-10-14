import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items$!: Observable<Item[]>;
  newItem: Item = { id: 0, name: '' };
  editingItemId: number | null = null;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getItems();
  }

  onSubmit(): void {
    this.itemService.addItem(this.newItem).subscribe({
      next: () => {
        this.newItem = { id: 0, name: '' };
        this.items$ = this.itemService.getItems();
      },
      error: (err) => console.error('Error adding item', err)
    });
  }

  onDelete(id: number): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.items$ = this.itemService.getItems();
      },
      error: (err) => console.error('Error deleting item', err)
    });
  }

  onEdit(id: number): void {
    this.editingItemId = id; 
  }

  isEditing(id: number): boolean {
    return this.editingItemId === id;
  }


  updateItem(item: Item): void {
    this.itemService.updateItem(item.id, item).subscribe({
      next: () => {
        this.editingItemId = null; 
        this.items$ = this.itemService.getItems(); 
      },
      error: (err) => console.error('Error updating item', err)
    });
  }


}
