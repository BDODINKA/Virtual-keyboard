const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.text = document.createElement("textarea")

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.text.classList.add("use-keyboard-input")
        this.elements.keysContainer.append(this._createKeys());


        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.prepend(this.elements.keysContainer);
        document.body.prepend(this.elements.main);
        document.body.prepend(this.elements.text);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","{","}",
            "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":","'","","Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","RShift",
            "ctrl","win","alt","space","alt", "ctrl"
        ];


        // Create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };



        keyLayout.forEach(key => {
            const keyElement = document.createElement("div");
            const insertLineBreak = ["Backspace", "}", "Enter", "RShift"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.classList.add("keyboard__key");



            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Caps":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Caps");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Enter");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("Space");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Shift");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;
                case "RShift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("RShift");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });


        return fragment;
    },


    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }

};



window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();



    const keys = document.querySelectorAll('.keyboard__key')

    for (let i = 0; i < keys.length; i++){
        keys[i].setAttribute('keyName',keys[i].innerText)
        keys[i].setAttribute('keyLowerCase',keys[i].innerText.toLowerCase())
    }
    window.addEventListener('keydown',function (e){
        for (let i = 0; i < keys.length; i++){
            if (e.key === keys[i].getAttribute('keyName')|| e.key === keys[i].getAttribute('keyLowerCase')){
                keys[i].classList.add('active')
            }

        }
    })
    window.addEventListener('keyup',function (e){
        for (let i = 0; i < keys.length; i++){
            if (e.key === keys[i].getAttribute('keyName')|| e.key === keys[i].getAttribute('keyLowerCase')){
                keys[i].classList.remove('active')
            }

        }
    })
});
