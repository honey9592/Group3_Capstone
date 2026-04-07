// ─── Product Image Helper ───
// Provides a consistent way to display product images across all components.
// If a product has an image URL (from ImgBB, Postimages, etc.), it uses that.
// Otherwise, falls back to a category emoji.

const categoryEmojis = {
  'Fruits': '🍎',
  'Vegetables': '🥬',
  'Dairy': '🧀',
  'Bakery': '🍞',
  'Meat': '🥩',
  'Beverages': '🧃',
};

const categoryBgs = {
  'Fruits': 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
  'Vegetables': 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  'Dairy': 'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)',
  'Bakery': 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
  'Meat': 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  'Beverages': 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
};

export const getEmoji = (category) => categoryEmojis[category] || '📦';
export const getBg = (category) => categoryBgs[category] || '#f3f4f6';
export const hasImage = (product) => product.image && product.image.trim() !== '';
