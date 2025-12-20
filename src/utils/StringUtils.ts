export {}; // to make it a module

declare global {
  // to access the global type String
  interface String {
    searchable(): string;
    replaceSequentially(...replacements: string[]): string;
    capitalizeFirstLetter(): string;
  }
}
String.prototype.searchable = function () {
  return this.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .toLocaleLowerCase()
    .trim();
};

String.prototype.replaceSequentially = function (...replacements) {
  return replacements
    .reduce((result, replacement, index) => {
      return result.replace(
        new RegExp('\\{' + (index + 1) + '\\}', 'g'),
        replacement,
      );
    }, this)
    .toString();
};

String.prototype.capitalizeFirstLetter = function (...replacements) {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// then the actual code
