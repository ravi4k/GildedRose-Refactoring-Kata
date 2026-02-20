import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should degrade quality and sellIn for normal items', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });

  it('should not decrease quality below 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should increase quality for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it('should not increase quality above 50 for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should increase quality by 2 when Backstage passes sellIn <= 10', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
  });

  it('should increase quality by 3 when Backstage passes sellIn <= 5', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(43);
  });

  it('should drop quality to 0 after concert for Backstage passes', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should not increase Backstage passes quality above 50', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });

  it('should not change quality or sellIn for Sulfuras', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 0, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it('should degrade quality twice as fast after sellIn date', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should increase Aged Brie quality by 2 after sellIn date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('should degrade in quality twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should decrease quality by 1 for normal items with sellIn < 0', () => {
    const gildedRose = new GildedRose([new Item('Foo', -2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(-3);
  });

  it('should not increase quality for Sulfuras when quality is less than 50', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(49);
  })
});
