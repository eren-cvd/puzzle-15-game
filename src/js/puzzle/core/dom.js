class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        // setter
        if (typeof html === 'string') {
            this.$el.innerHTML = html;

            // Return instance to continue chain
            return this;
        }

        // getter
        return this.$el.outerHTML.trim();
    }

    get data() {
        return this.$el.dataset;
    }

    clear() {
        this.html('');

        return this;
    }

    text(text) {
        // Setter
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;

            return this;
        }

        // Getters
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }

        return this.$el.textContent.trim();
    }

    is(selector) {
        if (selector) {
            return this.$el.classList.contains(selector.replace('.', ''));
        }

        return this.$el.tagName.toLowerCase();
    }

    coords() {
        return this.$el.getBoundingClientRect();
    }

    focus() {
        this.$el.focus();

        return this;
    }

    find(selector) {
        const element = this.$el.querySelector(selector);

        return $(element);
    }

    findAll(selector) {
        const elements = Array.from(this.$el.querySelectorAll(selector));

        return elements.map(el => $(el));
    }

    toggleClass(classList, add = true) {
        this.$el.classList[add ? 'add' : 'remove'](classList);
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(name => this.$el.style[name] = styles[name]);
    }

    getStyle( styles = {}, defaultStyles = false ) {
        return styles.reduce((res, s) => {
            let style = this.$el.style[s];

            if (!style && typeof defaultStyles === 'object') {
                style = defaultStyles[s];
            }

            res[s] = style;

            return res;
        }, {});
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        // Polyfill
        if (Element.prototype.append) {
            this.$el.append(node);
        }
        else {
            this.$el.appendChild(node);
        }

        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
}


export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};
