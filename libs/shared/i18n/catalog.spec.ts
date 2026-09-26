import { translations } from "./catalog";

describe("translation catalogue", () => {
  it("keeps English and Spanish keys in parity", () => {
    expect(Object.keys(translations.es).sort()).toEqual(
      Object.keys(translations.en).sort(),
    );
  });

  it("uses English and Spanish as the only supported languages", () => {
    expect(Object.keys(translations).sort()).toEqual(["en", "es"]);
  });
});
