function extractMinPriceFromText(text) {
  if (!text?.trim()) return null;

  const amounts = [];
  const patterns = [
    /CHF\s*(\d+(?:[.,]\d+)?)/gi,
    /(\d+(?:[.,]\d+)?)\s*\.?\s*CHF/gi,
    /dès\s*CHF?\s*(\d+(?:[.,]\d+)?)/gi,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = Number(match[1].replace(",", "."));
      if (!Number.isNaN(value)) amounts.push(value);
    }
  }

  return amounts.length ? Math.min(...amounts) : null;
}

/** Prix court pour les vignettes : « 600 CHF » uniquement */
export function getPrestationCardPrice(prestation) {
  const currency =
    prestation.priceCurrency || prestation.priceText?.currency || "CHF";

  const amount = prestation.priceAmount ?? prestation.priceText?.amount;
  if (typeof amount === "number") {
    return `${amount} ${currency}`;
  }

  if (prestation.price?.length) {
    const amounts = prestation.price
      .map((item) => item.amount)
      .filter((value) => typeof value === "number");

    if (amounts.length) {
      const priceCurrency = prestation.price[0]?.currency || currency;
      return `${Math.min(...amounts)} ${priceCurrency}`;
    }
  }

  const gridText =
    prestation.priceGrid ??
    (typeof prestation.priceText === "string" ? prestation.priceText : null);

  if (gridText) {
    const minAmount = extractMinPriceFromText(gridText);
    if (minAmount != null) return `${minAmount} ${currency}`;
  }

  return null;
}

export function hasPrestationPriceGrid(prestation) {
  const grid = prestation.priceGrid ?? prestation.priceText;
  if (typeof grid === "string") return grid.trim().length > 0;
  if (Array.isArray(grid) && grid.length > 0) return true;
  return Boolean(prestation.price?.length);
}
