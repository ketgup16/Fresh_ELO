export const allSuggestions = [
  'tv', 'tvs on sale', 'best tvs for gaming', 'tvs for living rooms', 'tvs under $500',
  'large screen tvs', 'tv mount', 'tv antenna', 'television', 'tv stand', 'smart tv',
  'laptop', 'laptops for students', 'gaming laptop', 'headphones', 'wireless headphones',
  'bluetooth speaker', 'phone charger', 'tablet', 'ipad',
  'toys', 'toys for boys', 'toys for girls', 'toys for toddlers', 'educational toys',
  'outdoor toys', 'baby toys', 'lego sets', 'barbie dolls', 'action figures',
  'board games', 'stuffed animals', 'toy cars', 'puzzles', 'building blocks',
  'shirt', 'shirts for men', 'shirts for women', 't-shirts', 'jeans', 'jeans for women',
  'pants', 'dress', 'dresses for women', 'shoes', 'sneakers', 'boots', 'socks',
  'milk', 'bread', 'eggs', 'chicken', 'ground beef', 'rice', 'pasta', 'cereal',
  'coffee', 'coffee pods', 'tea', 'chips', 'cookies', 'snacks', 'snacks for kids',
  'toilet paper', 'paper towels', 'laundry detergent', 'dish soap', 'cleaning supplies',
  'trash bags', 'batteries', 'light bulbs', 'storage bins', 'hangers', 'towels',
  'diapers', 'baby wipes', 'baby formula', 'baby food', 'baby bottles',
  'shampoo', 'conditioner', 'body wash', 'toothpaste', 'toothbrush', 'deodorant',
  'makeup', 'lipstick', 'mascara', 'skincare', 'moisturizer', 'sunscreen',
  'basketball', 'soccer ball', 'yoga mat', 'dumbbells', 'weights', 'camping tent',
  'dog food', 'cat food', 'pet toys', 'dog treats', 'cat litter', 'pet bed',
  'books', 'kindle', 'notebook', 'pens', 'markers', 'crayons', 'backpack',
  'plates', 'cups', 'utensils', 'cookware', 'pots and pans', 'coffee maker', 'blender',
  'couch', 'sofa', 'chair', 'desk', 'table', 'bed frame', 'mattress', 'dresser',
];

export const defaultRecentSearches = [
  'towel papers big rolls',
  'sunscreen travel size',
  'kids socks toddler',
  'milk low fat',
  'smart tv 65',
];

export const trendingSearches = [
  'sprite+tea',
  'slashing legends tin',
  'toothpicks',
  'abu garcia',
  'quilted northern bath tissue',
  'pencils',
  'protein powder',
];

export const frequentSearches = [
  'paper plates',
  'laundry detergent',
  'eggs',
  'green tea',
  'cereal',
  'colgate',
  'flour',
  'listerine',
];

export function filterSuggestions(query: string): string[] {
  if (!query) return [];
  return allSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
}
