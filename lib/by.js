class By {
    constructor(using, value) {
        this.using = using;
        this.value = value;
    }
    static id(id) {
        return new By('id', id);
    }
    static name(name) {
        return new By('name', name);
    }
    static text(text) {
        return new By('text', text);
    }
    static tagName(tagName) {
        return new By('tagName', tagName);
    }
    static title(title) {
        return new By('title', title);
    }
    static xpath(xpath) {
        return new By('xpath', xpath);
    }
    static format(locator) {
        if (locator instanceof By) {
            return locator;
        }
        if (locator && typeof locator === 'object' && typeof locator.using === 'string' && typeof locator.value === 'string') {
            return new By(locator.using, locator.value);
        }
        throw new Error('Invalid locator');
    }
    toString() {
        return `By(${this.using}, ${this.value})`;
    }
}

module.exports = By;
