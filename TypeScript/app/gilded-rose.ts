enum ItemType {
  BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert',
  AGED_BRIE = 'Aged Brie',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
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
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!Object.values(ItemType).includes(this.items[i].name as ItemType)) {
        this.handleGenericItem(this.items[i])
        continue;
      }

      if (this.items[i].name != ItemType.AGED_BRIE && this.items[i].name != ItemType.BACKSTAGE) {
        if (this.items[i].quality > 0 && this.items[i].name != ItemType.SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == ItemType.BACKSTAGE) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
            }
          }
        }
      }
      if (this.items[i].name != ItemType.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != ItemType.AGED_BRIE) {
          if (this.items[i].name != ItemType.BACKSTAGE) {
            if (this.items[i].quality > 0 && this.items[i].name != ItemType.SULFURAS) {
              this.items[i].quality = this.items[i].quality - 1
            }
          } else {
            this.items[i].quality = 0
          }
        } else if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }

    return this.items;
  }

  private handleGenericItem(item: Item) {
    const decreaseQualityBy = item.sellIn <= 0 ? 2 : 1
    item.quality = Math.max(0, item.quality - decreaseQualityBy)
    item.sellIn = item.sellIn - 1
  }
}
