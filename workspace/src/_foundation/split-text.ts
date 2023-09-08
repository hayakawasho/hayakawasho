export class SplitText {
  public spans: HTMLElement[] = [];

  constructor(
    private target: HTMLElement,
    private options = {
      charClass: "_c",
      wordClass: "_w",
      emptySpaceName: "_s",
    }
  ) {
    this.#setSplit(target);
  }

  #setSplit = (line: HTMLElement) => {
    const text = line.innerText!;
    const words = text.split(" ");

    const wordsElements = words.map((word, _i) => {
      this.#splitChars(word);

      // console.log(word, charsElements);

      // const span = document.createElement("span");
      // span.innerHTML = word;
      //
      // span.classList.add("_w");
      // span.dataset.w = word;
      //
      // return span;
    });

    const fragment = document.createDocumentFragment();

    // for (const span of wordsElements.flat()) {
    //   fragment.appendChild(span);
    //   this.spans.push(span);
    // }

    line.innerHTML = "";
    line.appendChild(fragment);

    const sreenReader = document.createElement("span");
    sreenReader.classList.add("sr-only");
    sreenReader.innerHTML = text;

    line.appendChild(sreenReader);

    // const decorated = chars.map((char, _i) => {
    //   const span = document.createElement("span");
    //   span.textContent = char;
    //
    //   span.style.display = "inline-block";
    //   span.style.opacity = "1";
    //   span.style.transform = "translate3d(0,0,0)";
    //   span.setAttribute("aria-hidden", "true");
    //
    //   return span;
    // });

    // const fragment = document.createDocumentFragment();
    //
    // for (const span of decorated.flat()) {
    //   fragment.appendChild(span);
    //   this.spans.push(span);
    // }
    //
    // line.textContent = "";
    // line.appendChild(fragment);

    // const srOnly = document.createElement("div");
    // srOnly.classList.add("sr-only");
    // srOnly.textContent = content;

    // line.appendChild(srOnly);
  };

  #splitWords() {
    //
  }

  #splitChars(word: string) {
    const chars = word.split("");

    return chars.map((char, _i) => {
      const span = document.createElement("span");
      span.innerHTML = char;

      span.classList.add("_c");
      span.setAttribute("aria-hidden", "true");

      return span;
    });
  }
}

/*
class TextSplitter {
  constructor() {
    this.bodyElement = null;
    this.lineElements = [];
    this.wordElements = [];
    this.wordChildElements = [];
    this.events = [];
  }

  initialize(selector = ".page-origin") {
    this.bodyElement = document.querySelector(selector);
    if (!this.bodyElement) {
      console.error("Element with class 'page-origin' not found.");
      return;
    }

    this.lineElements = this.bodyElement.querySelectorAll(".js-split-l");
    this.wordElements = this.bodyElement.querySelectorAll(".js-split-w");
    this.wordChildElements =
      this.bodyElement.querySelectorAll(".js-split-w-child");

    this.splitLines();
    this.splitWords();
    this.addEvents();
    this.onResize();
  }

  splitLines() {
    this.lineElements.forEach((lineElement, index) => {
      lineElement.dataset.y = index;
      if (index === this.lineElements.length - 1) {
        lineElement.classList.add("last");
      }
      this.splitWords(lineElement);
    });
  }

  splitWords(element) {
    const elements = element ? [element] : this.wordElements;

    elements.forEach((wordElement) => {
      const type = wordElement.dataset.type || "char";
      const words = wordElement.innerText.split(" ");
      let html = "";

      words.forEach((word, index) => {
        if (type === "char") {
          const characters = word.split("");
          let charactersHTML = characters
            .map(
              (char) =>
                `<div class="c o" data-c="${char}"><div class="t">${char}</div></div>`
            )
            .join("");
          html +=
            index === 0
              ? `<div class="w" data-w="${word}">${charactersHTML}</div>`
              : `<div class="s"> </div><div class="w" data-w="${word}">${charactersHTML}</div>`;
        } else {
          html +=
            index === 0
              ? `<div class="w" data-w="${word}"><div class="o"><div class="t">${word}</div></div></div>`
              : `<div class="s"> </div><div class="w" data-w="${word}"><div class="o"><div class="t">${word}</div></div></div>`;
        }
      });

      wordElement.innerHTML = html;
    });
  }

  addEvents() {
    this.events = [];

    this.lineElements.forEach((lineElement) => {
      lineElement.querySelectorAll(".l").forEach((element) => {
        const lastCharacterElement =
          element.querySelector(".w:last-child .c:last-child") ||
          element.querySelector(".w:last-child .t");
        if (!lastCharacterElement) return;

        const transitionStartHandler = () => {
          element.dataset.anim = 1;
        };

        const transitionEndHandler = () => {
          element.dataset.anim = 0;
        };

        lastCharacterElement.addEventListener(
          "transitionstart",
          transitionStartHandler
        );
        lastCharacterElement.addEventListener(
          "transitionend",
          transitionEndHandler
        );

        const eventObject = {
          el: lastCharacterElement,
          start: { func: transitionStartHandler },
          end: { func: transitionEndHandler },
        };
        this.events.push(eventObject);
      });
    });
  }

  removeEvents() {
    this.events.forEach((eventObject) => {
      eventObject.el.removeEventListener(
        "transitionstart",
        eventObject.start.func
      );
      eventObject.el.removeEventListener("transitionend", eventObject.end.func);
    });
    this.events = [];
  }

  onResize() {
    const elements = [...this.wordElements, ...this.wordChildElements];
    elements.forEach((element) => {
      const wordsAndSpaces = element.querySelectorAll(".w,.s");
      const elementRect = element.getBoundingClientRect();

      wordsAndSpaces.forEach((wordOrSpace) => {
        const rect = wordOrSpace.getBoundingClientRect();
        const topOffset = rect.top - elementRect.top;
        const leftOffset = rect.left - elementRect.left;
        const x = Math.floor(leftOffset / rect.width);
        const y = Math.floor(topOffset / rect.height);
        wordOrSpace.classList.contains("s")
          ? (wordOrSpace.dataset.x = Math.min(x, 1))
          : (wordOrSpace.dataset.x = x);
        wordOrSpace.dataset.y = y;
      });
    });

    // Handle any device-specific behavior here if required
    // Note: '__DETECT__.device.any' is not defined in the provided code snippet
  }

  reset() {
    this.removeEvents();
  }
}

export class __SplitText {
  #options = {
    charClass: "aki__char",
    wordClass: "aki__word",
    lineClass: "aki__line",
    globalClass: "aki_wrapper",
    emptySpaceName: "__AKI__EMPTY__SPACE__",
  };

  #rawChars = [];
  chars = [];
  #rawWords = [];
  words = [];
  lines = [];

  constructor(elementOrSelector) {
    this.init(elementOrSelector);

    this.target = null;
    this.textContent = null;
  }

  #isElement(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return (
        typeof obj === "object" &&
        obj.nodeType === 1 &&
        typeof obj.style === "object" &&
        typeof obj.ownerDocument === "object"
      );
    }
  }

  #createElement(tagname, content = "", htmlAttributes = {}, ...cssClass) {
    const __element__ = document.createElement(tagname);
    __element__.classList.add(...cssClass);
    __element__.innerHTML = content;

    for (const [key, value] of Object.entries(htmlAttributes)) {
      __element__.setAttribute(key, value);
    }

    return __element__;
  }

  #splitChars() {
    const textChars = `${this.textContent}`.split("");

    textChars.forEach((char) => {
      const charElement = this.#createElement(
        "div",
        `${char}`,
        {
          style: "position:relative; display:inline-block;",
        },
        `${this.#options.globalClass}`,
        `${this.#options.charClass}`
      );

      this.#rawChars.push(char === " " ? " " : charElement);
      this.chars.push(charElement);
    });
    this.#rawChars.push(" ");
  }

  #splitWords() {
    let startIndex = 0;
    this.#rawChars.forEach((rawChar, index) => {
      if (rawChar === " ") {
        const wordArray = this.#rawChars
          .slice(startIndex, index)
          .filter((word) => word !== " ");

        const wordDiv = this.#createElement(
          "div",
          "",
          {
            style: "position:relative; display:inline-block;",
          },
          `${this.#options.globalClass}`,
          `${this.#options.wordClass}`
        );

        wordArray.forEach((word) => {
          wordDiv.append(word);
        });

        this.words.push(wordDiv);
        this.#rawWords.push(wordDiv, " ");
        startIndex = index;
      }
    });
  }

  #splitLines() {
    let startIndex = 0;
    let lineArrays = [];

    const appendToLineArray = () => {
      lineArrays.forEach((lineArray) => {
        const lineDiv = this.#createElement(
          "div",
          "",
          {
            style: "position:relative; display:inline-block",
          },
          `${this.#options.globalClass}`,
          `${this.#options.lineClass}`
        );

        lineArray.forEach((lineWord) => {
          lineDiv.append(lineWord);
          lineDiv.append(" ");
        });
        this.lines.push(lineDiv);
        this.target.append(lineDiv);
      });
    };

    this.words.reduce((oldOffsetTop, word, index) => {
      const currentOffsetTop = word.offsetTop;

      if (
        (oldOffsetTop !== currentOffsetTop && oldOffsetTop !== null) ||
        index === this.words.length - 1
      ) {
        const computedIndex =
          index === this.words.length - 1 ? index + 1 : index;
        const lineArray = this.words.slice(startIndex, computedIndex);
        lineArrays.push(lineArray);
        startIndex = index;
      }

      return currentOffsetTop;
    }, null);

    appendToLineArray();
  }

  #combineAll() {
    this.words.forEach((word) => {
      this.target.append(word);
      this.target.append(" ");
    });
    this.#splitLines();
  }

  #splitStart() {
    this.#splitChars();
    this.#splitWords();
    this.#combineAll();
  }

  #getTextContent() {
    this.textContent = this.target.textContent;
  }

  #clearContent(element) {
    element.innerHTML = "";
  }

  #logError(message) {
    console.error(`${message}`, "color:red", "color:inherit");
  }

  #logAndThrowError(message) {
    if (message.includes("%c")) {
      console.error(`${message}`, "color:red", "color:inherit");
    } else {
      console.error(`${message}`);
    }
    throw "SplitTextException! ⬆️";
  }

  init(elementOrSelector) {
    if (this.#isElement(elementOrSelector)) {
      this.target = elementOrSelector;
      this.#getTextContent();
    } else {
      if (elementOrSelector !== "") {
        const element = document.querySelector(`${elementOrSelector}`);
        if (element) {
          this.target = element;
          this.#getTextContent();
          // window.addEventListener("resize", () => resizeFunction(element))
        } else {
          this.#logAndThrowError(
            `can't found %c${elementOrSelector}%c in DOM tree!`
          );
        }
      } else {
        this.#logAndThrowError(
          `selector is empty! %cplease give a valid%c selector!`
        );
      }
    }

    this.#clearContent(this.target);
    this.#splitStart();
  }
}

/*
var words = {
  init: function () {
    if (page.name === "home") {
      var delay = 0.05;
    } else {
      var delay = 0.1;
    }
    var _this = this;
    $(".words").each(function (index, el) {
      var $el = $(el);
      var words = $(el).text().split(/\s+/);
      var html = "";
      for (var i = 0; i < words.length; i++) {
        var d = i * delay;
        html =
          html +
          '<span class="wd"><span style="transition-delay:' +
          d +
          's">' +
          words[i] +
          "</span></span>";
      }
      $el.html(html);
    });
  },
  wrapWords: function (str, tmpl) {
    return str.replace(/\w+/g, tmpl || "<span>$&</span>");
  },
};
*/
