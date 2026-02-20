enum ItemType {
  BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert',
  AGED_BRIE = 'Aged Brie',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  CONJURED = 'Conjured',
}

export enum ItemOperation {
  Increment,
  Decrement,
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  changeQuality(operation: ItemOperation, value: number) {
    if (operation === ItemOperation.Decrement) value = -value;
    this.quality = Math.max(0, this.quality + value);
  }

  changeSellIn(operation: ItemOperation, value: number) {
    if (operation === ItemOperation.Decrement) value = -value;
    this.sellIn = this.sellIn + value
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private changeQuality(item: Item) {
    if (!Object.values(ItemType).includes(item.name as ItemType)) {
      this.handleGenericItem(item)
    } else {
      if (item.quality < 50 && item.name != ItemType.CONJURED) {
        item.changeQuality(ItemOperation.Increment, 1);
        if (item.name == ItemType.BACKSTAGE) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.changeQuality(ItemOperation.Increment, 1);
            }
          }
          if (item.sellIn < 6 && item.quality < 50) {
            item.changeQuality(ItemOperation.Increment, 1);
          }
        }
      }
    }

    if (item.sellIn < 0) {
      if (item.name != ItemType.AGED_BRIE) {
        if (item.name == ItemType.BACKSTAGE) {
          item.quality = 0
        }
      } else if (item.quality < 50) {
        item.changeQuality(ItemOperation.Increment, 1);
      }
    }

    if (item.name === ItemType.CONJURED) {
      item.changeQuality(ItemOperation.Decrement, 2);
    }
  }

  private changeSellIn(item: Item) {
    if (item.name != ItemType.SULFURAS) {
      item.changeSellIn(ItemOperation.Decrement, 1);
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.changeSellIn(this.items[i]);
      this.changeQuality(this.items[i]);
    }

    return this.items;
  }

  private handleGenericItem(item: Item) {
    const decreaseQualityBy = item.sellIn <= 0 ? 2 : 1
    item.changeQuality(ItemOperation.Decrement, decreaseQualityBy);
  }
}
