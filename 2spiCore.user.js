// ==UserScript==
// @name         2spiCore
// @version      1.1.2
// @description  d0urce Fork
// @author       2spi & d0t
// @match        https://s0urce.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=s0urce.io
// @downloadURL  https://github.com/tijasp/2spiCore/raw/refs/heads/main/d0urce-prettier.user.js
// @updateURL    https://github.com/tijasp/2spiCore/raw/refs/heads/main/d0urce-prettier.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const VERSION = "1.1.2";

    const hljsBase = "pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}";
    const hljsTemplates = {
        atom: ".hljs{color:$;}.hljs-comment,.hljs-quote{color:$;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:$}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:$}.hljs-literal{color:$}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:$}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:$}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:$}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:$}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}",
        monokai: ".hljs{color:$}.hljs-subst,.hljs-tag{color:$}.hljs-emphasis,.hljs-strong{color:$}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:$}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:$}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:$}.hljs-attribute,.hljs-symbol{color:$}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:$}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:$}.hljs-comment,.hljs-deletion,.hljs-meta{color:$}",
        deep: ".hljs{color:$}.hljs-keyword{color:$;font-style:italic}.hljs-built_in{color:$;font-style:italic}.hljs-type{color:$}.hljs-literal{color:$}.hljs-number{color:$}.hljs-regexp{color:$}.hljs-string{color:$}.hljs-subst{color:$}.hljs-symbol{color:$}.hljs-class{color:$}.hljs-function{color:$}.hljs-title{color:$;font-style:italic}.hljs-params{color:$}.hljs-comment{color:$;font-style:italic}.hljs-doctag{color:$}.hljs-meta,.hljs-meta .hljs-keyword{color:$}.hljs-meta .hljs-string{color:$}.hljs-section{color:$}.hljs-attr,.hljs-name,.hljs-tag{color:$}.hljs-attribute{color:$}.hljs-variable{color:$}.hljs-bullet{color:$}.hljs-code{color:$}.hljs-emphasis{color:$;font-style:italic}.hljs-strong{color:$;font-weight:700}.hljs-formula{color:%}.hljs-link{color:$}.hljs-quote{color:$;font-style:italic}.hljs-selector-tag{color:$}.hljs-selector-id{color:$}.hljs-selector-class{color:$;font-style:italic}.hljs-selector-attr,.hljs-selector-pseudo{color:$;font-style:italic}.hljs-template-tag{color:$}.hljs-template-variable{color:$}.hljs-addition{color:$;font-style:italic}.hljs-deletion{color:$;font-style:italic}",
        mythic: ".hljs{color:$;}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:$}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:$}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:$}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:$}.hljs-built_in,.hljs-symbol{color:$}.hljs-code,.hljs-comment,.hljs-formula{color:$}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:$}.hljs-subst{color:$}.hljs-section{color:$;font-weight:700}.hljs-bullet{color:$}.hljs-emphasis{color:$;font-style:italic}.hljs-strong{color:$;font-weight:700}.hljs-addition{color:$;background-color:$}.hljs-deletion{color:$;background-color:$}",
    };
    // Every theme shares this tail: terminal color variables, borders and the window title gradient
    const themeBars = c => `:root{--color-terminal:${c};--color-darkgreen:${c}2f} .window:has(img[src='icons/terminal.svg']){border-color: ${c}} #section-code{background: linear-gradient(180deg, #000000 3%, ${c}40 123%)} #themes{border: 1px solid ${c}} .target-bar{outline: 1px solid ${c} !important}`;
    const themeTail = (c, dark) => `${themeBars(c)} .window-title.svelte-1hjm43z {background: linear-gradient(200deg, ${c} 0%, ${dark} 100%)}`;
    // "%" is a secondary color (only The Deep's formula color differs, in Light Mode)
    const makeTheme = (template, c, dark, c2 = c) => (template ? hljsBase + hljsTemplates[template].replaceAll("$", c).replace("%", c2) : "") + themeTail(c, dark);
    const themes = {
        "No Theme": makeTheme(null, "#85ff49", "#427f24"),
        "Atom One": makeTheme("atom", "#b270ff", "#59387f"),
        "Monokai": makeTheme("monokai", "#ff3838", "#7f1c1c"),
        "The Deep": makeTheme("deep", "#3d8566", "#1e4233"),
        "Light Mode": makeTheme("deep", "#ffffff", "#7f7f7f", "#c792ea"),
        "Mythic Myer": makeTheme("mythic", "#05a8ff", "#02547f"),
        "Ethereal Enjoyer": makeTheme("monokai", "#ffb74e", "#7f5b27").replace(":root", themeBars("#ffb74e") + ":root"),
    };

    class WindowManager {
        // name: [desktop icon class prefix, title icon name]
        #windows = Object.fromEntries(Object.entries({
            computer: ["Computer", "computer"], inventory: ["Inventory", "inventory"], target_list: ["Target-List", "targetList"],
            terminal: ["Terminal", "terminal"], season_pass: ["Season-Pass", "seasonpass"], friends: ["Friends", "friends"], log: ["Log", "log"],
            item_seller: ["Item-Seller", "itemSeller"], premium: ["Premium", "premium"], shop: ["Shop", "shop"], leaderboard: ["Leaderboard", "leaderboard"],
            country_wars: ["Country-Wars", "countryWars"], task_manager: ["Task-Manager", "taskManager"], upgrader: ["Upgrader", "upgrader"],
            spotify: ["Spotify", "spotify"], vpn: ["VPN", "vpn"], filament: ["Filament", "filament"], printer: ["\\33 D-Printer", "printer"],
            chat: ["Global-Chat", "chat"], agents: ["Agents", "agents"], mail: ["Mail", "mail"], settings: [undefined, "settings"],
        }).map(([name, [className, iconName]]) => [name, { className, iconName }]));

        #find = data => document.querySelector(`.window-title > img[src='icons/${data.iconName}.svg']`)?.parentNode.parentNode;
        getWindowsNames = () => Object.keys(this.#windows);
        isValidWindow = (name) => !!this.#windows[name];
        isWindowOpen = (name) => !!this.#windows[name] && !!this.#find(this.#windows[name]);
        getWindow = (name) => this.#windows[name] && this.#find(this.#windows[name]);

        openWindow = async (name, openInSilent = false) => {
            const data = this.#windows[name];
            if (!data) return;
            if (openInSilent && !player.configuration.openInSilent.includes(data))
                player.configuration.openInSilent.push(data)
            document.querySelector(name === "settings" ? "button.topbar-clickable" : `.${data.className}-Desktop-Icon`)?.click();
            await sleep(300);
            return this.#find(data);
        }

        closeWindow = (name, onlyIfSilent = false) => {
            const data = this.#windows[name];
            if (!data) return;
            player.configuration.openInSilent = player.configuration.openInSilent.filter(e => e.name !== data.name);
            const windowToClose = this.#find(data);
            if (windowToClose && (!onlyIfSilent || windowToClose.classList.contains("openInSilent")))
                windowToClose.querySelector(".window-close")?.click();
        }
    }

    const windowManager = new WindowManager();

    class Component {
        prepend;
        element;
        constructor(type, options) {
            this.prepend = options.prepend;
            const element = document.createElement(type);
            if (options.classList)
                element.classList.add(...options.classList);
            const { children, style, classList, ...propertiesToAssign } = options;
            Object.assign(element, propertiesToAssign);
            Object.assign(element.style, options.style);
            options.children?.filter(child => !!child).forEach(child => child.prepend ? element.prepend(child.element) : element.append(child.element))
            this.element = element;
            return this;
        }
    }

    const removeContextMenu = (removeSelection) => {
        document.querySelector(".context-menu-container")?.remove();
        document.querySelectorAll(".item-selected").forEach(item => {
            item.style.outline = null;
            item.classList.remove("item-selected")
        })
        if (removeSelection)
            player.selectedItems = [];
    }

    class Popup {
        #popup;
        #dimensions = { width: 150, height: 0 };
        #pointer;
        constructor(pointer) {
            this.#pointer = pointer;
            const section = (name, order, style) => new Component("div", {
                classList: ["context-menu", "context-menu-" + name],
                style: { color: "white", padding: "7px", order, ...style, display: "none" }
            });
            this.#popup = new Component("div", {
                classList: ["context-menu", "context-menu-container"],
                style: {
                    position: "absolute", width: `${this.#dimensions.width}px`,
                    backgroundColor: "#000000E6", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "5px", zIndex: "1000", padding: "5px",
                    boxShadow: "5px 5px 15px 5px #000000", border: "1px solid #ffffff66"
                },
                children: [
                    section("title", 0, { fontSize: "16px", fontWeight: 600, borderBottom: "1px solid var(--color-lightgrey)" }),
                    section("footer", 1, { color: "var(--color-lightgrey)", fontSize: "10px", borderTop: "1px solid var(--color-lightgrey)" })
                ]
            }).element;
            return this;
        }

        #getPosition = (pointer, dimensions) => {
            const finalPosition = { ...pointer };
            const offset = (pos, size, max) => pos > max - (size + 20) ? -(size + 10) : 10;
            finalPosition.clientY += offset(pointer.clientY, dimensions.height, document.body.clientHeight);
            finalPosition.clientX += offset(pointer.clientX, dimensions.width, document.body.clientWidth);
            return finalPosition;
        }

        #setSection(name, text) {
            const section = this.#popup.querySelector(".context-menu-" + name);
            section.innerText = text;
            section.style.display = "flex";
            return this;
        }
        setTitle = (text) => this.#setSection("title", text);
        setFooter = (text) => this.#setSection("footer", text);

        addAction(text, action, option = { isDangerous: false, selectionLimit: 0 }) {
            this.#popup.appendChild(new Component("div", {
                classList: [
                    "context-menu", "context-menu-option",
                    "context-menu-option-" + (this.#dimensions.height / 40 + 1),
                    "context-menu-option-limit-" + option.selectionLimit,
                ],
                innerText: text,
                style: { width: "100%", borderRadius: "4px", padding: "5px", cursor: "pointer", color: option.isDangerous ? "var(--color-red)" : "#ffffffe6" },
                onmouseenter: (e) => e.target.style.backgroundColor = "var(--color-midgreen)",
                onmouseleave: (e) => e.target.style.backgroundColor = "unset",
                onclick: async (e) => {
                    removeContextMenu();
                    if (action)
                        await action(e);
                    player.selectedItems = [];
                },
            }).element);
            this.#dimensions.height += 40;
            return this;
        }

        create() {
            const position = this.#getPosition(this.#pointer, this.#dimensions);
            this.#popup.style.top = `${position.clientY}px`;
            this.#popup.style.left = `${position.clientX}px`;
            document.body.appendChild(this.#popup);
        }
    }

    var divs = {};

    const rarities = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "ethereal"];

    const lootRarity = [
        { name: "common", color: "linear-gradient(211deg, #585d66 0%, #7d848f 100%)" },
        { name: "uncommon", color: "linear-gradient(211deg, #007c37 0%, #83b200 100%)" },
        { name: "rare", color: "linear-gradient(211deg, #00427c 0%, #0092ed 100%)" },
        { name: "epic", color: "linear-gradient(211deg, #5c045a 0%, #a90052 100%)" },
        { name: "legendary", color: "linear-gradient(112deg, #a95300 4%, #ff9605 34%, #a95300 66%, #ff9605 100%)" },
        { name: "mythic", color: "linear-gradient(112deg, #40f5ff 4%, #05a8ff 34%, #40f5ff 66%, #05a8ff 100%)" },
        { name: "ethereal", color: "linear-gradient(112deg, #ffb74e 4%, #ffe6a2 34%, #ffb74e 66%, #ffe6a2 100%)" },
    ];

    // "var(--color-SSS)": "ethereal", ... "var(--color-D)": "common"
    const raritiesVariables = Object.fromEntries(["SSS", "SS", "S", "A", "B", "C", "D"].map((grade, i) => [`var(--color-${grade})`, rarities[6 - i]]));
    const lootButtons = { take: "button > img[src='icons/inventory.svg']", sell: "button > img[src='icons/btc.svg']", shred: "button > img[src='icons/filament.svg']" };

    const staffRoles = ["JMOD", "MOD", "ADMIN"];
    let evilStaffFeaturesActivated = false;

    const capitalize = text => text[0].toUpperCase() + text.slice(1).toLowerCase();

    const defaultColors = { windowBorder: "#91aabd3b", windowTabLight: "#1f1e23", windowTabDark: "#131317" };

    // { rarity: { cpu, gpu, psu, firewall, other } } with every type of a rarity set to value(rarityIndex)
    const perRarity = (list, value) => Object.fromEntries(list.map((rarity, i) =>
        [rarity, Object.fromEntries(["cpu", "gpu", "psu", "firewall", "other"].map(type => [type, value(i)]))]));

    let player = {
        username: null,
        hacksInProgress: [], currentlyHacking: null, lastHacked: null,
        configuration: {
            openInSilent: [],
            displayCustomFilament: "ethereal",
            desktopIconColor: "#ffffff",
            desktopIconSize: "",
            backgroundImage: null,
            currentTheme: Object.keys(themes)[0],
            windowColors: defaultColors,
        },
        input: { isShiftDown: false },
        staffRole: "",
        selectedItems: [],
        autoloot: perRarity(rarities.slice(0, -1), () => "take"),
        tradePricing: perRarity(rarities, (i) => [0.01, 0.03, 0.1, 0.3, 1.5, 4.5, 45][i]),

        btcDailyStats: {
            startBalance: 0,
            date: "",
        },

        drops: {
            npc: {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
                mythic: 0,
                total: 0
            },
            components : {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
                mythic: 0,
                total: 0
            },
            filaments : {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
                mythic: 0,
                total: 0
            }
        },
    };

    const stats = {
        cpu: [
            { hack: [8, 18], trueDam: [0, 0], pen: [0, 0], chance: [0, 0], dam: [0, 0] },
            { hack: [18.5, 33.5], trueDam: [0, 10], pen: [0, 5], chance: [0, 2.5], dam: [1, 5] },
            { hack: [34, 54], trueDam: [0, 20], pen: [0, 15], chance: [2.5, 3.25], dam: [5, 7.5] },
            { hack: [55, 64.25], trueDam: [0, 30], pen: [0, 20], chance: [4, 6.25], dam: [8.25, 15] },
            { hack: [68.75, 84.75], trueDam: [0, 40], pen: [13, 25], chance: [6.5, 7.5], dam: [17, 25] },
            { hack: [91, 105], trueDam: [43, 50], pen: [19.5, 30], chance: [8.25, 10], dam: [19.5, 30] },
            { hack: [125.5, 135.5], trueDam: [55, 60], pen: [32.5, 35], chance: [11.25, 12.5], dam: [32.5, 35] }
        ],
        firewall: [
            { hp: [22, 62], rd: [0, 0], regen: [0, 0], medium: [0, 0], long: [0, 0] },
            { hp: [64, 114], rd: [0, 7.5], regen: [0, 2.5], medium: [0, 0], long: [0, 0] },
            { hp: [116, 166], rd: [0, 10], regen: [0, 5], medium: [0, 30], long: [0, 0] },
            { hp: [172, 217], rd: [0, 12.5], regen: [0, 7.5], medium: [22, 40], long: [0, 25] },
            { hp: [234, 269], rd: [0, 15], regen: [8, 10], medium: [34, 0], long: [22, 30] },
            { hp: [285, 320], rd: [11.5, 15], regen: [10.75, 12.5], medium: [65, 47.5], long: [28, 35] },
            { hp: [372, 397], rd: [16.25, 17.5], regen: [13.75, 15], medium: [80, 70], long: [37.5, 45] }
        ],
        gpu: [
            { idle: [0.000010, 0.000014], bart: [0, 0], crip: [0, 0], },
            { idle: [0.000011, 0.000024], bart: [0, 10], crip: [2.5, 10], },
            { idle: [0.000016, 0.000033], bart: [0, 12.5], crip: [2.5, 12.5], },
            { idle: [0.0000223, 0.000043], bart: [0, 15], crip: [6, 15], },
            { idle: [0.0000348, 0.000054], bart: [0, 20], crip: [10, 20], },
            { idle: [0.0000516, 0.000074], bart: [16.25, 25], crip: [16.25, 25], },
            { idle: [0.000077, 0.000094], bart: [22.5, 30], crip: [22.5, 30], }
        ],
        psu: [
            { boost: [1, 5], },
            { boost: [5, 10], },
            { boost: [10, 15], },
            { boost: [16, 25], },
            { boost: [27, 35], },
            { boost: [36.5, 40], },
            { boost: [50, 55], },
        ],
        port: [
            { hp: 1000 + 3 * 60, rd: 0 },
            { hp: 1000 + 3 * 114, rd: 3 * 0.075 },
            { hp: 1000 + 3 * 166, rd: 3 * 0.1 },
            { hp: 1000 + 3 * 217, rd: 3 * 0.125 },
            { hp: 1000 + 3 * 269, rd: 3 * 0.15 },
            { hp: 1000 + 3 * 320, rd: 3 * 0.15 },
            { hp: 1000 + 3 * 397, rd: 3 * 0.175 }
        ],
        cputerm: [
            3, 3.5, 4, 4.25, 4.75, 5, 5.5
        ],
        fireterm: [
            12, 14, 16, 17, 19, 20, 22
        ],
        gpu_term: [
            0.0000042 * 0.6, 0.0000042 * 0.7, 0.0000042 * 0.8, 0.0000042 * 0.85, 0.0000042 * 0.95, 0.0000042, 0.0000042 * 1.1
        ],
        psu_term: [
            1.2, 1.4, 1.6, 1.7, 1.9, 2, 2.2
        ],
        rarityMap: { D: 0, C: 1, B: 2, A: 3, S: 4, SS: 5, SSS: 6 },
        cpu_dPM: [
            [1.0, 1.1, 1.2, 1.29, 1.39, 1.49, 1.59, 1.68, 1.78, 1.88, 1.97, 2.07, 2.17, 2.26, 2.36, 2.46, 2.55, 2.65, 2.74, 2.84, 2.93, 3.03, 3.12, 3.22, 3.31, 3.41, 3.5, 3.59, 3.69, 3.78, 3.87, 3.97, 4.06, 4.15, 4.25, 4.34, 4.43, 4.52, 4.61, 4.7, 4.79, 4.89, 4.98, 5.07, 5.16, 5.25, 5.34, 5.43, 5.52, 5.61, 5.7, 5.79, 5.88, 5.97, 6.06, 6.14, 6.23, 6.32, 6.41, 6.5, 6.59, 6.67, 6.76, 6.85, 6.93, 7.02, 7.11, 7.2, 7.29, 7.37, 7.46, 7.55, 7.63, 7.72, 7.8, 7.89, 7.98, 8.07, 8.15, 8.24, 8.32, 8.41, 8.49, 8.58, 8.66, 8.75, 8.83, 8.92, 9.0, 9.08, 9.17, 9.25, 9.34, 9.42, 9.5, 9.59, 9.67, 9.75, 9.83, 9.92, 10.0],
            [1.11, 2.53, 2.86, 3.09, 3.27, 3.42, 3.55, 3.67, 3.78, 3.87, 3.97, 4.05, 4.13, 4.21, 4.29, 4.36, 4.42, 4.49, 4.55, 4.62, 4.68, 4.73, 4.79, 4.84, 4.9, 4.95, 5.0, 5.05, 5.1, 5.15, 5.19, 5.24, 5.28, 5.33, 5.37, 5.42, 5.46, 5.5, 5.55, 5.59, 5.63, 5.67, 5.71, 5.75, 5.79, 5.83, 5.87, 5.91, 5.95, 5.99, 6.03, 6.07, 6.11, 6.15, 6.19, 6.23, 6.27, 6.3, 6.34, 6.38, 6.42, 6.46, 6.5, 6.54, 6.58, 6.62, 6.67, 6.71, 6.75, 6.79, 6.83, 6.88, 6.92, 6.97, 7.01, 7.06, 7.1, 7.15, 7.2, 7.25, 7.3, 7.35, 7.4, 7.45, 7.51, 7.56, 7.62, 7.69, 7.75, 7.81, 7.89, 7.96, 8.04, 8.12, 8.21, 8.32, 8.43, 8.57, 8.74, 8.98, 9.79],
            [1.1, 2.69, 3.08, 3.35, 3.55, 3.73, 3.88, 4.01, 4.13, 4.23, 4.33, 4.43, 4.51, 4.6, 4.67, 4.75, 4.82, 4.88, 4.95, 5.01, 5.07, 5.13, 5.19, 5.24, 5.3, 5.35, 5.4, 5.45, 5.5, 5.54, 5.59, 5.64, 5.68, 5.73, 5.77, 5.81, 5.86, 5.9, 5.94, 5.98, 6.02, 6.06, 6.1, 6.14, 6.18, 6.22, 6.26, 6.3, 6.34, 6.38, 6.42, 6.46, 6.49, 6.53, 6.57, 6.61, 6.65, 6.68, 6.72, 6.76, 6.8, 6.84, 6.87, 6.91, 6.95, 6.99, 7.03, 7.07, 7.11, 7.14, 7.18, 7.22, 7.26, 7.31, 7.35, 7.39, 7.43, 7.48, 7.52, 7.56, 7.61, 7.66, 7.71, 7.75, 7.8, 7.86, 7.91, 7.97, 8.03, 8.09, 8.16, 8.23, 8.3, 8.38, 8.46, 8.56, 8.67, 8.8, 8.95, 9.18, 9.89],
            [1.13, 2.56, 2.91, 3.17, 3.38, 3.56, 3.72, 3.86, 3.99, 4.12, 4.23, 4.34, 4.44, 4.53, 4.62, 4.71, 4.79, 4.88, 4.95, 5.03, 5.1, 5.17, 5.24, 5.3, 5.37, 5.43, 5.49, 5.54, 5.6, 5.66, 5.71, 5.76, 5.82, 5.87, 5.91, 5.96, 6.01, 6.06, 6.1, 6.15, 6.19, 6.24, 6.28, 6.32, 6.36, 6.4, 6.45, 6.49, 6.53, 6.57, 6.61, 6.64, 6.68, 6.72, 6.76, 6.8, 6.84, 6.88, 6.92, 6.96, 7.0, 7.04, 7.08, 7.12, 7.16, 7.2, 7.24, 7.28, 7.32, 7.37, 7.41, 7.45, 7.5, 7.54, 7.59, 7.64, 7.68, 7.73, 7.78, 7.83, 7.88, 7.93, 7.98, 8.03, 8.09, 8.14, 8.2, 8.26, 8.32, 8.38, 8.44, 8.51, 8.58, 8.65, 8.73, 8.82, 8.91, 9.02, 9.15, 9.31, 9.86],
            [1.23, 2.65, 3.01, 3.25, 3.45, 3.61, 3.75, 3.88, 4.0, 4.11, 4.21, 4.31, 4.4, 4.48, 4.56, 4.64, 4.72, 4.79, 4.86, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.29, 5.35, 5.4, 5.46, 5.51, 5.57, 5.62, 5.67, 5.72, 5.77, 5.82, 5.87, 5.92, 5.96, 6.01, 6.06, 6.11, 6.15, 6.2, 6.25, 6.29, 6.34, 6.38, 6.43, 6.47, 6.52, 6.56, 6.6, 6.65, 6.69, 6.74, 6.78, 6.82, 6.87, 6.91, 6.95, 6.99, 7.03, 7.08, 7.12, 7.16, 7.2, 7.24, 7.28, 7.33, 7.37, 7.41, 7.45, 7.5, 7.54, 7.58, 7.63, 7.67, 7.72, 7.76, 7.81, 7.86, 7.9, 7.95, 8.0, 8.06, 8.11, 8.16, 8.22, 8.28, 8.34, 8.4, 8.47, 8.54, 8.62, 8.7, 8.8, 8.91, 9.04, 9.23, 9.86],
            [1.24, 2.48, 2.76, 2.96, 3.12, 3.25, 3.37, 3.47, 3.57, 3.65, 3.74, 3.82, 3.89, 3.96, 4.03, 4.1, 4.16, 4.22, 4.28, 4.34, 4.4, 4.45, 4.51, 4.56, 4.62, 4.67, 4.72, 4.77, 4.82, 4.87, 4.92, 4.96, 5.01, 5.05, 5.1, 5.15, 5.19, 5.24, 5.29, 5.33, 5.38, 5.42, 5.47, 5.51, 5.56, 5.6, 5.65, 5.69, 5.74, 5.78, 5.83, 5.87, 5.91, 5.96, 6.0, 6.05, 6.09, 6.13, 6.18, 6.22, 6.26, 6.31, 6.35, 6.4, 6.44, 6.49, 6.53, 6.57, 6.62, 6.66, 6.71, 6.76, 6.8, 6.85, 6.89, 6.94, 6.99, 7.04, 7.09, 7.14, 7.19, 7.24, 7.29, 7.35, 7.4, 7.46, 7.52, 7.58, 7.64, 7.71, 7.78, 7.85, 7.93, 8.02, 8.11, 8.2, 8.31, 8.44, 8.6, 8.83, 9.69],
            [1.24, 2.52, 2.8, 3.0, 3.16, 3.29, 3.41, 3.51, 3.6, 3.69, 3.77, 3.84, 3.91, 3.98, 4.05, 4.11, 4.16, 4.22, 4.28, 4.33, 4.38, 4.43, 4.48, 4.53, 4.58, 4.63, 4.67, 4.72, 4.76, 4.81, 4.85, 4.89, 4.93, 4.98, 5.02, 5.06, 5.1, 5.14, 5.18, 5.22, 5.26, 5.3, 5.33, 5.37, 5.41, 5.45, 5.49, 5.52, 5.56, 5.6, 5.64, 5.68, 5.71, 5.75, 5.79, 5.83, 5.86, 5.9, 5.94, 5.98, 6.02, 6.06, 6.1, 6.13, 6.17, 6.21, 6.25, 6.29, 6.33, 6.38, 6.42, 6.46, 6.5, 6.55, 6.59, 6.63, 6.68, 6.73, 6.77, 6.82, 6.87, 6.92, 6.98, 7.03, 7.08, 7.14, 7.2, 7.26, 7.32, 7.39, 7.46, 7.54, 7.62, 7.71, 7.81, 7.91, 8.04, 8.18, 8.36, 8.62, 9.62]
        ],
        // Mythic GPU distribution fixed as of 8/21/2024 
        gpu_dPM: [
            [1.252e-05, 1.256e-05, 1.26e-05, 1.264e-05, 1.268e-05, 1.272e-05, 1.276e-05, 1.28e-05, 1.284e-05, 1.288e-05, 1.292e-05, 1.296e-05, 1.3e-05, 1.304e-05, 1.308e-05, 1.312e-05, 1.316e-05, 1.32e-05, 1.324e-05, 1.328e-05, 1.332e-05, 1.336e-05, 1.34e-05, 1.344e-05, 1.348e-05, 1.352e-05, 1.356e-05, 1.36e-05, 1.364e-05, 1.368e-05, 1.372e-05, 1.376e-05, 1.38e-05, 1.384e-05, 1.388e-05, 1.392e-05, 1.396e-05, 1.4e-05, 1.404e-05, 1.408e-05, 1.412e-05, 1.416e-05, 1.42e-05, 1.424e-05, 1.428e-05, 1.432e-05, 1.436e-05, 1.44e-05, 1.444e-05, 1.448e-05, 1.452e-05, 1.456e-05, 1.46e-05, 1.464e-05, 1.468e-05, 1.472e-05, 1.476e-05, 1.48e-05, 1.484e-05, 1.488e-05, 1.492e-05, 1.496e-05, 1.5e-05, 1.504e-05, 1.508e-05, 1.512e-05, 1.516e-05, 1.52e-05, 1.524e-05, 1.528e-05, 1.532e-05, 1.536e-05, 1.54e-05, 1.544e-05, 1.548e-05, 1.552e-05, 1.556e-05, 1.56e-05, 1.564e-05, 1.568e-05, 1.572e-05, 1.576e-05, 1.58e-05, 1.584e-05, 1.588e-05, 1.592e-05, 1.596e-05, 1.6e-05, 1.604e-05, 1.608e-05, 1.612e-05, 1.616e-05, 1.62e-05, 1.624e-05, 1.628e-05, 1.632e-05, 1.636e-05, 1.64e-05, 1.644e-05, 1.648e-05, 1.652e-05],
            [1.394e-05, 1.407e-05, 1.42e-05, 1.433e-05, 1.446e-05, 1.459e-05, 1.472e-05, 1.485e-05, 1.498e-05, 1.511e-05, 1.524e-05, 1.537e-05, 1.55e-05, 1.563e-05, 1.575e-05, 1.588e-05, 1.602e-05, 1.614e-05, 1.627e-05, 1.641e-05, 1.654e-05, 1.667e-05, 1.68e-05, 1.693e-05, 1.705e-05, 1.718e-05, 1.731e-05, 1.744e-05, 1.757e-05, 1.771e-05, 1.783e-05, 1.797e-05, 1.81e-05, 1.823e-05, 1.836e-05, 1.849e-05, 1.862e-05, 1.875e-05, 1.888e-05, 1.9e-05, 1.913e-05, 1.926e-05, 1.939e-05, 1.952e-05, 1.965e-05, 1.978e-05, 1.991e-05, 2.004e-05, 2.017e-05, 2.03e-05, 2.043e-05, 2.057e-05, 2.07e-05, 2.083e-05, 2.096e-05, 2.109e-05, 2.122e-05, 2.135e-05, 2.147e-05, 2.161e-05, 2.173e-05, 2.186e-05, 2.199e-05, 2.212e-05, 2.225e-05, 2.238e-05, 2.251e-05, 2.264e-05, 2.277e-05, 2.29e-05, 2.303e-05, 2.316e-05, 2.329e-05, 2.342e-05, 2.355e-05, 2.368e-05, 2.381e-05, 2.394e-05, 2.407e-05, 2.42e-05, 2.433e-05, 2.447e-05, 2.46e-05, 2.473e-05, 2.486e-05, 2.499e-05, 2.511e-05, 2.524e-05, 2.537e-05, 2.55e-05, 2.563e-05, 2.576e-05, 2.589e-05, 2.602e-05, 2.615e-05, 2.628e-05, 2.641e-05, 2.654e-05, 2.668e-05, 2.681e-05, 2.694e-05],
            [1.936e-05, 1.953e-05, 1.97e-05, 1.987e-05, 2.004e-05, 2.021e-05, 2.038e-05, 2.054e-05, 2.072e-05, 2.088e-05, 2.105e-05, 2.122e-05, 2.14e-05, 2.157e-05, 2.174e-05, 2.191e-05, 2.208e-05, 2.225e-05, 2.242e-05, 2.26e-05, 2.276e-05, 2.293e-05, 2.311e-05, 2.328e-05, 2.344e-05, 2.362e-05, 2.379e-05, 2.396e-05, 2.413e-05, 2.43e-05, 2.447e-05, 2.464e-05, 2.481e-05, 2.498e-05, 2.514e-05, 2.531e-05, 2.548e-05, 2.566e-05, 2.583e-05, 2.599e-05, 2.617e-05, 2.633e-05, 2.65e-05, 2.667e-05, 2.684e-05, 2.701e-05, 2.718e-05, 2.735e-05, 2.752e-05, 2.768e-05, 2.785e-05, 2.802e-05, 2.819e-05, 2.836e-05, 2.853e-05, 2.87e-05, 2.887e-05, 2.904e-05, 2.921e-05, 2.939e-05, 2.955e-05, 2.972e-05, 2.989e-05, 3.006e-05, 3.023e-05, 3.04e-05, 3.057e-05, 3.074e-05, 3.091e-05, 3.108e-05, 3.125e-05, 3.142e-05, 3.159e-05, 3.176e-05, 3.193e-05, 3.21e-05, 3.227e-05, 3.244e-05, 3.261e-05, 3.278e-05, 3.295e-05, 3.312e-05, 3.329e-05, 3.346e-05, 3.363e-05, 3.38e-05, 3.397e-05, 3.414e-05, 3.431e-05, 3.448e-05, 3.466e-05, 3.483e-05, 3.499e-05, 3.517e-05, 3.534e-05, 3.551e-05, 3.568e-05, 3.585e-05, 3.602e-05, 3.619e-05, 3.636e-05],
            [2.587e-05, 2.608e-05, 2.628e-05, 2.65e-05, 2.67e-05, 2.691e-05, 2.711e-05, 2.732e-05, 2.753e-05, 2.773e-05, 2.794e-05, 2.814e-05, 2.835e-05, 2.856e-05, 2.877e-05, 2.897e-05, 2.918e-05, 2.938e-05, 2.959e-05, 2.979e-05, 3e-05, 3.02e-05, 3.041e-05, 3.062e-05, 3.083e-05, 3.103e-05, 3.124e-05, 3.144e-05, 3.165e-05, 3.185e-05, 3.206e-05, 3.227e-05, 3.248e-05, 3.269e-05, 3.289e-05, 3.31e-05, 3.331e-05, 3.351e-05, 3.372e-05, 3.393e-05, 3.414e-05, 3.435e-05, 3.456e-05, 3.476e-05, 3.497e-05, 3.518e-05, 3.538e-05, 3.559e-05, 3.58e-05, 3.6e-05, 3.621e-05, 3.642e-05, 3.663e-05, 3.683e-05, 3.704e-05, 3.725e-05, 3.745e-05, 3.766e-05, 3.787e-05, 3.807e-05, 3.828e-05, 3.849e-05, 3.869e-05, 3.89e-05, 3.91e-05, 3.931e-05, 3.952e-05, 3.973e-05, 3.993e-05, 4.014e-05, 4.035e-05, 4.055e-05, 4.076e-05, 4.096e-05, 4.117e-05, 4.138e-05, 4.159e-05, 4.18e-05, 4.201e-05, 4.221e-05, 4.242e-05, 4.263e-05, 4.283e-05, 4.304e-05, 4.325e-05, 4.346e-05, 4.366e-05, 4.387e-05, 4.408e-05, 4.428e-05, 4.449e-05, 4.47e-05, 4.491e-05, 4.511e-05, 4.532e-05, 4.553e-05, 4.574e-05, 4.594e-05, 4.615e-05, 4.636e-05, 4.657e-05],
            [4.119e-05, 4.135e-05, 4.153e-05, 4.17e-05, 4.186e-05, 4.203e-05, 4.22e-05, 4.237e-05, 4.254e-05, 4.271e-05, 4.287e-05, 4.304e-05, 4.321e-05, 4.338e-05, 4.355e-05, 4.371e-05, 4.388e-05, 4.405e-05, 4.422e-05, 4.439e-05, 4.455e-05, 4.472e-05, 4.489e-05, 4.506e-05, 4.522e-05, 4.539e-05, 4.556e-05, 4.573e-05, 4.589e-05, 4.606e-05, 4.623e-05, 4.64e-05, 4.656e-05, 4.673e-05, 4.69e-05, 4.707e-05, 4.724e-05, 4.74e-05, 4.757e-05, 4.774e-05, 4.791e-05, 4.807e-05, 4.824e-05, 4.841e-05, 4.858e-05, 4.875e-05, 4.892e-05, 4.909e-05, 4.925e-05, 4.942e-05, 4.959e-05, 4.976e-05, 4.993e-05, 5.01e-05, 5.027e-05, 5.043e-05, 5.06e-05, 5.077e-05, 5.094e-05, 5.111e-05, 5.128e-05, 5.144e-05, 5.161e-05, 5.178e-05, 5.195e-05, 5.211e-05, 5.228e-05, 5.245e-05, 5.262e-05, 5.279e-05, 5.296e-05, 5.313e-05, 5.329e-05, 5.346e-05, 5.363e-05, 5.379e-05, 5.396e-05, 5.413e-05, 5.43e-05, 5.446e-05, 5.463e-05, 5.48e-05, 5.497e-05, 5.513e-05, 5.53e-05, 5.547e-05, 5.564e-05, 5.581e-05, 5.598e-05, 5.614e-05, 5.631e-05, 5.647e-05, 5.664e-05, 5.681e-05, 5.697e-05, 5.714e-05, 5.731e-05, 5.748e-05, 5.765e-05, 5.782e-05, 5.799e-05],
            [5.580e-05, 5.603e-05, 5.625e-05, 5.648e-05, 5.671e-05, 5.693e-05, 5.716e-05, 5.738e-05, 5.761e-05, 5.784e-05, 5.806e-05, 5.829e-05, 5.852e-05, 5.874e-05, 5.897e-05, 5.919e-05, 5.942e-05, 5.965e-05, 5.987e-05, 6.010e-05, 6.033e-05, 6.055e-05, 6.078e-05, 6.100e-05, 6.123e-05, 6.146e-05, 6.168e-05, 6.191e-05, 6.214e-05, 6.236e-05, 6.259e-05, 6.281e-05, 6.304e-05, 6.327e-05, 6.349e-05, 6.372e-05, 6.395e-05, 6.417e-05, 6.440e-05, 6.462e-05, 6.485e-05, 6.508e-05, 6.530e-05, 6.553e-05, 6.576e-05, 6.598e-05, 6.621e-05, 6.643e-05, 6.666e-05, 6.689e-05, 6.711e-05, 6.734e-05, 6.757e-05, 6.779e-05, 6.802e-05, 6.824e-05, 6.847e-05, 6.870e-05, 6.892e-05, 6.915e-05, 6.938e-05, 6.960e-05, 6.983e-05, 7.005e-05, 7.028e-05, 7.051e-05, 7.073e-05, 7.096e-05, 7.119e-05, 7.141e-05, 7.164e-05, 7.186e-05, 7.209e-05, 7.232e-05, 7.254e-05, 7.277e-05, 7.300e-05, 7.322e-05, 7.345e-05, 7.367e-05, 7.390e-05, 7.413e-05, 7.435e-05, 7.458e-05, 7.481e-05, 7.503e-05, 7.526e-05, 7.548e-05, 7.571e-05, 7.594e-05, 7.616e-05, 7.639e-05, 7.662e-05, 7.684e-05, 7.707e-05, 7.729e-05, 7.752e-05, 7.775e-05, 7.797e-05, 7.820e-05],
            [8.162e-05, 8.179e-05, 8.196e-05, 8.213e-05, 8.23e-05, 8.247e-05, 8.264e-05, 8.281e-05, 8.298e-05, 8.315e-05, 8.332e-05, 8.349e-05, 8.366e-05, 8.383e-05, 8.4e-05, 8.418e-05, 8.434e-05, 8.451e-05, 8.468e-05, 8.485e-05, 8.502e-05, 8.519e-05, 8.537e-05, 8.553e-05, 8.57e-05, 8.587e-05, 8.604e-05, 8.621e-05, 8.638e-05, 8.655e-05, 8.671e-05, 8.689e-05, 8.706e-05, 8.723e-05, 8.74e-05, 8.757e-05, 8.774e-05, 8.791e-05, 8.808e-05, 8.824e-05, 8.841e-05, 8.858e-05, 8.875e-05, 8.892e-05, 8.909e-05, 8.926e-05, 8.943e-05, 8.96e-05, 8.977e-05, 8.994e-05, 9.011e-05, 9.028e-05, 9.045e-05, 9.062e-05, 9.079e-05, 9.096e-05, 9.113e-05, 9.13e-05, 9.147e-05, 9.164e-05, 9.181e-05, 9.198e-05, 9.215e-05, 9.232e-05, 9.249e-05, 9.267e-05, 9.284e-05, 9.301e-05, 9.318e-05, 9.335e-05, 9.352e-05, 9.369e-05, 9.385e-05, 9.403e-05, 9.42e-05, 9.436e-05, 9.454e-05, 9.47e-05, 9.487e-05, 9.504e-05, 9.521e-05, 9.539e-05, 9.556e-05, 9.573e-05, 9.59e-05, 9.607e-05, 9.624e-05, 9.641e-05, 9.658e-05, 9.675e-05, 9.692e-05, 9.709e-05, 9.726e-05, 9.744e-05, 9.76e-05, 9.777e-05, 9.794e-05, 9.812e-05, 9.829e-05, 9.845e-05, 9.862e-05]
        ],
        psu_dPM: [
            1.0, 1.09, 1.18, 1.27, 1.36, 1.45, 1.54, 1.63, 1.72, 1.81, 1.9, 1.99, 2.08, 2.17, 2.26, 2.36, 2.45, 2.54, 2.63, 2.72, 2.81, 2.9, 2.99, 3.08, 3.17, 3.25, 3.34, 3.43, 3.52, 3.61, 3.7, 3.79, 3.88, 3.97, 4.06, 4.15, 4.24, 4.33, 4.42, 4.51, 4.6, 4.69, 4.78, 4.87, 4.96, 5.05, 5.14, 5.23, 5.32, 5.41, 5.5, 5.59, 5.68, 5.77, 5.86, 5.95, 6.04, 6.13, 6.22, 6.31, 6.4, 6.49, 6.58, 6.67, 6.76, 6.85, 6.94, 7.03, 7.12, 7.21, 7.3, 7.39, 7.48, 7.57, 7.66, 7.75, 7.84, 7.93, 8.02, 8.11, 8.2, 8.29, 8.38, 8.47, 8.56, 8.65, 8.74, 8.83, 8.92, 9.01, 9.1, 9.19, 9.28, 9.37, 9.46, 9.55, 9.64, 9.73, 9.82, 9.91, 10.0
        ],
        fire_dPM: [
            [1.0, 1.09, 1.18, 1.27, 1.36, 1.45, 1.54, 1.63, 1.72, 1.81, 1.9, 1.99, 2.08, 2.17, 2.26, 2.35, 2.44, 2.53, 2.62, 2.71, 2.8, 2.89, 2.98, 3.07, 3.16, 3.25, 3.34, 3.43, 3.52, 3.61, 3.7, 3.79, 3.88, 3.96, 4.05, 4.14, 4.24, 4.33, 4.42, 4.51, 4.6, 4.69, 4.78, 4.87, 4.96, 5.05, 5.14, 5.23, 5.32, 5.4, 5.49, 5.58, 5.68, 5.76, 5.86, 5.95, 6.04, 6.13, 6.21, 6.3, 6.39, 6.48, 6.57, 6.66, 6.75, 6.84, 6.93, 7.02, 7.11, 7.2, 7.29, 7.38, 7.47, 7.56, 7.65, 7.74, 7.83, 7.92, 8.01, 8.1, 8.2, 8.29, 8.38, 8.47, 8.56, 8.64, 8.73, 8.82, 8.92, 9.01, 9.1, 9.19, 9.28, 9.37, 9.46, 9.55, 9.64, 9.73, 9.82, 9.91, 10.0],
            [1.01, 1.62, 1.84, 1.99, 2.12, 2.24, 2.34, 2.44, 2.53, 2.62, 2.7, 2.77, 2.85, 2.92, 2.99, 3.05, 3.12, 3.18, 3.24, 3.3, 3.36, 3.41, 3.47, 3.52, 3.58, 3.63, 3.68, 3.73, 3.78, 3.83, 3.88, 3.93, 3.98, 4.03, 4.08, 4.14, 4.19, 4.24, 4.29, 4.36, 4.41, 4.47, 4.52, 4.57, 4.63, 4.68, 4.73, 4.79, 4.84, 4.9, 4.95, 5.01, 5.06, 5.12, 5.17, 5.23, 5.28, 5.34, 5.4, 5.45, 5.51, 5.57, 5.63, 5.68, 5.74, 5.8, 5.86, 5.92, 5.98, 6.04, 6.1, 6.16, 6.22, 6.28, 6.34, 6.4, 6.46, 6.53, 6.59, 6.66, 6.73, 6.8, 6.87, 6.95, 7.05, 7.13, 7.21, 7.3, 7.39, 7.48, 7.58, 7.68, 7.8, 7.91, 8.04, 8.18, 8.33, 8.51, 8.72, 9.01, 9.88],
            [1.08, 1.97, 2.2, 2.37, 2.52, 2.64, 2.76, 2.86, 2.96, 3.05, 3.13, 3.21, 3.28, 3.36, 3.43, 3.49, 3.56, 3.62, 3.68, 3.74, 3.8, 3.85, 3.91, 3.96, 4.01, 4.06, 4.11, 4.16, 4.21, 4.25, 4.3, 4.35, 4.39, 4.43, 4.48, 4.52, 4.56, 4.6, 4.64, 4.69, 4.73, 4.77, 4.81, 4.85, 4.89, 4.93, 4.97, 5.01, 5.04, 5.08, 5.12, 5.16, 5.2, 5.24, 5.28, 5.32, 5.36, 5.4, 5.44, 5.48, 5.52, 5.57, 5.61, 5.65, 5.69, 5.74, 5.78, 5.83, 5.87, 5.92, 5.97, 6.02, 6.07, 6.12, 6.17, 6.22, 6.28, 6.33, 6.39, 6.45, 6.51, 6.57, 6.63, 6.69, 6.76, 6.83, 6.9, 6.97, 7.04, 7.12, 7.21, 7.3, 7.39, 7.49, 7.6, 7.73, 7.86, 8.03, 8.24, 8.53, 9.64],
            [1.18, 2.19, 2.4, 2.55, 2.68, 2.78, 2.88, 2.96, 3.04, 3.11, 3.18, 3.25, 3.31, 3.37, 3.42, 3.48, 3.53, 3.58, 3.63, 3.68, 3.73, 3.77, 3.82, 3.86, 3.9, 3.95, 3.99, 4.03, 4.07, 4.11, 4.15, 4.18, 4.22, 4.26, 4.3, 4.33, 4.37, 4.41, 4.44, 4.48, 4.52, 4.55, 4.59, 4.63, 4.67, 4.7, 4.74, 4.77, 4.81, 4.85, 4.89, 4.92, 4.96, 5.0, 5.04, 5.08, 5.12, 5.16, 5.19, 5.23, 5.28, 5.32, 5.36, 5.4, 5.45, 5.49, 5.53, 5.58, 5.62, 5.67, 5.72, 5.77, 5.82, 5.87, 5.92, 5.97, 6.02, 6.08, 6.14, 6.19, 6.25, 6.31, 6.37, 6.44, 6.5, 6.57, 6.64, 6.72, 6.79, 6.88, 6.96, 7.05, 7.15, 7.25, 7.37, 7.49, 7.64, 7.82, 8.02, 8.31, 9.64],
            [1, 1.45, 1.6, 1.71, 1.8, 1.87, 1.93, 2.0, 2.05, 2.11, 2.16, 2.21, 2.26, 2.31, 2.36, 2.41, 2.46, 2.51, 2.57, 2.62, 2.67, 2.73, 2.78, 2.84, 2.9, 2.96, 3.02, 3.08, 3.14, 3.2, 3.26, 3.32, 3.37, 3.43, 3.48, 3.53, 3.59, 3.64, 3.7, 3.75, 3.81, 3.86, 3.92, 3.98, 4.03, 4.09, 4.15, 4.21, 4.27, 4.33, 4.39, 4.45, 4.52, 4.58, 4.65, 4.72, 4.79, 4.86, 4.94, 5.01, 5.09, 5.16, 5.24, 5.32, 5.4, 5.48, 5.55, 5.62, 5.69, 5.76, 5.83, 5.9, 5.97, 6.04, 6.11, 6.19, 6.26, 6.33, 6.41, 6.49, 6.57, 6.65, 6.74, 6.82, 6.91, 7.0, 7.1, 7.19, 7.29, 7.39, 7.49, 7.6, 7.7, 7.8, 7.9, 8.01, 8.14, 8.28, 8.45, 8.69, 9.57],
            [1.08, 2.01, 2.23, 2.39, 2.51, 2.61, 2.71, 2.79, 2.86, 2.94, 3.01, 3.08, 3.15, 3.23, 3.31, 3.4, 3.48, 3.55, 3.63, 3.7, 3.77, 3.84, 3.9, 3.97, 4.03, 4.09, 4.15, 4.21, 4.27, 4.32, 4.37, 4.42, 4.46, 4.5, 4.55, 4.59, 4.63, 4.67, 4.71, 4.75, 4.78, 4.82, 4.86, 4.9, 4.94, 4.98, 5.02, 5.06, 5.1, 5.14, 5.18, 5.22, 5.26, 5.3, 5.34, 5.38, 5.42, 5.46, 5.5, 5.54, 5.59, 5.63, 5.67, 5.71, 5.75, 5.79, 5.83, 5.88, 5.92, 5.96, 6.01, 6.05, 6.1, 6.14, 6.19, 6.23, 6.28, 6.33, 6.38, 6.42, 6.48, 6.53, 6.58, 6.63, 6.69, 6.75, 6.81, 6.87, 6.93, 7.0, 7.07, 7.14, 7.22, 7.31, 7.4, 7.51, 7.63, 7.77, 7.94, 8.2, 9.19],
            [1.06, 2.32, 2.6, 2.8, 2.96, 3.09, 3.21, 3.31, 3.4, 3.49, 3.57, 3.65, 3.72, 3.79, 3.85, 3.91, 3.97, 4.03, 4.09, 4.14, 4.19, 4.24, 4.29, 4.34, 4.39, 4.43, 4.48, 4.52, 4.57, 4.61, 4.66, 4.7, 4.74, 4.78, 4.82, 4.86, 4.9, 4.94, 4.98, 5.02, 5.06, 5.1, 5.14, 5.18, 5.22, 5.26, 5.29, 5.33, 5.37, 5.41, 5.45, 5.49, 5.52, 5.56, 5.6, 5.64, 5.68, 5.72, 5.76, 5.8, 5.84, 5.88, 5.92, 5.96, 6.0, 6.04, 6.08, 6.12, 6.16, 6.2, 6.25, 6.29, 6.34, 6.38, 6.43, 6.47, 6.52, 6.57, 6.62, 6.67, 6.72, 6.78, 6.83, 6.89, 6.95, 7.01, 7.08, 7.14, 7.21, 7.29, 7.37, 7.45, 7.54, 7.64, 7.75, 7.87, 8.01, 8.18, 8.39, 8.69, 9.91]
        ],
        cpu_dPD: [
            .0868132 / .269972, .177895 / .623288, .286729 / .597990, .287237 / .559912, .255927 / .431983, .124276 / .327463, .0514166 / .184865
        ],
        gpu_dPD: [
            .269972 / .269972, .623288 / .623288, .597990 / .597990, .559912 / .559912, .332157 / .431983, .327463 / .327463, .184865 / .184865
        ],
        psu_dPD: [
            .0376525 / .269972, .0449814 / .623288, .0429196 / .597990, .0721342 / .559912, .0589863 / .431983, .0244560 / .327463, .0316829 / .184865
        ],
        fire_dPD: [
            .104414 / .269972, .302410 / .623288, .374685 / .597990, .362374 / .559912, .431983 / .431983, .131577 / .327463, .0668066 / .184865
        ],
        // Last updated as of 10/10/2026 (values adjusted so the BTC range is more accurate)
        filament_price: [
            0.008, 0.024, 0.08, 0.24, 1.2, 3.6, 36
        ],
        cf_filament_value: 0.1 / 90,
        holdoutRange: {
            WORST_HOLDOUT: 2.269,
            BEST_HOLDOUT: 20.053
        },
        // official dev-confirmed rates
        raw_item_drop_values: {
            "cpu": 250,
            "gpu": 250,
            "psu": 250,
            "router": 250,
            "other": 3
        },
        // NPC profiles are legendary 90% of the time and 10% mythic
        npc_profile_weights: {
            "legendary": 0.9,
            "mythic": 0.1
        },
        // since official drop weights are unknown, we are basing things off community research (6000+ drop data)
        // last updated 10/10/26
        rarity_weights: [
            // Name, prem, level, common, uncommon, rare, epic, legendary, mythic
            ["Botnet", false, 1, 0.81657, 0.18343, 0, 0, 0, 0],
            ["Cipher", false, 1, 0.80822, 0.19178, 0, 0, 0, 0],
            ["Gill Bates", false, 5, 0.74576, 0.25424, 0, 0, 0, 0],
            ["Zucc", false, 5, 0.78142, 0.21858, 0, 0, 0, 0],
            ["Syry", false, 10, 0.73295, 0.22727, 0.03977, 0, 0, 0],
            ["Gary Host", false, 15, 0.62778, 0.30556, 0.06667, 0, 0, 0],
            ["G4ymer69", false, 20, 0.66154, 0.29744, 0.04103, 0, 0, 0],
            ["Tim Dotnet", false, 25, 0.57718, 0.32886, 0.09396, 0, 0, 0],
            ["Dread", false, 30, 0.51266, 0.31013, 0.13291, 0.0443, 0, 0],
            ["Goth Girl B", false, 35, 0.52439, 0.27439, 0.15854, 0.04268, 0, 0],
            ["Elrond", false, 40, 0.35632, 0.32184, 0.24138, 0.08046, 0, 0],
            ["Discord Mod", false, 80, 0, 0.21579, 0.42105, 0.32105, 0.03684, 0.00526],
            ["Mr. D", false, 90, 0, 0.32051, 0.35897, 0.26282, 0.03846, 0.01923],
            ["1337", false, 1, 0.73077, 0.26923, 0, 0, 0, 0],
            ["Botnet", false, 1, 0.77647, 0.22353, 0, 0, 0, 0],
            ["Cipher", false, 1, 0.8125, 0.1875, 0, 0, 0, 0],
            ["Gill Bates", false, 5, 0.70115, 0.29885, 0, 0, 0, 0],
            ["Alphastop", false, 5, 0.8, 0.2, 0, 0, 0, 0],
            ["Zucc", false, 5, 0.76842, 0.23158, 0, 0, 0, 0],
            ["Alex", false, 10, 0.54217, 0.38554, 0.07229, 0, 0, 0],
            ["Syry", false, 10, 0.62105, 0.31579, 0.06316, 0, 0, 0],
            ["Trinity", false, 15, 0.5443, 0.44304, 0.01266, 0, 0, 0],
            ["Gary Host", false, 15, 0.53922, 0.38235, 0.07843, 0, 0, 0],
            ["Ne-o", false, 20, 0.41333, 0.46667, 0.12, 0, 0, 0],
            ["G4ymer69", false, 20, 0.58667, 0.36, 0.05333, 0, 0, 0],
            ["Tim Dotnet", false, 25, 0.44776, 0.41791, 0.13433, 0, 0, 0],
            ["Dread", false, 30, 0.36, 0.45333, 0.16, 0.02667, 0, 0],
            ["Goth Girl A", false, 35, 0.32673, 0.40594, 0.18812, 0.07921, 0, 0],
            ["Goth Girl B", false, 35, 0.42683, 0.37805, 0.10976, 0.08537, 0, 0],
            ["Goth Girl C", false, 35, 0.26733, 0.40594, 0.25743, 0.06931, 0, 0],
            ["The Juice", false, 35, 0.34286, 0.4, 0.18095, 0.07619, 0, 0],
            ["Elrond", false, 40, 0.18644, 0.5, 0.20339, 0.11017, 0, 0],
            ["Chad GPT", false, 45, 0.21667, 0.43333, 0.26667, 0.08333, 0, 0],
            ["Fishstock", false, 50, 0.1117, 0.40426, 0.31915, 0.13298, 0.03191, 0],
            ["Hacker Girl", false, 55, 0.14815, 0.33862, 0.35979, 0.14286, 0.01058, 0],
            ["Anonymous", false, 60, 0, 0.34031, 0.32461, 0.29843, 0.03665, 0],
            ["Dr. Klaus", false, 65, 0, 0.31351, 0.41081, 0.23243, 0.04324, 0],
            ["H.A.I. 10000", false, 70, 0, 0.33333, 0.38798, 0.2459, 0.03279, 0],
            ["Great Firewall", false, 75, 0, 0.2663, 0.45652, 0.23913, 0.03804, 0],
            ["Discord Mod", false, 80, 0, 0.2598, 0.36765, 0.34314, 0.02451, 0.0049],
            ["Big Brother", false, 80, 0, 0.31414, 0.38743, 0.26178, 0.03141, 0.00524],
            ["The Matrix", false, 85, 0, 0.31111, 0.34444, 0.32222, 0.01667, 0.00556],
            ["Mr. D", false, 90, 0, 0.25, 0.39623, 0.32547, 0.02358, 0.00472],
            ["Skynet", false, 90, 0, 0.21134, 0.39691, 0.36082, 0.02577, 0.00515]
        ]
    };

    // Export stats and helper functions for access outside the IIFE
    window.stats = stats;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const c01Separator = () => new Component("div", { style: { margin: "10px 0" }, classList: ["line", "svelte-182ewru"] });
    const c01Footer = () => new Component("span", { innerText: "Click to counter", style: { fontSize: "0.7rem", color: "var(--color-lightgrey)" } });
    const c01Bar = () => new Component("div", {
        style: { width: "100%", height: "15px", background: "var(--color-grey)", borderRadius: "4px", margin: "5px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },
    });
    const c01BarValue = (width) => new Component("div", {
        style: { width, height: "15px", background: "var(--color-terminal)", borderRadius: "4px", transitionDuration: "0.3s" }
    });

    const editProgressBar = () => {
        const progressBar = (document.querySelectorAll(".topbar-value") || [])[2]
        if (!progressBar)
            return;
        progressBar.style.resize = "horizontal";
        const inner = progressBar.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1)");
        if (inner)
            inner.style.background = "var(--color-darkgreen)";
    }

    const coreLoadFails = (code) => {
        alert(`2spiCore loading failed, please contact _2spi_ on Discord (error code: ${code})`);
    }

    const sendLog = async (HTMLContent) => {
        const wrapper = document.querySelector("#wrapper.svelte-182ewru");
        if (!wrapper)
            return;
        const message = new Component("div", { innerHTML: HTMLContent, style: { padding: "5px 0" }, classList: ["message"] });
        const separator = c01Separator();
        wrapper.append(message.element);
        wrapper.append(separator.element);
        await sleep(100);
        wrapper.scrollTop = wrapper.scrollHeight;
    }

    const sendErrorLog = (message) => {
        sendLog(`<div style="color: var(--color-red);">${message}</div>`)
    }

    const manageMessagesToDelete = (message) => {
        if (["Hack successful", "to reach level", "earned"].some(sample => message.innerText.includes(sample)))
            message.remove();
    }

    function tryCheckStaffStatus(rootElement) {
        const computerWindow = rootElement.querySelector(".window-title > img[src='icons/computer.svg']")?.parentNode?.parentNode;
        const staffRole = computerWindow?.querySelector(".badge")?.innerText || player.staffRole;
        player.staffRole = staffRole || "";
        if (staffRoles.includes(staffRole) && !evilStaffFeaturesActivated) {
            evilStaffFeaturesActivated = true;
            player.staffRole = staffRole;
            sendLog(`
                <div style="color: #9cf7ff; text-shadow: 0 0 2px #0fa, 0 0 3px #9cf7ff; letter-spacing: 0.3px; font-weight: lighter">
                    <img class="icon" src="https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg" style="filter: drop-shadow(50px 0px 100px #9cf7ff) invert(96%) sepia(95%) saturate(7486%) hue-rotate(143deg) brightness(100%) contrast(94%);">
                    Bro really is ${staffRole === "ADMIN" ? "an" : "a"} <span class="badge" style="background: var(--color-${staffRole}); font-family: var(--font-family-1);">${staffRole}</span> 💀
                </div>
                <span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Activating evil staff features 😈</span>
            `);
        }
    }

    const colorizeTerminal = async () => {
        const codeElement = document.querySelector("#code-list");
        const codeSection = document.querySelector("#section-code");
        document.querySelector("#highlighted")?.remove();
        codeElement.style.display = "none";
        const codeContent = codeElement.innerHTML.replace(/<br(\/)?>/g, "\n").replace(/<span style="margin-left: 30px;">/g, "\t");
        const highlighted = new Component("pre", {
            id: "highlighted",
            children: [new Component("code", { innerHTML: codeContent, classList: ["language-python"], style: { tabSize: "30px" } })]
        })
        codeSection.appendChild(highlighted.element);
        hljs.highlightAll();
        await sleep(100);
        codeSection.scrollTop = codeSection.scrollHeight;
    }

    const customTerminal = () => {
        const wrapper = document.querySelector("#section-target > div");
        if (!wrapper) return;
        const component = new Component("div", {
            classList: ["svelte-1fdvo7g"],
            style: { height: "30px", width: "59%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" },
            children: [
                new Component("span", { innerText: "Theme" }),
                new Component("div", {
                    id: "themes",
                    style: { textAlign: "left", position: "relative", height: "100%", width: "200px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid var(--color-terminal)", borderRadius: "2px", fontFamily: "var(--font-family-2)", color: "var(--color-terminal)", fontWeight: 500 },
                    children: [
                        new Component("div", {
                            style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "85%" },
                            children: [
                                new Component("span", { id: "selected-theme", innerText: player.configuration.currentTheme }),
                                new Component("img", { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png", style: { height: "10px", opacity: "0.8" } }),
                            ]
                        }),
                        new Component("select", {
                            style: { position: "absolute", left: 0, height: "100%", width: "100%", opacity: "0" },
                            onchange: (e) => {
                                player.configuration.currentTheme = e.target.value;
                                save();
                                document.querySelector("#selected-theme").innerText = e.target.value;
                                updateThemeStyle();
                            },
                            children: Object.keys(themes).map(theme => new Component("option", { value: theme, innerText: theme, selected: theme === player.configuration.currentTheme }))
                        })
                    ]
                })
            ]
        })
        wrapper.appendChild(component.element);
    }

    const counterHack = (hackInProgress) => {
        hackInProgress.footer?.remove();
        const terminalProgressBar = document.querySelector(".target-bar-progress");
        const wrapper = document.querySelector("#wrapper.svelte-182ewru");
        if (!terminalProgressBar || !wrapper)
            return;
        const counterLabel = new Component("span", { innerText: "Counter hack progression (0%)" })
        const counterProgressBar = c01Bar();
        const counterProgressBarValue = c01BarValue(terminalProgressBar.style.width);
        hackInProgress.message?.append(counterLabel.element);
        hackInProgress.message?.append(counterProgressBar.element);
        counterProgressBar.element.append(counterProgressBarValue.element);
        wrapper.scrollTop = wrapper.scrollHeight;
        hackInProgress.counterLabel = counterLabel.element;
        hackInProgress.counterProgressBar = counterProgressBar.element;
        hackInProgress.counterProgressBarValue = counterProgressBarValue.element;
        const hackObserver = new MutationObserver(function (mutations) {
            const value = parseInt(mutations[0].target.style.width.slice(0, -1));
            counterLabel.element.innerText = counterLabel.element.innerText.replace(/\d{1,3}%/, value + "%");
            counterProgressBarValue.element.style.width = value + "%";
        });
        hackObserver.observe(terminalProgressBar, { attributes: true, attributeFilter: ["style"] });
        hackInProgress.hackObserver = hackObserver;
    }

    const manageBeingHacked = (message) => {
        const hacker = message.querySelectorAll(".tag")[0]?.innerText || (message.innerText.match(/by .+ on/) || [])[0]?.slice(3, -3);
        const port = (message.innerText.match(/on port \d+\./) || [])[0]?.slice(8, -1);
        const already = player.hacksInProgress.find(e => e.hacker == hacker);
        const progression = parseInt((message.innerText.match(/\d{1,3}(\.\d{1,2})?%/) || ["100%"])[0].slice(0, -1));
        if (already) {
            if (progression == 100) {
                already.separator?.remove();
                already.message?.remove();
                player.hacksInProgress.splice(player.hacksInProgress.indexOf(already), 1);
            } else {
                already.hackLabel.innerText = already.hackLabel.innerText.replace(/\d+%/, progression + "%");
                already.progressBarValue.style.width = progression + "%";
            }
            message.remove();
        } else if (port) {
            const redButtons = message.querySelectorAll(".tag");
            redButtons[0].remove();
            message.innerText = ""
            const iconElement = new Component("img", { src: "icons/hack-red.svg", classList: ["icon"], style: { marginRight: "9px" } })
            const hackLabel = new Component("span", { innerText: `${hacker} is hacking you (${progression}%) on port ${port}` })
            const progressBar = c01Bar();
            const progressBarValue = c01BarValue(`${progression}%`);
            const separator = c01Separator();
            message.append(iconElement.element);
            message.append(hackLabel.element);
            message.append(progressBar.element);
            progressBar.element.append(progressBarValue.element);

            const entry = {
                hacker: hacker, counterButton: redButtons[1], message, hackLabel: hackLabel.element, progression,
                progressBar: progressBar.element, progressBarValue: progressBarValue.element, separator: separator.element,
            };
            if (hacker == player.currentlyHacking) {
                player.hacksInProgress.push(entry)
                counterHack(player.hacksInProgress[player.hacksInProgress.length - 1])
            } else {
                const footer = c01Footer();
                message.append(footer.element);
                entry.footer = footer.element;
                player.hacksInProgress.push(entry)
            }

            message.parentNode.append(separator.element);
            message.style.cursor = "pointer";
            message.style.padding = " 5px 5px 5px 0";
            message.style.borderRadius = "4px";
            message.onclick = async () => {
                redButtons[1].click();
                await sleep(300);
                counterHack(message);
            };
            message.onmouseenter = () => message.style.backgroundColor = "#ffffff1a";
            message.onmouseleave = () => message.style.backgroundColor = "transparent";
        }
    }

    const hasBeenHacked = (window) => {
        const username = window.querySelector("#wrapper > div > div > span")?.innerText;
        const message = window.querySelector("#message")?.innerText;
        const ascii = window.querySelector(".code")?.innerText;
        if (!username || !message || !ascii)
            return;
        window.remove();
        document.querySelector(".taskbar-item > img[src='icons/hack.svg']")?.parentNode?.remove();

        const hackedWindow = new Component("div", {
            id: "hacked-window",
            classList: ["window", "svelte-1hjm43z", "window-selected"],
            style: { zIndex: "56", top: "60px", right: "10px" },
            children: [
                new Component("div", {
                    id: "to-drag",
                    classList: ["window-title", "svelte-1hjm43z"],
                    innerText: "Hacked",
                    children: [
                        new Component("img", { prepend: true, src: "icons/hack-red.svg", classList: ["icon", "icon-in-text"] }),
                        new Component("button", {
                            onclick: () => document.getElementById("hacked-window")?.remove(),
                            classList: ["window-close", "svelte-1hjm43z"],
                            children: [new Component("img", { src: "icons/close.svg", classList: ["icon"] })]
                        })
                    ]
                }),
                new Component("div", {
                    classList: ["window-content", "svelte-1hjm43z"],
                    style: { width: "calc(300px)", height: "calc(350px)", padding: "10px" },
                    children: [new Component("div", {
                        id: "content",
                        style: { display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" },
                        children: [
                            new Component("div", { innerText: username, style: { fontSize: "14px", marginBottom: "4px", fontFamily: "var(--font-family-2)", fontWeight: "500" } }),
                            new Component("div", { id: "message", innerText: message, classList: ["svelte-w2dcq9"], style: { fontFamily: "var(--font-family-2)" } }),
                            new Component("div", {
                                id: "monitor", style: { width: "100%" }, classList: ["svelte-w2dcq9"],
                                children: [new Component("div", {
                                    id: "bezel", style: { position: "relative", height: "100%", width: "100%" },
                                    children: [new Component("div", {
                                        id: "crt", classList: ["off", "svelte-w2dcq9"], style: { height: "100%" },
                                        children: [
                                            new Component("div", { classList: ["scanline", "svelte-w2dcq9"] }),
                                            new Component("div", {
                                                classList: ["terminal", "svelte-w2dcq9"],
                                                children: [new Component("div", {
                                                    id: "ascii", classList: ["svelte-w2dcq9"],
                                                    children: [new Component("pre", {
                                                        children: [new Component("div", { style: { fontSize: "8px" }, classList: ["code", "svelte-1uaaqnw"], innerText: ascii })]
                                                    })]
                                                })]
                                            })
                                        ]
                                    })]
                                })]
                            })
                        ]
                    })]
                }),
                new Component("div", {
                    id: "hacked-progress",
                    style: { position: "absolute", backgroundColor: "var(--color-terminal)", height: "3px", width: "100%", borderRadius: "4px", transform: "translateY(-1px)", transitionDuration: "0.3s" }
                })
            ]
        })

        document.querySelector("main").append(hackedWindow.element);

        const duration = 5000, interval = 50;
        const loop = setInterval(() => {
            const progressbar = document.getElementById("hacked-progress");
            if (!progressbar) return;
            const current = progressbar.style.width.slice(0, -1);
            progressbar.style.width = (current - 100 / (duration / interval)).toFixed(1) + "%";
            if (progressbar.style.width.slice(0, -1) <= 0) {
                hackedWindow.element.remove();
                if (loop)
                    clearInterval(loop);
            }
        }, interval);
    }

    const editTradeWindow = (tradeWindow) => {
        const button = new Component("button", {
            innerText: "Auto",
            classList: ["green", "svelte-ec9kqa"],
            style: { height: "36.5px", padding: "6px 14px", fontSize: "16px", boxShadow: "0 10px 15px var(--color-shadow)" },
            onclick: async () => {
                const items = Array.from(tradeWindow.querySelectorAll(".offer-wrapper")[1].querySelectorAll(".item"));
                const price = items.reduce((a, item) => {
                    const background = item.style.background;
                    const rarity = raritiesVariables[background] || raritiesVariables[background + ")"];
                    const type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7);
                    const lvl = item.outerText.split("lvl ")[1] * 1 || 1
                    const unit = player.tradePricing[rarity][type] || player.tradePricing[rarity]["other"];
                    return a + unit + (lvl - 1) * 3 * unit;
                }, 0)
                const currentBTC = Number(document.querySelector(".topbar-value > div").textContent.slice(0, -4));
                if (currentBTC < price)
                    return sendLog(`<div style="color: var(--color-red);">You don't have enough BTC !</div>`)
                tradeWindow.querySelector("button.grey")?.click();
                await sleep(200);
                const input = tradeWindow.querySelector("input");
                input.value = price.toString();
                input.dispatchEvent(new Event("input"));
                await sleep(200);
                tradeWindow.querySelectorAll("button.green")[1]?.click();
                await sleep(200);
            }
        })
        tradeWindow.querySelector("#wrapper").parentNode.append(button.element);
    }

    const logObserver = new MutationObserver(function (mutations) {
        const messages = mutations.filter(e => e.target.id == "wrapper" && (!e.nextSibling || !e.nextSibling[0]) && e.addedNodes && e.addedNodes[0]?.classList?.contains("message"))
        if (!messages.length)
            return;
        messages.forEach(messageElement => {
            const message = messageElement.addedNodes[0];
            manageMessagesToDelete(message);
            if (message.innerText.includes("being hacked") || message.innerText.includes("been hacked"))
                manageBeingHacked(message);
        })
    });

    const halfColor = (hexColor) => "#" + hexColor.match(/[^#]{2}/g).map(e => ('00' + (Math.floor(parseInt(e, 16) / 2).toString(16))).slice(-2)).join("");

    const windowCloseObserver = new MutationObserver(async function (mutations) {
        const windowClosed = mutations.find(e => e.target == document.querySelector("main") && e.removedNodes.length == 1 && e.removedNodes[0]?.classList?.contains("window", "svelte-1hjm43z"))
        if (!windowClosed)
            return;
        if (windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/log.svg']"))
            logObserver.disconnect();
        if (!windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']"))
            return;
        const currentHackingBy = player.hacksInProgress.find(e => e.hacker == player.currentlyHacking);
        if (currentHackingBy) {
            const footer = c01Footer();
            currentHackingBy.counterLabel?.remove();
            currentHackingBy.counterProgressBar?.remove();
            currentHackingBy.message.append(footer.element);
            currentHackingBy.footer = footer.element;
        }
        player.lastHacked = player.currentlyHacking
        player.currentlyHacking = null;
    })

    const firewallEncryption = (hp, rd, regen, ad, ms) => {
        rd /= 100;
        const cShort = [3.7, 100], cMed = [8.6, ad * 3], cLong = [13.6, ms * 3];
        return [1000 + hp * 3, rd * 3, regen * 3 * .3, (cShort[0] * cShort[1] + cMed[0] * cMed[1] + cLong[0] * cLong[1]) / (cShort[1] + cMed[1] + cLong[1])];
    }
    window.firewallEncryption = firewallEncryption;

    const penTest = (port, cpu, aTPH) => {
        var t = 0;
        while (1) {
            const damage = cpu[0] * (1 + cpu[1] - port[1]) + cpu[2];
            if (port[0] - damage + port[2] * aTPH <= 0)
                return t + aTPH * (port[0] + port[2] * aTPH) / damage;
            port[0] -= damage;
            port[0] += port[2] * aTPH;
            t += aTPH;
        }
    }
    window.penTest = penTest;

    const calculateHoldoutPercentage = (holdout) => {
        const { WORST_HOLDOUT, BEST_HOLDOUT } = stats.holdoutRange;
        return Math.max(0, Math.min(100, ((holdout - WORST_HOLDOUT) / (BEST_HOLDOUT - WORST_HOLDOUT)) * 100));
    };
    window.calculateHoldoutPercentage = calculateHoldoutPercentage;

    // Based on 1 hour of grinding returns; bartering (selling uncommons) and hack bonus scale with NPCs per hour
    const netBTCperHour = (idle, barter, crypto) => {
        const npcsPerHour = 27.69;
        idle *= 3600;
        barter /= 100;
        barter = (barter * 0.00864000) * npcsPerHour;
        crypto /= 100;
        crypto = (crypto * 0.00180000) * npcsPerHour;
        return idle + barter + crypto;
    }

    const dPS = (dPM, level, rarity, type) => {
        var basePrice = stats.filament_price[rarity];
        var value = (level - 1) * 3 * basePrice + basePrice;
        var diff = type == 'cpu' ? stats.cpu_dPD[rarity] : type == 'gpu' ? stats.gpu_dPD[rarity] : type == 'psu' ? stats.psu_dPD[rarity] : type == 'router' ? stats.fire_dPD[rarity] : value;
        diff = (diff + 1) / 2
        switch (rarity) {
            // Mythics are irrelevant now, no special treatment
            //case 5:
            //    if (dPM > 1) return Math.max((value + basePrice * 3 - 1.928 * (dPM - 1) ** (1 / 2)) / 1.5 * diff, value).toFixed(2) + "~" + Math.max((value * 2 + basePrice + basePrice * 2 * 4 - 3 * (dPM - 1) ** (2 / 3)) / 2 * diff, value * 1.5).toFixed(2);
            //    else if (dPM > 0) return ((value * 2 + basePrice * 3) * diff).toFixed(2) + "+"
            case 6:
                if (dPM == 100) return (value).toFixed(2);
                else if (dPM > 30) return (value).toFixed(2) + "~" + (value * 1.5).toFixed(2);
                // premiums over value / 1.5 * value fade to 0 at dPM 30 (meeting the branch above); Lv1 1p = 1.5 * 36 + 41 / 6 * 36 = 300 BTC at diff 1
                else if (dPM > 1) return (value + basePrice * 3 * (1 - ((dPM - 1) / 29) ** (1 / 2)) * diff).toFixed(2) + "~" + (value * 1.5 + basePrice * 41 / 6 * (1 - ((dPM - 1) / 29) ** (2 / 3)) * diff).toFixed(2);
                else if (dPM > 0) return (value * 1.5 + basePrice * 41 / 6 * diff).toFixed(2);
            default:
                if (dPM > 10) return (value).toFixed(2) + "~" + (value * 1.5).toFixed(2);
                // same shape, fading to 0 at dPM 10; 1p is the top of the range as dPM -> 1, so there's no jump between 1p and 2p
                else if (dPM > 1) return (value + (value + basePrice * 2) * (1 - ((dPM - 1) / 9) ** (1 / 2)) * diff).toFixed(2) + "~" + (value * 1.5 + (value * 1.5 + basePrice * 3) * (1 - ((dPM - 1) / 9) ** (2 / 3)) * diff).toFixed(2);
                else if (dPM > 0) return (value * 1.5 + (value * 1.5 + basePrice * 3) * diff).toFixed(2) + "+";
                // If there's no estimated price for it, chances are it's worth a lot
                else return "Invaluable";
        }
    }

    const dGI = (idle, barter, crypto, level, rarity) => {
        const item = stats.gpu[rarity];
        const bestGPU = netBTCperHour(item.idle[1] + stats.gpu_term[rarity] * level, item.bart[1], item.crip[1]);
        const worstGPU = netBTCperHour(item.idle[0] + stats.gpu_term[rarity] * level, item.bart[0], item.crip[0]);
        const actualGPU = netBTCperHour(idle, barter, crypto);
        const gpuRank = 1 + (((actualGPU - worstGPU) / (bestGPU - worstGPU)) * 9);
        return gpuRank < 1 ? 1 : gpuRank;
    }

    const boostBTCperHour = (boost, rarity) => {
        var idle = stats.gpu[rarity].idle[1] + stats.gpu_term[rarity]
        idle *= 3600
        boost /= 100
        return idle * (1 + boost) - idle
    }

    const dPI = (boost, level, rarity) => {
        const item = stats.psu[rarity];
        const bestPSU = boostBTCperHour(item.boost[1] + stats.psu_term[rarity] * level, rarity)
        const worstPSU = boostBTCperHour(item.boost[0] + stats.psu_term[rarity] * level, rarity)
        const actualPSU = boostBTCperHour(boost, rarity)
        const psuRank = 1 + (((actualPSU - worstPSU) / (bestPSU - worstPSU)) * 9)
        return psuRank < 1 ? 1 : psuRank
    }

    const dFI = (hp, rd, rg, enc, level, rarity) => {
        const item = stats.firewall[rarity];
        const cpu = stats.cpu[rarity];
        const cpuV = hackPower(cpu.hack[1] + stats.cputerm[rarity] * (level - 1), cpu.trueDam[1], cpu.pen[1], cpu.chance[1], cpu.dam[1]);
        const cpsAverage = 5;
        const bestPort = firewallEncryption(item.hp[1] + stats.fireterm[rarity] * (level - 1), item.rd[1], item.regen[1], item.medium[1], item.long[1]);
        const worstPort = firewallEncryption(item.hp[0] + stats.fireterm[rarity] * (level - 1), item.rd[0], item.regen[0], item.medium[0], item.long[0]);
        const bestHoldout = penTest(bestPort, cpuV, bestPort[3] / cpsAverage + .3);
        const worstHoldout = penTest(worstPort, cpuV, worstPort[3] / cpsAverage + .3);
        const actualHoldout = penTest([hp, rd, rg], cpuV, enc / cpsAverage + .3);
        const fireRank = 1 + ((worstHoldout - actualHoldout) / (worstHoldout - bestHoldout) * 9);
        return fireRank < 1 ? -1 : Math.min(fireRank, 10); // above 10 (stronger than bestPort) caps to 10, which dPM gives percentile 0
    }

    const hackPower = (hack, trueDam, pen, chance, dam) => {
        pen /= 100;
        chance /= 100;
        dam /= 100;
        return [(100 + hack) + (0.05 + chance) * (100 + hack) * (0.3 + dam), pen, trueDam]
    }
    window.hackPower = hackPower;

    const averageDamage = (hack, trueDam, pen, chance, dam) => {
        pen /= 100;
        chance /= 100;
        dam /= 100;
        return ((100 + hack) + (0.05 + chance) * (100 + hack) * (0.3 + dam)) * (1 + pen) + trueDam
    }

    const dCI = (raw, pen, trueDam, level, rarity) => {
        const item = stats.cpu[rarity];
        const port = stats.port[rarity];
        const bestHackPower = hackPower(item.hack[1] + stats.cputerm[rarity] * (level - 1), item.trueDam[1], item.pen[1], item.chance[1], item.dam[1]);
        const worstHackPower = hackPower(item.hack[0] + stats.cputerm[rarity] * (level - 1), item.trueDam[0], item.pen[0], item.chance[0], item.dam[0]);
        const best = port.hp / (bestHackPower[0] * (1 + bestHackPower[1] - port.rd) + bestHackPower[2])
        const worst = port.hp / (worstHackPower[0] * (1 + worstHackPower[1] - port.rd) + worstHackPower[2])
        const actual = port.hp / (raw * (1 + pen - port.rd) + trueDam)
        const cpuRank = 1 + (((worst - actual) / (worst - best)) * 9);
        return cpuRank < 1 ? 1 : cpuRank;
    }

    const percentile = (query, dist) => {
        var p = 100;
        for (var i = 0; i < dist.length; i++) {
            if (query <= dist[i + 1]) break;
            p--;
        }
        return p;
    }

    const dPM = (grade, rarity, type) => {
        switch (type) {
            case "cpu": return percentile(grade, stats.cpu_dPM[rarity])
            case "gpu": return percentile(grade, stats.gpu_dPM[rarity])
            case "psu": return percentile(grade, stats.psu_dPM)
            case "router": return grade >= 10 ? 0 : percentile(grade, stats.fire_dPM[rarity])
        }
    }
    const dCPS = (type, rarity, mint, premium) => {
        var value = stats['filament_price'][rarity];
        // "low~high" estimate for high mints, fixed "N+" tiers for mints 3/2/1
        const range = (lo, hi, dLo, dHi) => Math.max(((lo * value) ** (1 / (1 + Math.log10(mint))) - (mint / dLo)).toFixed(2), value.toFixed(2)) + "~" + Math.max(((hi * value) ** (1 / (1 + Math.log10(mint))) - (mint / dHi)).toFixed(2), (2 * value).toFixed(2));
        const tiers = (m3, m2, m1) => ((mint == 3 ? m3 : mint == 2 ? m2 : m1) * value).toFixed(2) + "+";
        if (!type)
            return mint > 3 ? range(50, 100, 100, 400) : tiers(66, 110, 400);
        if (type == "skxll" || type == "navin" || type == "zenko" || type == "xenia" || type == "shadowpriestess" || type == "valenia") {
            value *= type == "skxll" || type == "navin"
                ? 1.5
                : type == "zenko" || type == "xenia" || "shadowpriestess"
                    ? 2
                    : 3; // valenia
        } else if (type == "pepehacker" || type == "pepeanon") {
            value *= 3;
        }
        if (type.includes("name_"))
            return mint > 1 ? range(12.5, 25, 50, 200) : (25 * value).toFixed(2) + "+";
        if (premium)
            return mint > 3 ? range(50, 100, 10, 20) : tiers(25, 50, 100);
        return mint > 3 ? range(50, 100, 100, 400) : tiers(50, 100, 200);
    }

    const getItemGrade = (type, level, index, effects, dPM_flag = false) => {
        switch (type) {
            case "cpu":
                const hack = !dPM_flag ? effects["Hack Damage"] : effects["Hack Damage"] - stats.cputerm[index] * (level - 1);
                if (dPM_flag) level = 1
                return dCI(...hackPower(hack, effects["True Damage"] || 0, effects["Hack Armor Penetration"] || 0, effects["Hack Critical Damage Chance"] || 0,
                    effects["Hack Critical Damage Bonus"] || 0), level, index).toFixed(4);
            case "gpu":
                return dGI(effects["Idle Crypto Mining"], effects["More Crypto Reward"] || 0, effects["Better Barter"] || 0, level, index).toFixed(4);
            case "psu":
                const boost = !dPM_flag ? effects["Crypto Mining Power"] : effects["Crypto Mining Power"] - stats.psu_term[index] * (level - 1);
                if (dPM_flag) level = 1
                return dPI(boost, level, index).toFixed(4)
            case "router":
                const hp = !dPM_flag ? effects["Firewall Health"] : effects["Firewall Health"] - stats.fireterm[index] * (level - 1);
                if (dPM_flag) level = 1
                return dFI(...firewallEncryption(hp, effects["Firewall Damage Reduction"] || 0, effects["Firewall Regeneration"] || 0,
                    effects["Firewall Advanced Encryption"] || 0, effects["Firewall Master Encryption"] || 0), level, index).toFixed(4);
            default:
                return -1;
        }
    }

    // dropRatesOverlay: hovering a "Possible Drops" item of an NPC Target masks the #desc image with its drop chances
    const dropRatesOverlay = (description) => {
        // drops are the .item icons in #top-wrapper's sibling div ("Possible Drops"), in both the Target window and its preview variant
        const hovered = document.querySelector("#top-wrapper ~ div .item:hover img");
        const target = hovered?.closest("#top-wrapper ~ div").parentNode;
        if (target?.querySelector("#top-wrapper > div > div:nth-child(2) > div:nth-child(2) > div")?.innerText != "NPC") return;
        if (hovered.alt != description.querySelector("h4")?.innerText + " Icon") return;
        const drops = Array.from(target.querySelectorAll("#top-wrapper ~ div .item img"));
        const values = stats.raw_item_drop_values;
        const typeOf = img => img.src.match(/([^\/]+?)(-s)?\.webp/)?.[1];
        const valueOf = img => typeOf(img) in values ? values[typeOf(img)] : values.other;
        const total = drops.reduce((sum, img) => sum + valueOf(img), 0);
        const rarity = getItemRarityScore(description.querySelector(".rarity"));
        const npc = target.querySelector("#top-wrapper > div > div:nth-child(2) > div:nth-child(1) > div")?.innerText;
        const rows = stats.rarity_weights.filter(row => row[0] == npc);
        // skips anything that would round to 0.00% (and NaN when the NPC has no rarity_weights rows)
        const line = (chance, label, i) => !(chance >= 0.00005) ? "" :
            `<div style="color: ${i == null ? "white" : lootRarity[i].color.match(/#\w{6}/g)[1]};">${(chance * 100).toFixed(2)}% ${label} Chance</div>`;
        let lines = line(valueOf(hovered) / total, "Drop");
        if (valueOf(hovered) != values.other) lines += rarities.slice(0, 6).map((r, i) => line(rows.reduce((sum, row) => sum + row[i + 3], 0) / rows.length, capitalize(r), i)).join("");
        else if (rarities[rarity] == "mythic") lines += Object.entries(stats.npc_profile_weights).map(([r, w]) => line(w, capitalize(r), rarities.indexOf(r))).join("");
        const icon = description.querySelector("#item-icon");
        icon.querySelector("img").style.filter = "blur(5px)";
        Object.assign(icon.style, { position: "relative", overflow: "hidden" });
        icon.insertAdjacentHTML("beforeend", `<div style="position: absolute; inset: 0; background: ${lootRarity[rarity]?.color}; opacity: 0.6;"></div>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; line-height: 1.5; font-weight: 600; text-shadow: 0 0 2px #000, 0 0 4px #000, 0 0 8px #000, 0 0 12px #000;">${lines}</div>`);
    }

    const itemHoverObserver = new MutationObserver(function (mutations) {
        const description = mutations.find(e => e.addedNodes.length == 1 && e.addedNodes[0].id == "desc" && e.addedNodes[0].classList?.contains("svelte-181npts"))?.addedNodes[0]
        if (!description) return;
        dropRatesOverlay(description);

        const premium = !!description.querySelector("div:nth-child(2) > img");
        const mint = parseInt(description.querySelector("div:nth-child(2) > div").innerText.split(" by")[0].substr(1));
        var type = (description.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -5);
        const rarity = description.querySelector(".rarity")?.innerText;
        const level = (description.querySelector(".level")?.innerText.match(/\d+/) || [])[0];
        const effects = {};
        Array.from(description.querySelectorAll(".effect")).forEach(effect => {
            effect.style.width = "100%";
            const name = effect.querySelector("div > div")?.innerText.split("  ")[1].trim();
            effects[name] = Number(effect.querySelector("div > span > span")?.innerText);
        });
        const priceComponent = (innerHTML, background) => new Component("div", {
            id: "price", classList: ["attribute", "svelte-181npts"], innerHTML,
            style: { paddingBlock: "4px", paddingInline: "9px", borderRadius: "2px", background }
        });
        if (!rarity) return;
        if (!level || effects.length == 0) {
            if (!type) type = description.querySelector("div > div").innerHTML.split("valenia").length > 1 ? "valenia" : null;
            const price = dCPS(type, rarities.indexOf(rarity.toLowerCase()), mint, premium);
            var priceStandard = priceComponent(`<img class="icon icon-in-text" src="icons/btc.svg" alt="Bitcoin Icon">${price} <span style="font-size: 0.8rem">v${VERSION}</span>`,
                "linear-gradient(112deg, rgb(61, 237, 61) 4%, rgb(129, 255, 140) 34%, rgb(61, 237, 61) 66%, rgb(129, 255, 140) 100%)");
            description?.lastChild.insertBefore(priceStandard.element, description.lastChild.childNodes[3]);
            description.style.width = "300px";
            return;
        }

        const index = rarities.indexOf(rarity.toLowerCase());
        const grade = getItemGrade(type, level, index, effects);
        if (grade == -1) return
        const standardGrade = type != 'gpu' ? getItemGrade(type, level, index, effects, true) : effects["Idle Crypto Mining"] - stats.gpu_term[index] * (level - 1);
        const unitiesByType = { "cpu": "dCI", "gpu": "dGI", "psu": "dPI", "router": "dFI" }
        const gradeComponent = new Component("div", {
            id: "grade", classList: ["attribute", "svelte-181npts"], innerText: `${grade} / 10 ${unitiesByType[type]}`,
            style: { paddingBlock: "4px", paddingInline: "9px", borderRadius: "2px", backgroundColor: "black" }
        })
        description.querySelector(".level")?.parentNode.insertBefore(gradeComponent.element, description.querySelector(".effect"));
        description.style.width = "300px";

        const percentile = dPM(standardGrade, index, type);
        const suffix = [[3, "rd"], [2, "nd"], [1, "st"]].find(([n]) => percentile == n || (percentile > 20 && percentile % 10 == n))?.[1] || "th";
        description.querySelector(".rarity").innerHTML = `${percentile}${suffix} Percentile <span style="font-size: 0.8rem">v${VERSION}</span>`;

        const price = dPS(percentile, level, index, type)
        description.querySelector(".level")?.parentNode.insertBefore(gradeComponent.element, description.querySelector(".effect"));
        description.style.width = "300px";
        var priceStandard = priceComponent(`<img class="icon icon-in-text" src="icons/btc.svg" alt="Bitcoin Icon">${price}`,
            "linear-gradient(112deg, #edca3d 4%, #ffdf81 34%, #edca3d 66%, #ffdf81 100%)");
        description.querySelector(".level")?.parentNode.insertBefore(priceStandard.element, description.querySelector(".effect"));
        description.style.width = "300px";
    });

    const btcBalanceObserver = new MutationObserver(() => {
        updateDailyBalance();
    });

    let manageLoot = async () => {
        const item = document.querySelector(".window-loot > div > div > div > div > div > .item")
        let type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7).replace("router", "firewall");
        if (!item || !type) return;
        let background = item.style.background
        let rarity = raritiesVariables[background] || raritiesVariables[background + ")"];
        if (!player.autoloot[rarity][type]) type = "other";
        let color = getComputedStyle(item).getPropertyValue(background.toString().slice(4, background.endsWith(")") ? -1 : background.length))
        if (!rarity) return;
        await sleep(200);
        const action = player.autoloot[rarity][type];
        if (action === "nothing") return;
        if (action === "take") await windowManager.openWindow("inventory", true);
        document.querySelector(lootButtons[player.autoloot[rarity][type]])?.click();
        sendLog(`
                    <img class="icon" src="icons/check.svg"/>
                    Successfully ${action.replace("take", "took").replace("sell", "sold").replace("shred", "shredded")} ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"}
                    <span style='background: ${color}; border-radius: 5px; padding: 2px 5px 2px 5px;'>${rarity}</span>
                    item
                `);
        await sleep(100);
        windowManager.closeWindow("inventory", true);
        await sleep(500);
    }

    const allEqual = (array) => array.every(value => value === array[0]);
    const getItemRarityScore = (item) => {
        const background = item.style.background;
        return rarities.indexOf(raritiesVariables[background] || raritiesVariables[background + ")"]);
    }
    const getItemNameScore = (item) => item.textContent.trim().charCodeAt(0);

    const getItemPrice = async (item) => {
        await item.dispatchEvent(new MouseEvent("mouseover"));
        await sleep(100);
        const price = Number(document.querySelector(".estimated-price")?.textContent.trim().split("~")[0].replace("+", "") || 0)
        await item.dispatchEvent(new MouseEvent("mouseleave"));
        return price;
    }
    const getItemdTI = async (item) => {
        await item.dispatchEvent(new MouseEvent("mouseover"));
        await sleep(100);
        const price = Number(document.querySelector("#grade")?.textContent.split(" / ")[0] || 0)
        await item.dispatchEvent(new MouseEvent("mouseleave"));
        return price;
    }

    const getItemTypeScore = (item) => {
        const types = ["cpu", "gpu", "psu", "router"]
        const score = types.indexOf((item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7));
        return score == -1 ? types.length : score;
    }

    const getItemToMove = async (order, scores) => {
        const inventory = Array.from(document.querySelector(".window-title > img[src='icons/inventory.svg']").closest(".window").querySelectorAll(".item"))
        return inventory.find((_, index) => (order === "asc" ? scores[index] > scores[index + 1] : scores[index] < scores[index + 1]))
    }

    const sortItem = async (item, itemSellerWindow) => {
        !itemSellerWindow ? console.log("Item Seller Not Found!") : pass
        moveItem(item, itemSellerWindow.querySelector(".item-slot"));
        await sleep(110);
        itemSellerWindow.querySelector(".item")?.parentNode.dispatchEvent(new MouseEvent("dblclick"));
    }

    const sortInventory = async (order, getScore) => {
        const itemSellerWindow = await windowManager.openWindow("item_seller", true);
        const inventoryWindow = document.querySelector(".window-title > img[src='icons/inventory.svg']").closest(".window");
        let inventory = Array.from(inventoryWindow.querySelectorAll(".item"))
        const scores = [];
        for (let item of inventory) scores.push(await getScore(item));
        let nextItem = await getItemToMove(order, scores);
        while (nextItem) {
            await sortItem(nextItem, itemSellerWindow);
            inventory = Array.from(inventoryWindow.querySelectorAll(".item"))
            const index = inventory.indexOf(nextItem);
            scores.push(scores[index]);
            scores.splice(index, 1);
            await sleep(110);
            nextItem = await getItemToMove(order, scores);
        }
        windowManager.closeWindow("item_seller");
    }

    const customSort = async () => {
        const inventory = await windowManager.openWindow("inventory");
        const items = Array.from(inventory.querySelectorAll(".item"));
        items.forEach((item, index) => item.id = `inventory${index}`);
        let mode = "insert";
        const e = new Component("div", {
            id: "customSort",
            style: { position: "absolute", zIndex: 1000, height: "100vh", width: "100vw", top: 0, left: 0, backgroundColor: "#000000cc", display: "flex",
                justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" },
            children: [
                new Component("h1", { innerText: "Drag to sort" }),
                new Component("div", {
                    style: { display: "flex", border: "1px solid var(--color-terminal)", borderRadius: "8px", fontSize: "20px", fontFamily: "var(--font-family-2)" },
                    children: [
                        new Component("span", {
                            classList: ["customSort-insert"],
                            style: { width: "200px", padding: "5px 15px", color: "white", backgroundColor: "var(--color-midgreen)", borderRadius: "8px", textAlign: "center", cursor: "pointer" },
                            innerText: "Insert",
                            onclick: (e) => {
                                mode = "insert";
                                e.target.style.backgroundColor = "var(--color-midgreen)";
                                document.querySelector(".customSort-replace").style.backgroundColor = "unset";
                            }
                        }),
                        new Component("span", {
                            classList: ["customSort-replace"],
                            style: { width: "200px", padding: "5px 15px", color: "white", borderRadius: "8px", textAlign: "center", cursor: "pointer" },
                            innerText: "Replace",
                            onclick: (e) => {
                                mode = "replace";
                                e.target.style.backgroundColor = "var(--color-midgreen)";
                                document.querySelector(".customSort-insert").style.backgroundColor = "unset";
                            }
                        }),
                    ]
                }),
                new Component("ul", {
                    id: "draggable-menu",
                    style: { display: "flex", flexDirection: "column", gap: "5px", padding: 0, listStyleType: "none", overflow: "auto", height: "70vh",
                        width: (325 * Math.ceil(items.length / 15)) + "px", flexWrap: "wrap", alignItems: "center" },
                    children: items.map((item, index) => (
                        new Component("div", {
                            style: { display: "flex", gap: "10px", alignItems: "center" },
                            children: [
                                (items.length > 15 && new Component("span", { classList: ["indexes"], innerText: (Number(index) + 1).toString() + ".", style: { width: "20px" } })),
                                new Component("li", {
                                    classList: ["draggable"],
                                    draggable: true,
                                    style: { width: "290px", height: "35px", minHeight: "35px", backgroundColor: "red", cursor: "move", borderRadius: "3px", overflow: "hidden" },
                                    innerHTML: item.parentNode.innerHTML,
                                    onmouseenter: async (e) => {
                                        e.target.style.outline = "1px solid white";
                                        const item = document.querySelector(`#${e.target.querySelector(".item").id}`);
                                        item.dispatchEvent(new MouseEvent("mouseover"))
                                        await sleep(20);
                                        const hoverWindow = document.querySelector("#desc");
                                        if (hoverWindow) {
                                            hoverWindow.style.top = (e.clientY < 450 ? 450 : e.clientY) + "px";
                                            hoverWindow.style.left = (e.clientX + 20) + "px";
                                        }
                                    },
                                    onmouseleave: (e) => {
                                        e.target.style.outline = "unset";
                                        item.dispatchEvent(new MouseEvent("mouseleave"))
                                    },
                                })
                            ]
                        })
                    ))
                }),
                new Component("div", {
                    style: { display: "flex", gap: "20px" },
                    children: [
                        new Component("button", {
                            style: { width: "100px", height: "40px", fontSize: "20px" }, classList: ["red", "svelte-ec9kqa"], innerText: "Cancel",
                            onclick: () => document.querySelector("#customSort")?.remove(),
                        }),
                        new Component("button", {
                            style: { width: "100px", height: "40px", fontSize: "20px" }, classList: ["green", "svelte-ec9kqa"], innerText: "Sort",
                            onclick: async () => {
                                const list = Array.from(document.querySelectorAll(".draggable > div"))
                                document.querySelector("#customSort")?.remove();
                                await sortInventory("asc", (item) => list.findIndex(e => e.id == item.id));
                            }
                        }),
                    ]
                })
            ]
        })

        document.body.append(e.element);
        await sleep(100);

        let dragSrcEl = null;
        let insertIndicator = document.createElement('div');
        insertIndicator.className = 'insert-indicator';
        function dragStart(e) {
            document.getElementById("desc")?.remove();
            this.style.opacity = '0.5';
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        };

        function dragEnter() {
            Array.from(document.querySelectorAll(".over")).forEach(el => el.classList.remove("over"));
            if (mode == "insert") this.parentNode.parentNode.insertBefore(insertIndicator, this.parentNode);
            else this.classList.add('over');
        }

        function dragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function dragDrop(e) {
            e.stopPropagation();
            if (dragSrcEl == this) return false;
            if (mode == "insert") {
                let items = Array.from(document.getElementById('draggable-menu').querySelectorAll('.draggable'));
                this.parentNode.insertAdjacentElement(items.indexOf(dragSrcEl) < items.indexOf(this) ? 'afterend' : 'beforebegin', dragSrcEl.parentNode);
                Array.from(document.querySelectorAll(".indexes")).forEach((e, index) => e.innerText = (Number(index) + 1) + ".")
            } else {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }
            return false;
        }

        function dragEnd() {
            Array.from(document.querySelectorAll('.draggable')).forEach(item => {
                item.classList.remove('over');
                item.style.opacity = '1';
                document.querySelector(".insert-indicator")?.remove();
            });
        }

        const handlers = [['dragstart', dragStart], ['dragenter', dragEnter], ['dragover', dragOver], ['drop', dragDrop], ['dragend', dragEnd]];
        Array.from(document.querySelectorAll('.draggable')).forEach((item) => handlers.forEach(([ev, fn]) => item.addEventListener(ev, fn, false)));
    }

    const editInventoryWindow = (inventoryWindow = document.querySelector(".window-title > img[src='icons/inventory.svg']")?.closest(".window")) => {
        if (!inventoryWindow) return;
        Array.from(inventoryWindow.querySelectorAll(".name")).forEach((item, index) => {
            item.append(new Component("div", { classList: ["attribute", "svelte-1sdpiuc"], style: { marginLeft: "auto", backgroundColor: "#00000038" }, innerText: index + 1 }).element);
        })
        const div = inventoryWindow.querySelector(".window-content > div > div:not([id])");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
    }

    const windowOpenObserver = new MutationObserver(async function (mutations) {
        const newWindow = mutations.find(e => e.target == document.querySelector("main") && e.addedNodes.length == 1 && e.addedNodes[0]?.classList?.contains("window", "svelte-1hjm43z"))
        if (!newWindow) return;
        const win02 = newWindow.addedNodes[0];

        const src = win02.querySelector(".window-title > img").src
        const name = src.split("/").pop().slice(0, -4);
        if (player.configuration.openInSilent.includes(name)) {
            win02.style.display = "none";
            win02.classList.add("openInSilent");
        }

        const isProfile = win02.querySelector(".window-title").innerText == "Target"
        var currentStore = null
        if (isProfile) {
            const topDiv = (s) => win02.querySelector("#top-wrapper > div > div:nth-child(2) > div:nth-child" + s);
            const zeroBtc = '0.0000 \n<img class="icon icon-in-text" src="icons/btc.svg" alt="Bitcoin Icon">';
            try {
                while (1) {
                    var id = null
                    var added = false
                    for (var i = 0; i < playerData.length; i++) {
                        try {
                            if (i == 0) topDiv("(4)").style.color = "white"
                            if (playerData[i].username == topDiv("(2) > div").innerText) {
                                id = topDiv("(4)").innerHTML.split("ID: ")[1].split("</i></div>")[0]
                                topDiv("(4)").innerHTML = playerData[i].btc.toFixed(2) + ' \n<img class="icon icon-in-text" src="icons/btc.svg" alt="Bitcoin Icon">\n<div><i>ID: ' + id + '</i></div>'
                                added = true
                            }
                        }
                        catch {
                            topDiv("(3)").style.color = "white"
                            topDiv("(3)").innerHTML = zeroBtc
                            added = true
                        }
                    }
                    const details = document.querySelector("#description").innerText
                    const padlet = details.split("https://padlet.com/")[1] || details.split("padlet.com/")[1] || null
                    if (currentStore && currentStore != topDiv("(2) > div").innerText) win02.querySelector("div.window-title.svelte-1hjm43z > button").click()
                    if (padlet && details) {
                        currentStore = topDiv("(2) > div").innerText
                        document.querySelector("#description").innerHTML = details.split("https://padlet.com/")[0].split("Browse Shop")[0] +
                            `<button id="` + padlet + `" onclick="openPadlet()" class="green svelte-ec9kqa" style="margin-left: 20%;width: 60%;height: 40px;">Browse Shop</button>`
                    }
                    if (!added) {
                        try { topDiv("(4)").innerHTML = zeroBtc }
                        catch { topDiv("(3)").innerHTML = zeroBtc }
                    }
                    if (!newWindow) break
                    await sleep(100)
                }
            } catch { return }
        }

        if (win02.querySelector(".window-title > img[src='icons/loot.svg']")) {
            await updateNpcDropRates();
            await manageLoot();
        };
        const windowOf02 = (icon) => win02.querySelector(`.window-title > img[src='icons/${icon}.svg']`)?.parentNode?.parentNode;
        const isInventoryWindow = windowOf02("inventory");
        if (isInventoryWindow) editInventoryWindow(isInventoryWindow);
        const isTradeWindow = windowOf02("trade");
        if (isTradeWindow) editTradeWindow(isTradeWindow);
        const isComputerWindow = windowOf02("computer");
        if (isComputerWindow) prettyPorts(isComputerWindow);

        const isFilamentWindow = windowOf02("filament");
        if (isFilamentWindow) {
            const upgrader = isFilamentWindow.querySelectorAll("h3")[1];
            if (!upgrader) return;
            const isAnyGreen = Array.from(isFilamentWindow.querySelectorAll("button.green:not(.cantClick)")).slice(1).length
            upgrader.after(new Component("a", {
                style: { width: "311px", display: "inline-block", margin: "0", marginTop: "10px", flex: "0 1 auto" },
                children: [
                    new Component("button", {
                        innerText: "Trade all",
                        classList: ["green", "svelte-ec9kqa", (isAnyGreen ? "can" : "cantClick")],
                        style: { height: "auto", padding: "6px 14px", fontFamily: "var(--font-family-1)", fontSize: "16px", boxShadow: "0 10px 15px var(--color-shadow)" }
                    })
                ],
                onclick: async () => {
                    for (let i = 0; i < 6; i++) {
                        Array.from(isFilamentWindow.querySelectorAll("button.green")).filter(e => e.innerText == "Max")[i]?.click();
                        await sleep(100);
                    }
                }
            }).element);
        }

        if (win02.querySelector(".window-title > img[src='icons/terminal.svg']")) {
            const terminalProgressBar = document.querySelector(".target-bar-progress");
            if (!terminalProgressBar) return
            customTerminal();
            if (player.configuration.currentTheme !== Object.keys(themes)[0])
                new MutationObserver(() => colorizeTerminal()).observe(terminalProgressBar, { attributes: true, attributeFilter: ["style"] });
        }

        const isParamWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/settings.svg']")?.parentNode?.parentNode;
        if (isParamWindow) {
            isParamWindow.querySelector(".slider[min='70']").onchange = (e) => player.configuration.desktopIconSize = e.target.value;
            save();
            isParamWindow.querySelector(".window-content").style.width = "600px";
            let currImage = player.configuration.backgroundImage;
            const wrapper = isParamWindow.querySelector(".window-content > div");
            const shredder = wrapper.querySelector("div:nth-child(4)");
            shredder.querySelectorAll("button.green").forEach(button => button.click());
            shredder.style.display = "none";
            wrapper.querySelector("div:nth-child(1)").innerHTML = wrapper.querySelector("div:nth-child(1)").innerHTML.replace(/You're currently logged in as .+\./, "");
            wrapper.querySelector("div:nth-child(1) > div > div").style.marginTop = 0;
            wrapper.querySelector("button.red").style.height = "30px";

            function updateBackground(size) {
                document.querySelector("body").style.backgroundSize = size;
                document.querySelector("body").style.backgroundImage = currImage || "url(../../../img/bg-tile.png),radial-gradient(at center bottom,#273541,#0b0b0c)";
                currImage && currImage !== "url()" ? player.configuration.backgroundImage = currImage : player.configuration.backgroundImage = null;
                save();
            }

            const borderColor = "transparent"
            const imTypes = ["cpu", "gpu", "psu", "firewall", "other"];
            const imHeadStyle = { textAlign: "center", fontSize: "14px", fontWeight: 600, backgroundColor: "#ffffff33", padding: "3px" };
            const imHeadCell = (innerText, style) => new Component("th", { style: { width: "100px" }, children: [new Component("div", { innerText, style: { ...imHeadStyle, ...style } })] });
            const imHead = () => new Component("thead", {
                children: [
                    new Component("th", { innerText: "", style: { borderBottom: `1px solid ${borderColor}` } }),
                    ...imTypes.map((type, index) => imHeadCell(type.toUpperCase(), { borderTopLeftRadius: index == 0 ? "5px" : 0, borderBottomLeftRadius: index == 0 ? "5px" : 0 })),
                    imHeadCell("ALL", { borderTopRightRadius: "5px", borderBottomRightRadius: "5px" })
                ]
            });
            const imRarityTh = (rarity) => new Component("th", {
                style: { borderBottom: `1px solid ${borderColor}` },
                children: [new Component("div", {
                    innerText: rarity.name[0].toUpperCase() + rarity.name.slice(1),
                    style: { background: rarity.color, color: "white", fontWeight: 600, padding: "5px", borderRadius: "5px", fontSize: "12px", textAlign: "center" }
                })]
            });
            const imHover = (selector) => ({
                onmouseenter: () => document.querySelector(selector).style.backgroundColor = "#ffffff33",
                onmouseleave: () => document.querySelector(selector).style.backgroundColor = "#ffffff11",
            });
            const imOptions = (isSelected) => ["take", "shred", "sell", "nothing"].map(action => new Component("option", { value: action, innerText: action, selected: isSelected(action) }));
            const imSelectStyle = { position: "absolute", top: 0, left: 0, height: "100%", width: "100%", opacity: 0 };
            const imCellStyle = { textAlign: "center", fontSize: "14px", fontWeight: 400, padding: "4px", backgroundColor: "#ffffff11", borderRadius: "5px" };

            const autolootSetting = new Component("table", {
                classList: ["item-manager-content"],
                children: [
                    imHead(),
                    new Component("tbody", {
                        children: lootRarity.slice(0, -1).map(rarity => new Component("tr", {
                            children: [
                                imRarityTh(rarity),
                                ...imTypes.map(type => new Component("td", {
                                    style: { position: "relative", borderBottom: `1px solid ${borderColor}`, cursor: "pointer" },
                                    ...imHover(`.${rarity.name}${type}`),
                                    children: [
                                        new Component("select", {
                                            classList: [`${rarity.name}${type}select`],
                                            style: imSelectStyle,
                                            onchange: (e) => {
                                                player.autoloot[rarity.name][type] = e.target.value;
                                                document.querySelector(`.${rarity.name}${type}`).innerText = e.target.value;
                                                document.querySelector(`.${rarity.name}all`).innerText = allEqual(Object.values(player.autoloot[rarity.name])) ? player.autoloot[rarity.name].cpu : "-";
                                                save();
                                            },
                                            children: imOptions(action => action === player.autoloot[rarity.name][type])
                                        }),
                                        new Component("div", { classList: [`${rarity.name}${type}`], innerText: player.autoloot[rarity.name][type], style: imCellStyle }),
                                    ]
                                })),
                                new Component("td", {
                                    style: { position: "relative", borderBottom: `1px solid ${borderColor}`, borderLeft: "2px solid #ffffff33" },
                                    ...imHover(`.${rarity.name}all`),
                                    children: [
                                        new Component("select", {
                                            style: imSelectStyle,
                                            value: "take",
                                            onchange: (e) => {
                                                for (let type of imTypes) {
                                                    document.querySelector(`.${rarity.name}${type}select`).value = e.target.value;
                                                    document.querySelector(`.${rarity.name}${type}`).innerText = e.target.value;
                                                    document.querySelector(`.${rarity.name}all`).innerText = e.target.value;
                                                    player.autoloot[rarity.name][type] = e.target.value;
                                                    save();
                                                }
                                            },
                                            children: imOptions(action => allEqual(Object.values(player.autoloot[rarity.name])) && action === player.autoloot[rarity.name].cpu)
                                        }),
                                        new Component("div", {
                                            innerText: allEqual(Object.values(player.autoloot[rarity.name])) ? player.autoloot[rarity.name].cpu : "-",
                                            classList: [`${rarity.name}all`],
                                            style: imCellStyle
                                        }),
                                    ]
                                })
                            ]
                        }))
                    })
                ]
            })

            const imPriceStyle = { padding: "4px", borderRadius: "5px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "70px" };
            // Shared trade price validation: apply(value) stores it, then save, then done(value)
            const imPrice = (e, apply, done) => {
                let value = e.target.value;
                if (value == "" || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100000)
                    return e.target.style.border = "1px solid var(--color-red)"
                if (value.includes(".")) {
                    const [before, after] = value.split(".");
                    if (after.length > 5)
                        value = `${before}.${after.slice(0, 4)}${after.split("").find(e => e != "0")}`;
                }
                e.target.value = value;
                apply(value);
                save();
                e.target.style.border = "1px solid var(--color-lightgrey)";
                done?.(value);
            };

            const tradePriceSetting = new Component("table", {
                classList: ["item-manager-content"],
                children: [
                    imHead(),
                    new Component("tbody", {
                        children: lootRarity.map(rarity => new Component("tr", {
                            children: [
                                imRarityTh(rarity),
                                ...imTypes.map(type => new Component("td", {
                                    style: { borderBottom: `1px solid ${borderColor}`, width: "100px" },
                                    children: [
                                        new Component("input", {
                                            classList: [`${rarity.name}${type}`],
                                            style: imPriceStyle,
                                            value: player.tradePricing[rarity.name][type],
                                            onblur: (e) => imPrice(e, value => player.tradePricing[rarity.name][type] = Number(value),
                                                value => document.querySelector(`.${rarity.name}all`).value = allEqual(Object.values(player.tradePricing)) ? value : "")
                                        })
                                    ]
                                })),
                                new Component("td", {
                                    style: { borderBottom: `1px solid ${borderColor}`, borderLeft: "2px solid #ffffff33" },
                                    children: [
                                        new Component("input", {
                                            classList: [`${rarity.name}all`],
                                            style: imPriceStyle,
                                            value: allEqual(Object.values(player.tradePricing[rarity.name])) ? player.tradePricing[rarity.name].cpu.toString() : "",
                                            onblur: (e) => imPrice(e, value => {
                                                for (let type of imTypes) {
                                                    player.tradePricing[rarity.name][type] = Number(value);
                                                    document.querySelector(`.${rarity.name}${type}`).value = value;
                                                }
                                            })
                                        })
                                    ]
                                })
                            ]
                        }))
                    })
                ]
            })

            const imTab = (innerText, cls, transform, table) => new Component("span", {
                innerText,
                classList: [cls],
                style: { padding: "7px", width: "100%", cursor: "pointer", borderBottom: "2px solid #ffffff33" },
                onmouseenter: (e) => e.target.style.backgroundColor = "#ffffff33",
                onmouseleave: (e) => e.target.style.backgroundColor = null,
                onclick: (e) => {
                    const slider = document.querySelector(".tab-slider");
                    if (slider.style.transform === transform) return
                    slider.style.transform = transform;
                    document.querySelector(".item-manager-content")?.remove();
                    document.querySelector(".item-manager-body")?.append(table.element);
                }
            });
            const itemManager = new Component("div", {
                classList: ["el", "svelte-176ijne"],
                style: { display: "flex", flexDirection: "column", gap: "10px" },
                children: [
                    new Component("h4", { innerText: "Item Manager" }),
                    new Component("div", {
                        classList: ["item-manager-tabs"],
                        style: { display: "flex", justifyContent: "center", position: "relative" },
                        children: [
                            new Component("div", {
                                classList: ["tab-slider"],
                                style: { position: "absolute", bottom: 0, left: 0, height: "2px", width: "50%", backgroundColor: "white", transitionDuration: "0.3s", transform: "translateX(0)" }
                            }),
                            imTab("Auto Loot", "item-manager-loot", "translateX(0)", autolootSetting),
                            imTab("Trade Pricing", "item-manager-pricing", "translateX(100%)", tradePriceSetting)
                        ]
                    }),
                    new Component("div", { classList: ["item-manager-body"], children: [autolootSetting] })
                ]
            })

            const setWindowColor = (color) => {
                player.configuration.windowColors = { windowBorder: color, windowTabLight: color, windowTabDark: halfColor(color) };
                save();
                loadStyle();
            };

            const textInputStyle = { padding: "10px", borderRadius: "2px", textAlign: "left", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", zIndex: "60" };
            const tabColorSetting = new Component("div", {
                classList: ["el", "svelte-176ijne"],
                style: { display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" },
                children: [
                    new Component("h4", { innerText: "Window Color" }),
                    new Component("div", {
                        style: { marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" },
                        children: [
                            new Component("input", {
                                type: "color",
                                classList: ["tab-color-picker"],
                                style: { height: "35px", width: "60px", border: "none", borderRadius: "2px", cursor: 'pointer', paddingInline: "2px" },
                                value: player.configuration.windowColors.windowTabLight,
                                onchange: async (e) => {
                                    document.querySelector(".tab-color-input").value = e.target.value;
                                    setWindowColor(e.target.value);
                                }
                            }),
                            new Component("input", {
                                type: "text",
                                classList: ["tab-color-input"],
                                placeholder: "Ex: #ffffff",
                                value: player.configuration.windowColors.windowTabLight,
                                style: { width: "150px", ...textInputStyle },
                                onblur: (e) => {
                                    if (!e.target.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
                                        return
                                    document.querySelector(".tab-color-picker").value = e.target.value;
                                    setWindowColor(e.target.value);
                                }
                            }),
                        ]
                    }),
                    new Component("button", {
                        innerText: "Reset",
                        classList: ["red", "svelte-ec9kqa"],
                        style: { height: "35px", width: "85px" },
                        onclick: () => {
                            player.configuration.windowColors = defaultColors;
                            save();
                            document.querySelector(".tab-color-picker").value = defaultColors.windowTabLight;
                            document.querySelector(".tab-color-input").value = defaultColors.windowTabLight;
                            loadStyle();
                        }
                    })
                ]
            })

            const backgroundSetting = new Component("div", {
                classList: ["el", "svelte-176ijne"],
                children: [
                    new Component("h4", { innerText: "Edit background image" }),
                    new Component("div", {
                        style: { marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px" },
                        children: [
                            new Component("button", {
                                innerText: "Upload",
                                classList: ["grey", "svelte-ec9kqa"],
                                style: { height: "35px", width: "85px" },
                                onclick: () => {
                                    const input = new Component("input", {
                                        type: "file",
                                        onchange: (e) => {
                                            const file = e.target.files[0];
                                            const fileReader = new FileReader();
                                            fileReader.onload = function () {
                                                currImage = `url(${fileReader.result})`;
                                                updateBackground("cover");
                                            }
                                            fileReader.readAsDataURL(file)
                                        }
                                    })
                                    input.element.click();
                                }
                            }),
                            new Component("div", { innerText: "or" }),
                            new Component("input", {
                                type: "text",
                                placeholder: "Import from url",
                                style: { width: "200px", ...textInputStyle },
                                onblur: (e) => {
                                    if (e.target.value === "") return;
                                    currImage = `url(${e.target.value})`;
                                    e.target.value = "";
                                    updateBackground("cover");
                                }
                            }),
                            new Component("button", {
                                innerText: "Reset",
                                classList: ["red", "svelte-ec9kqa"],
                                style: { height: "35px", width: "85px" },
                                onclick: () => {
                                    currImage = null;
                                    updateBackground("auto");
                                }
                            })
                        ]
                    })
                ]
            })

            wrapper.insertBefore(backgroundSetting.element, wrapper.querySelector("div:nth-child(2)"));
            wrapper.insertBefore(tabColorSetting.element, wrapper.querySelector("div:nth-child(2)"));
            wrapper.insertBefore(itemManager.element, wrapper.querySelector("div:nth-child(1)"));
        }

        const hasBeenHackedWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/hack.svg']") && newWindow.addedNodes[0].querySelector(".window-title")?.innerText?.trim() == "Hacked"
        if (hasBeenHackedWindow) hasBeenHacked(newWindow.addedNodes[0]);

        const isLogWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/log.svg']")
        if (isLogWindow) {
            editWelcomeMessage();
            logObserver.observe(isLogWindow?.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > #wrapper"), { attributes: false, childList: true, characterData: false, subtree: true });
        }

        const targetWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/target.svg']")?.parentNode?.parentNode;
        if (targetWindow) {
            // useful to check whether it's an actual player
            const reportButton = targetWindow.querySelector("#report");
            const elementWithUsername = targetWindow.querySelector(`#top-wrapper > div > div:nth-child(2) > div:nth-child(${reportButton ? 2 : 1}) > div`);
            const elementWithID = targetWindow.querySelector(`#top-wrapper > div > div:nth-child(2) > div:nth-child(${reportButton ? 4 : 3})`);
            const getTargetID = () => elementWithID.innerText.replace("ID: ", "");
            const getTargetUsername = () => elementWithUsername.innerText;

            elementWithID.onclick = () => {
                navigator.clipboard.writeText(getTargetID())
                    .then(() => sendLog(`<img class="icon" src="icons/check.svg"/> Succesfully copied target ID to clipboard`))
                    .catch(() => sendLog(`<img class="icon" src="icons/close.svg"/> Could not copy target ID to clipboard`))
            }

            const punishButton = new Component("div", {
                style: { position: "absolute", right: "26px", top: "2px", padding: "2px 4px", borderRadius: "2px" },
                id: "punish",
                children: [new Component("img", { classList: ["icon"], src: "https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg", alt: "Punish", style: { filter: "invert(60%)" } })],
                onclick: () => {
                    for (const comment of targetWindow.querySelectorAll(".comment-wrapper")) comment.remove();
                    const lines = targetWindow.querySelectorAll(".line");
                    if (lines.length === 2) lines[1].remove();

                    const buttonsContainer = targetWindow.querySelector(".section-content > div:nth-child(2)");
                    buttonsContainer.querySelector("div > a > button > img[src='icons/hack.svg']")?.parentNode?.parentNode?.parentNode?.remove();
                    buttonsContainer.querySelector("div > a > button > img[src='icons/trade.svg']")?.parentNode?.parentNode?.parentNode?.remove();
                    targetWindow.querySelector(".window-content").style.height = "fit-content";

                    const punishOptionsContainer = new Component("div", { style: { marginTop: "5px", display: "flex" } });
                    buttonsContainer.appendChild(punishOptionsContainer.element);

                    let selectedPunishCommand = "";
                    const createPunishOption = (buttonText, punishCommand, color, iconSrc, iconAlt) => {
                        const punishOption = new Component("div", {
                            style: { display: "flex", flexDirection: "column", flex: "1" },
                            children: [new Component("a", {
                                style: { width: "100%", display: "inline-block", margin: "0px", flex: "0 1 auto" },
                                children: [new Component("button", {
                                    classList: [color, "svelte-ec9kqa"],
                                    style: { height: "auto", padding: "6px 0", fontFamily: "var(--font-family-1)", fontSize: "16px", boxShadow: "0 10px 15px var(--color-shadow)" },
                                    innerHTML: `<img class="icon icon-in-text" src="${iconSrc}" alt="${iconAlt}">${buttonText}`,
                                    onclick: () => {
                                        selectedPunishCommand = punishCommand;
                                        updateOutputBox();
                                    },
                                })],
                            })],
                        });
                        punishOptionsContainer.element.appendChild(punishOption.element);
                    }

                    createPunishOption("Mute", "mute", "green", "emojis/zipper-mouth-face.svg", "Zipper Mouth Face");
                    createPunishOption("Ban", "ban", "yellow", "https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg", "Legal Hammer");
                    createPunishOption("IP Ban", "ip-ban", "red", "emojis/pile-of-poo.svg", "Pile Of Poo");

                    const durationFormats = {
                        minutes: 1, hours: [60, "minutes"], days: [24, "hours"], weeks: [7, "days"], months: [30, "days"],
                        quarters: [3, "months"], years: [365, "days"], decades: [10, "years"], centuries: [100, "years"], millenia: [1000, "years"],
                    };
                    function calculateDurationInMinutes(duration, durationFormat) {
                        const durationFormatInfo = durationFormats[durationFormat];
                        if (Array.isArray(durationFormatInfo)) return calculateDurationInMinutes(durationFormatInfo[0] * duration, durationFormatInfo[1]);
                        return durationFormatInfo * duration;
                    }

                    const inputStyle = { padding: "4px", borderRadius: "3px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "100%", outline: "none" };
                    const durationInput = new Component("input", {
                        id: "punishDuration", type: "number", min: 1, value: 60, size: 5,
                        style: inputStyle,
                        oninput: () => updateOutputBox(),
                        onwheel: event => {
                            event.preventDefault();
                            event.target.value = Number(event.target.value) + (event.deltaY < 0 ? 1 : -1);
                            updateOutputBox();
                        }
                    });
                    const durationFormat = new Component("select", {
                        id: "punishDurationFormat",
                        children: Object.keys(durationFormats).map(durationFormat => new Component("option", { value: durationFormat, innerText: capitalize(durationFormat) })),
                        onchange: () => updateOutputBox(),
                        style: { width: "100%" }
                    });
                    const durationContainer = new Component("div", { children: [durationInput, durationFormat], style: { marginTop: "5px", display: "flex" } });
                    buttonsContainer.appendChild(durationContainer.element);

                    const outputCommandBox = new Component("input", { id: "punishOutputCommand", style: inputStyle });
                    const sendOutputCommandButton = new Component("button", {
                        innerText: "Send",
                        classList: ["blue", "svelte-ec9kqa"],
                        style: { padding: "6px 0", width: "51%" },
                        onclick: () => sendChatMessage(outputCommandBox.element.value),
                    });
                    const outputContainer = new Component("div", { children: [outputCommandBox, sendOutputCommandButton], style: { marginTop: "5px", display: "flex", height: "36px" } });
                    buttonsContainer.appendChild(outputContainer.element);

                    function updateOutputBox() {
                        const sendDmButton = buttonsContainer.querySelector("div > a > button > img[src='icons/friends.svg']");
                        const usernameOrId = sendDmButton ? getTargetUsername() : getTargetID();
                        const durationInMinutes = calculateDurationInMinutes(durationInput.element.value, durationFormat.element.value);
                        outputCommandBox.element.value = `/${selectedPunishCommand} ${usernameOrId} ${durationInMinutes}`;
                    }
                },
            });
            reportButton?.parentNode.appendChild(punishButton.element);
        }

        const isHackingSomeoneWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']")?.parentNode?.parentNode
        if (isHackingSomeoneWindow) {
            const hacked = isHackingSomeoneWindow.querySelector(".username")?.innerText;
            if (hacked) player.currentlyHacking = hacked;
            const isHackingYou = player.hacksInProgress.find(e => e.hacker == hacked);
            if (!isHackingYou) return;
            counterHack(isHackingYou);
        }

        const hasHackedSomeoneWindow = newWindow.addedNodes[0].querySelectorAll(".window-content > div > .el").length == 4;
        if (hasHackedSomeoneWindow) {
            const hacked = newWindow.addedNodes[0].querySelector(".window-content > div > .el:nth-child(1) > .wrapper > .username")?.innerText
            const wasHackingYou = player.hacksInProgress.find(e => e.hacker === hacked);
            if (!wasHackingYou) return;
            wasHackingYou.hackLabel.innerText = "Successfully counter " + wasHackingYou.hackLabel.innerText.replace(/is hacking you \(\d+%\) on port \d+/, "")
            wasHackingYou.message.style.backgroundColor = "transparent";
            Object.assign(wasHackingYou.message, { onclick: null, onmouseenter: null, onmouseleave: null });
            player.hacksInProgress.splice(player.hacksInProgress.indexOf(wasHackingYou), 1);
            for (const key of ["progressBar", "counterLabel", "counterProgressBar", "counterProgressBarValue", "footer"]) wasHackingYou[key].remove();
            wasHackingYou.hackObserver.disconnect();
        }
    });

    const editWelcomeMessage = () => {
        const message = document.querySelector(".window-title > img[src='icons/log.svg']").parentNode.parentNode.querySelector("#wrapper > div");
        if (!message) return;
        message.innerHTML = message.innerHTML
            .replace("System started.<br>", "")
            .replace("s0urceOS 2023", "🔥 2spiCore (d0urce Fork) v" + VERSION + " 🔥")
            .replace(">.", ">. <br><span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Expanded by <span style='color: chartreuse; text-shadow: 0 0 3px chartreuse'>2spi</span> 😍.</span>")
            .replace(">.", `>. <br><span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Template made by <span style='color: pink; text-shadow: 0 0 3px pink'>Xen0o2 & d0t</span>.</span>`);
        sendLog(`
            <div style="color: #52e7f7; text-shadow: 0 0 2px #0fa, 0 0 3px #52e7f7; letter-spacing: 0.3px; font-weight: lighter; margin-bottom: 8px;">
                New In 1.1.0:
            </div>
        ` + [
            ["/510901/check", "#f75252", "Alt Accounts Support"],
            ["532323/lock-alt", "#52e7f7", "Displaying Daily BTC Earnings"],
            ["446742/statistics", "#f75252", "NPC Drop Rates Statistics"],
            ["506534/percentage", "#f75252", "Item Window Drop Rates (d0urce update)"],
            ["308635/home-value-house-price-home-price-house-value", "#52e7f7", "Networth Corrections  (d0urce update)"],
        ].map(([icon, color, text]) => `            <div style="display: flex; align-items: center; gap: 8px; margin: 6px 0;">
                <img class="icon" src="https://www.svgrepo.com/show/${icon}.svg" style="filter: drop-shadow(50px 0px 100px ${color}) invert(96%) sepia(95%) saturate(7486%) hue-rotate(143deg) brightness(100%) contrast(94%);"></img>
                <span>${text}</span>
            </div>
        `).join("") + "            ")
    };

    const filamentObserver = new MutationObserver(function (mutations) {
        if (mutations.length == 1 && !mutations[0].target.id && player.configuration.displayCustomFilament != "default")
            updateFilaments();
    })

    const formulas = {
        "common": "cf", "uncommon": "uf + (cf / 3)", "rare": "rf + (uf / 3) + (cf / 9)", "epic": "ef + (rf / 3) + (uf / 9) + (cf / 27)",
        "legendary": "lf + (ef / 5) + (rf / 15) + (uf / 45) + (cf / 135)",
        "mythic": "mf + (lf / 3) + (ef / 15) + (rf / 45) + (uf / 145) + (cf / 405)",
        "ethereal": "etf + (mf / 5) + (lf / 15) + (ef / 75) + (rf / 225) + (uf / 675) + (cf / 2025)",
    }

    const updateFilaments = () => {
        try {
            const filaments = document.querySelectorAll(".filament-el");
            const [cf, uf, rf, ef, lf, mf, etf] = Array.from(filaments).map(e => parseInt(e.innerText.trim()));
            const total = eval(formulas[player.configuration.displayCustomFilament]).toFixed(4);
            const element = document.querySelector("#customFilament");
            if (element) element.innerHTML = element.innerHTML.replace(/^\d+\.\d+/, total);
            return total;
        } catch (e) {
            console.log(e);
            coreLoadFails("7");
        }
    }

    const editFilaments = () => {
        try {
            const filaments = document.querySelectorAll(".filament-el");
            const container = filaments[0].parentNode.parentNode;
            container.style.rowGap = null;
            container.style.position = "relative";
            filaments.forEach(e => e.style.display = "none");

            const total = updateFilaments();
            const totalFilament = new Component("div", {
                id: "customFilament",
                innerText: total.toString(),
                classList: ["filament-el", "svelte-1azjldn"],
                style: { height: "100%", width: "auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", fontSize: "1.5rem", paddingLeft: "10px" },
                children: [new Component("img", {
                    src: `icons/filament-${player.configuration.displayCustomFilament}.svg`,
                    classList: ["icon", "icon-in-text", "totalFilamentIcon"],
                    style: { transform: "translateY(-1px)" }
                })]
            })

            const select = new Component("select", {
                style: { position: "absolute", height: "100%", width: "100%", opacity: 0 },
                children: ["Default", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "Ethereal"].map(rarity => new Component("option", {
                    value: rarity.toLowerCase(),
                    innerText: rarity,
                    selected: player.configuration.displayCustomFilament === rarity.toLowerCase(),
                })),
                onchange: (e) => {
                    player.configuration.displayCustomFilament = e.target.value;
                    if (e.target.value === "default") {
                        totalFilament.element.style.display = "none";
                        filaments.forEach(e => e.style.display = "block");
                    } else {
                        totalFilament.element.style.display = "flex";
                        filaments.forEach(e => e.style.display = "none");
                        document.querySelector(".totalFilamentIcon").src = `icons/filament-${e.target.value}.svg`
                        updateFilaments();
                    }
                }
            })

            container.append(totalFilament.element);
            container.append(select.element);
            filamentObserver.disconnect();
            filamentObserver.observe(container, { subtree: true, characterData: true, childList: true });
        } catch (e) {
            coreLoadFails("6")
        }
    }

    const loadingScreen = (action) => {
        switch (action) {
            case "create":
                const display = new Component("div", {
                    id: "display-delete",
                    style: { position: "absolute", zIndex: "100", top: "0", height: "100vh", width: "100vw", backgroundColor: "black", opacity: "0.8", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
                    children: [
                        new Component("span", { innerText: "2spiCore", style: { color: "cornflowerblue", textShadow: "0 0 3px blue", fontFamily: "var(--font-family-2)", fontWeight: "500", fontSize: "3rem", opacity: "1" } }),
                        new Component("span", { innerText: "Running Version " + VERSION, style: { color: "var(--color-lightgrey)", fontFamily: "var(--font-family-2)", fontWeight: "500", fontSize: "2rem", marginTop: "20px" } }),
                        new Component("img", { src: "https://s0urce.io/img/agent.gif", alt: "Pepe Hacker" })
                    ]
                })
                document.querySelector("html").append(display.element);
                break;
            case "delete":
                document.getElementById("display-delete")?.remove();
                break;
        }
    }

    const createObserver = () => {
        const options = { attributes: false, childList: true, characterData: false, subtree: true };
        const logWindow = document.querySelector(".window-title > img[src='icons/log.svg']")?.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > #wrapper");
        if (logWindow) logObserver.observe(logWindow, options);
        windowOpenObserver.observe(document, options);
        windowCloseObserver.observe(document, options);
        itemHoverObserver.observe(document.querySelector("main"), options);
        const btcBalanceDiv = document.querySelector('img[src="icons/btc.svg"]').parentElement;
        if (btcBalanceDiv) btcBalanceObserver.observe(btcBalanceDiv, { characterData: true, subtree: true });
    }

    const updateThemeStyle = () => {
        const styleElement = document.getElementById('customStyles');
        const css = themes[player.configuration.currentTheme];
        if (styleElement) styleElement.textContent = css;
        else document.head.appendChild(Object.assign(document.createElement('style'), { id: 'customStyles', textContent: css }));
    }

    const save = () => {
        if (!player.username) return;
        localStorage.setItem(`2spiCore-${player.username}`, JSON.stringify(player));
    };

    const loadLocalStorage = async () => {
        while (!player.username) {
            player.username = document.querySelector("img[src='icons/online.svg']")?.parentNode?.innerText?.trim();
            if (!player.username) await sleep(200);
        };
        
        if (!localStorage.getItem(`2spiCore-${player.username}`)) {
            save();
        } else {
            player = JSON.parse(localStorage.getItem(`2spiCore-${player.username}`));
        };

        const body = document.querySelector("body");
        const backgroundImage = player.configuration.backgroundImage;
        if (backgroundImage) {
            body.style.backgroundImage = backgroundImage;
            body.style.backgroundSize = "cover";
        } else body.style.backgroundSize = "auto";
        body.style.backgroundAttachment = "fixed";
        body.style.backgroundPosition = "center";
    }

    const loadScripts = async () => {
        for (let script of ["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/python.min.js"]) {
            await new Promise((resolve) => {
                fetch(script)
                    .then(response => response.text())
                    .then(scriptText => {
                        const scriptElement = document.createElement('script');
                        scriptElement.textContent = scriptText;
                        document.head.appendChild(scriptElement);
                        resolve();
                    })
                    .finally(() => resolve());
            })
        }
    }

    const openWindow = async (windowName, openInSilent = false) => {
        if (!windowNames.includes(windowName)) return;
        const iconName = windowName.split(" ").map((e, i) => i == 0 ? e.toLowerCase() : e).join("");
        if (openInSilent && !player.configuration.openInSilent.includes(iconName)) player.configuration.openInSilent.push(iconName)
        if (windowName === "Settings") document.querySelector("button.topbar-clickable")?.click();
        else document.querySelector(`.${windowName.replace(/ /g, "-")}-Desktop-Icon`)?.click();
        await sleep(300);
        return document.querySelector(`.window-title > img[src='icons/${iconName}.svg']`)?.parentNode.parentNode;
    }

    const closeWindow = (windowName, onlyIfSilent = false) => {
        if (!windowNames.includes(windowName)) return;
        const iconName = windowName.split(" ").map((e, i) => i == 0 ? e.toLowerCase() : e).join("");
        const index = player.configuration.openInSilent.indexOf(iconName);
        if (index >= 0) player.configuration.openInSilent.splice(index, 1);
        const windowToClose = document.querySelector(`.window-title > img[src='icons/${iconName}.svg']`)?.parentNode.parentNode;
        if (!windowToClose) return;
        if (!onlyIfSilent || windowToClose.classList.contains("openInSilent")) windowToClose.querySelector(".window-close")?.click();
    }

    const moveItem = async (item, slot) => {
        item.dispatchEvent(new MouseEvent("mousedown"));
        item.parentNode.dispatchEvent(new MouseEvent("dragstart"));
        slot.parentNode.dispatchEvent(new MouseEvent("drop"));
        await sleep(50);
    }

    const itemRarity04 = (item) => raritiesVariables[item.style.background] || raritiesVariables[item.style.background + ")"];
    // true if the selection has a legendary+ item and the user cancels the confirm
    const confirmDangerous04 = (action) => player.selectedItems.map(itemRarity04).some(rarity => ["legendary", "mythic", "ethereal"].includes(rarity)) &&
        !confirm(`You're about to ${action} a Legendary, Mythic or Ethereal item ! Are you sure about that ?`);

    const shredFromContextMenu = async () => {
        if (confirmDangerous04("shred")) return;
        const filamentWindow = await openWindow("Filament", true);
        if (!filamentWindow) return;
        for (let index in player.selectedItems) {
            const item = player.selectedItems[index];
            const rarity = itemRarity04(item);
            const slot = filamentWindow.querySelectorAll(".item-slot")[index % 5];
            const color = lootRarity.find(e => e.name === rarity)?.color;
            await moveItem(item, slot);
            await sleep(50);
            sendLog(`
                <img class="icon" src="icons/check.svg"/>
                Successfully shredded ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"}
                <span style='background: ${color}; border-radius: 5px; padding: 2px 5px 2px 5px;'>${rarity}</span>
                item
            `);
            if ((Number(index) + 1) % 5 == 0) {
                filamentWindow.querySelector("button.green")?.click();
                await sleep(300);
            }
        }
        await sleep(200);
        filamentWindow.querySelector("button.green")?.click();
        closeWindow("Filament", true);
    }

    const sellFromContextMenu = async (item) => {
        if (confirmDangerous04("sell")) return;
        const itemSellerWindow = await openWindow("Item Seller", true);
        if (!itemSellerWindow) return;
        for (let item of player.selectedItems) {
            await moveItem(item, itemSellerWindow.querySelector(".item-slot"));
            await sleep(100);
            itemSellerWindow.querySelector("button.green")?.click();
            await sleep(400);
        }
        closeWindow("Item Seller", true);
    }

    const dblclickItem04 = (windowName) => async (item) => {
        await windowManager.openWindow(windowName, true);
        item.parentNode.dispatchEvent(new MouseEvent("dblclick"));
        await sleep(100);
        windowManager.closeWindow(windowName, true);
    }
    const unequipItem = dblclickItem04("inventory");
    const equipBasicItem = dblclickItem04("computer");

    const manageRightClickOnItem = (item, pointer) => {
        const src = item.closest(".window").querySelector(".window-title > img")?.src
        const windowName = src?.split("/").pop().slice(0, -4);
        if (!windowName) return;

        if (!player.selectedItems.includes(item)) {
            removeContextMenu();
            player.selectedItems = [item]
        }

        item.parentNode.parentNode.classList.add("item-selected");
        item.parentNode.parentNode.style.outline = "3px solid var(--color-terminal)";
        const popup = new Popup(pointer);
        const type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7);
        if (player.selectedItems.length > 1) popup.setFooter(`${player.selectedItems.length} items selected`)
        if (["cpu", "gpu", "psu"].includes(type) && player.selectedItems.length == 1) {
            if (windowName === "computer") popup.addAction("Unequip", () => unequipItem(item), { selectionLimit: 1 });
            else popup.addAction("Equip", () => equipBasicItem(item), { selectionLimit: 1 });
        }
        const tradeWindow = document.querySelector(".window:has(.window-title > img[src='icons/trade.svg']");
        if (tradeWindow) {
            const alreadyInTrade = tradeWindow.querySelector(".offer-wrapper")?.querySelectorAll(".item").length;
            popup.addAction("Trade", async () => {
                const slots = tradeWindow.querySelector(".offer-wrapper").querySelectorAll(".item-slot:not(.item-slot-hasitem");
                for (let index in player.selectedItems) {
                    moveItem(player.selectedItems[index], slots[index]);
                    await sleep(1000);
                }
            }, { selectionLimit: 6 - alreadyInTrade });
        }
        popup.addAction("Shred", shredFromContextMenu, { isDangerous: true }).addAction("Sell", sellFromContextMenu, { isDangerous: true }).create();
    }

    const simulateMouseHover = (selector) => {
        const element = document.querySelector(selector);
        if (element) element.dispatchEvent(new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true }));
    };

    const simulateMousePressDown = (selector) => {
        const element = document.querySelector(selector);
        if (element) element.dispatchEvent(new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true }));
    };

    const manageRightClickOnDesktop = (pointer) => {
        new Popup(pointer).addAction("Edit background", async () => {
            document.querySelectorAll(".topbar-clickable")[1].click()
            await sleep(150);
            document.querySelector(".window-title > img[src='icons/settings.svg']").parentNode.parentNode.querySelector(".window-content > div").scrollTop = 300
        }).create();
    }

    const manageRightClickOnPlayer = (player, pointer) => {
        const clickTargetButton = (selector) => async () => {
            player.click();
            await sleep(100);
            document.querySelector(selector)?.click();
            document.querySelector(".window-title > img[src='icons/target.svg']")?.parentNode.querySelector(".window-close")?.click();
        };
        new Popup(pointer).addAction("Send message", clickTargetButton("button.blue")).addAction("Trade", clickTargetButton("button.yellow")).create();
    }

    const manageRightClick = (target, pointer) => {
        if (document.querySelector(".context-menu")) removeContextMenu();
        const windowClicked = target.closest(".window")
        if (target.parentNode && target.parentNode.classList.contains("item") && ["Computer", "Inventory"].includes(windowClicked?.querySelector(".window-title > img")?.alt))
            manageRightClickOnItem(target.parentNode, pointer);
        if (target.id == "desktop-container" || target.classList.contains("empty")) manageRightClickOnDesktop(pointer);
        if (target.classList.contains("message-name")) manageRightClickOnPlayer(target, pointer);
    }

    const manageItemSelection = (item) => {
        if (player.input.isShiftDown) {
            player.selectedItems.push(item);
            document.querySelectorAll(`.context-menu-option-limit-${player.selectedItems.length + 1}`).forEach(e => e.remove());
            if (document.querySelector(".context-menu")) {
                const footer = document.querySelector(".context-menu-footer");
                footer.innerText = `${player.selectedItems.length} items selected`;
                footer.style.display = "flex";
            }
        } else player.selectedItems = [item]
        item.parentNode.parentNode.classList.add("item-selected");
        item.parentNode.parentNode.style.outline = "3px solid var(--color-terminal)";
        player.selectedItems.sort((b, a) => ([...a.parentNode?.parentNode?.parentNode?.parentNode.children].indexOf(a.parentNode?.parentNode?.parentNode) || 0) -
            ([...b.parentNode?.parentNode?.parentNode?.parentNode.children].indexOf(b.parentNode?.parentNode?.parentNode) || 0))
    }

    const altNavigate = (e) => {
        var tabs = {};
        document.querySelectorAll("body > div > main > div.window.svelte-1hjm43z > div.window-title.svelte-1hjm43z").forEach(div => { tabs[div.innerText] = div; });
        if (e.key === '@') // Custom Navigation
            return "ifgTtaM".split("").forEach(key => altNavigate(new KeyboardEvent('keydown', { key })));
        const name = ({
            __proto__: null, c: "Computer", i: "Inventory", t: "Target List", T: "Terminal", n: "Season Pass", F: "Friends", l: "Log", I: "Item Seller",
            P: "Premium", s: "Shop", L: "Leaderboard", w: "Country Wars", M: "Task Manager", 0: "s0urce Browser", u: "Upgrader", S: "Spotify", v: "VPN",
            f: "Filament", p: "3D Printer", g: "Global Chat", a: "Agents", m: "Mail"
        })[e.key];
        if (!name) return;
        try { tabs[name].childNodes[4].click() }
        catch { divs[name].click() }
    }

    const sumPx = (a, b) => Number((a.match(/\d+px/) || [""])[0].slice(0, -2)) + Number((b.match(/\d+px/) || [""])[0].slice(0, -2));
    const pxToInt = (a) => (a.match(/\d+/) || [])[0];
    const findClosestValue = (arr, target) => arr.reduce((closest, num) => Math.abs(num - target) < Math.abs(closest - target) ? num : closest);

    // const manageWindowDragged = () => {
    //     const windowDragged = document.querySelector(".window-selected");
    //     const content = windowDragged?.querySelector(".window-content");
    //     if (!windowDragged || !content) return;
    //     if (windowDragged.querySelector(".window-title > img[src='icons/settings.svg']")) content.style.width = "600px";

    //     const getPxValue = (style) => Number(style.match(/\d+/)[0]);
    //     const top = getPxValue(windowDragged.style.top), bottom = sumPx(windowDragged.style.top, content.style.height) + 41;
    //     const left = getPxValue(windowDragged.style.left), right = sumPx(windowDragged.style.left, content.style.width) + 2;
    //     const allPositions = Array.from(document.querySelectorAll(".window")).filter(e => e !== windowDragged).map(e => {
    //         const content = e.querySelector(".window-content");
    //         return {
    //             name: e.querySelector(".window-title").textContent, top: getPxValue(e.style.top), bottom: sumPx(e.style.top, content.style.height) + 42,
    //             left: getPxValue(e.style.left), right: sumPx(e.style.left, content.style.width) + 1,
    //         };
    //     });
    //     const sensitivity = 10;
    //     const findMatching = (pos, key1, key2) => allPositions.find(e =>
    //         (pos >= e[key1] - sensitivity && pos <= e[key1] + sensitivity) || (pos >= e[key2] - sensitivity && pos <= e[key2] + sensitivity));
    //     const topMatching = findMatching(top, 'top', 'bottom'), bottomMatching = findMatching(bottom, 'top', 'bottom');
    //     const rightMatching = findMatching(right, 'right', 'left'), leftMatching = findMatching(left, 'right', 'left');

    //     const createLine = (style) => document.body.append(new Component("div", {
    //         classList: ["sticky-line"], style: { position: "absolute", backgroundColor: "var(--color-terminal)", zIndex: 1000, ...style }
    //     }).element);
    //     const hLine = (value) => createLine({ top: `${value}px`, height: "2px", width: "100vw" });
    //     const vLine = (value) => createLine({ top: "0px", height: "100vh", width: "2px", left: `${value}px` });
    //     document.querySelectorAll(".sticky-line").forEach(e => e.remove());

    //     if (topMatching) {
    //         const value = findClosestValue([topMatching.top, topMatching.bottom], top);
    //         windowDragged.style.top = `${value}px`; hLine(value);
    //     }
    //     if (bottomMatching) {
    //         const value = findClosestValue([bottomMatching.top, bottomMatching.bottom], bottom);
    //         windowDragged.style.top = `${value - pxToInt(content.style.height) - 42}px`; hLine(value);
    //     }
    //     if (rightMatching) {
    //         const value = findClosestValue([rightMatching.right, rightMatching.left], right);
    //         windowDragged.style.left = `${value - pxToInt(content.style.width) - 2}px`; vLine(value);
    //     }
    //     if (leftMatching) {
    //         const value = findClosestValue([leftMatching.right, leftMatching.left], left);
    //         windowDragged.style.left = `${value}px`; vLine(value);
    //     }
    // };

    const loadUserInputManager = () => {
        document.body.addEventListener("mousedown", (e) => {
            if (e.buttons != 1) return;
            const windowClicked = e.target.closest(".window");
            if ((e.target.classList.contains("window-close") || e.target.parentNode?.classList.contains("window-close")) && windowClicked.querySelector(".window-title").textContent.trim() == "Settings")
                windowClicked.querySelector(".window-close")?.click();
            if (!e.target.classList.contains("context-menu") && !player.input.isShiftDown) removeContextMenu();
            if (e.target.parentNode && e.target.parentNode.classList.contains("item") && ["Computer", "Inventory", "Trade"].includes(windowClicked?.querySelector(".window-title > img")?.alt))
                manageItemSelection(e.target.parentNode);
            // if (e.target.classList.contains("window-title")) window.addEventListener("mousemove", manageWindowDragged);
        })
        // document.body.addEventListener("mouseup", () => {
        //     document.querySelectorAll(".sticky-line").forEach(e => e.remove());
        //     window.removeEventListener("mousemove", manageWindowDragged);
        // })
        document.body.oncontextmenu = (e) => {
            e.preventDefault();
            manageRightClick(e.target, { clientX: e.clientX, clientY: e.clientY });
        }
        document.body.onkeydown = (e) => {
            if (e.key === "Shift") player.input.isShiftDown = true;
            else if (e.altKey) altNavigate(e);
        }
        document.body.onkeyup = (e) => { if (e.key === "Shift") player.input.isShiftDown = false; }
    }

    const loadStyle = () => {
        console.log(player.configuration)
        const wc = player.configuration.windowColors;
        const css = `
            .over {transform: scale(1.1, 1.1); border: 2px solid var(--color-terminal);}
            .insert-indicator {height: 3px;background-color: var(--color-terminal);width: 320px;margin-left:15px;border-radius:10px;}
            ${wc.windowTabDark != defaultColors.windowTabDark && `
                .message.svelte-pu3iit {background: ${wc.windowTabDark} !important;}
                .svelte-81yxrq {background: ${halfColor(wc.windowTabDark)} !important;}
                .svelte-1ff1jo {background: ${wc.windowTabDark} !important;}
                .search-tag.svelte-1ff1jo {background: ${wc.windowTabLight} !important;}
                .svelte-1p12gtw:not(.npc):not(.timer) {background-color: unset !important;}
                .section.svelte-1ti1fiv {background: linear-gradient(188deg, ${wc.windowTabDark} 60%, ${halfColor(wc.windowTabDark)} 100%) !important;}
                .window:not(:has(.window-title > img[src='icons/terminal.svg'])) {
                    border-color: ${wc.windowTabLight} !important;
                    background: linear-gradient(200deg, #000000 0%, ${halfColor(wc.windowTabLight)} 100%) !important;
                }
                .window-title:not(:has(img[src='icons/terminal.svg'])) {border-top-left-radius: 2px !important; border-top-right-radius: 2px !important; background: linear-gradient(200deg, ${wc.windowTabLight} 0%, ${wc.windowTabDark} 100%) !important;}
                `
            }
        `;
        const already = document.getElementById("globalCustomStyles")
        if (already) already.textContent = css;
        else document.head.appendChild(Object.assign(document.createElement('style'), { id: 'globalCustomStyles', textContent: css }));
    }

    const loadNote = () => {
        // unholy kebab
        const windowDiv = document.createElement('div'); windowDiv.classList.add('window', 'svelte-1hjm43z', 'window-selected'); windowDiv.style.cssText = 'z-index: 57; left: 613.5px; top: 384.5px; position: absolute;'; const titleDiv = document.createElement('div'); titleDiv.classList.add('window-title', 'svelte-1hjm43z'); titleDiv.style.cssText = 'user-select: none; cursor: move;'; const iconImg = document.createElement('img'); iconImg.classList.add('icon', 'icon-in-text'); iconImg.setAttribute('draggable', 'false'); iconImg.setAttribute('src', 'icons/notepad.svg'); iconImg.setAttribute('alt', 'Notepad'); titleDiv.appendChild(iconImg); const titleText = document.createTextNode(' Notepad '); titleDiv.appendChild(titleText); const closeButton = document.createElement('button'); closeButton.classList.add('window-close', 'svelte-1hjm43z'); const closeIcon = document.createElement('img'); closeIcon.classList.add('icon'); closeIcon.setAttribute('draggable', 'false'); closeIcon.setAttribute('src', 'icons/close.svg'); closeIcon.setAttribute('alt', 'Close Icon'); closeButton.appendChild(closeIcon); titleDiv.appendChild(closeButton); windowDiv.appendChild(titleDiv); const contentDiv = document.createElement('div'); contentDiv.classList.add('window-content', 'svelte-1hjm43z'); contentDiv.style.cssText = 'min-width: 150px; min-height: 150px; width: calc(400px); height: calc(400px); padding: 10px;'; const form = document.createElement('form'); form.style.height = '100%'; const textArea = document.createElement('textarea'); textArea.classList.add('textfield'); textArea.setAttribute('spellcheck', 'false'); form.appendChild(textArea); contentDiv.appendChild(form); windowDiv.appendChild(contentDiv); const resizeRight = document.createElement('div'); resizeRight.classList.add('window-resize-right', 'svelte-1hjm43z'); const resizeBottom = document.createElement('div'); resizeBottom.classList.add('window-resize-bottom', 'svelte-1hjm43z'); const resizeBottomRight = document.createElement('div'); resizeBottomRight.classList.add('window-resize-bottomright', 'svelte-1hjm43z'); windowDiv.appendChild(resizeRight); windowDiv.appendChild(resizeBottom); windowDiv.appendChild(resizeBottomRight); const resizeImg = document.createElement('img'); resizeImg.setAttribute('src', 'icons/resize-both.svg'); resizeImg.setAttribute('alt', ''); resizeImg.classList.add('resize-img', 'svelte-1hjm43z'); resizeImg.style.cssText = 'right: 3px; bottom: 3px;'; windowDiv.appendChild(resizeImg); document.body.appendChild(windowDiv); let isDragging = false, offsetX, offsetY; titleDiv.addEventListener('mousedown', (e) => { isDragging = true; offsetX = e.clientX - windowDiv.getBoundingClientRect().left; offsetY = e.clientY - windowDiv.getBoundingClientRect().top; }); document.addEventListener('mousemove', (e) => { if (isDragging) { windowDiv.style.left = `${e.clientX - offsetX}px`; windowDiv.style.top = `${e.clientY - offsetY}px`; } }); document.addEventListener('mouseup', () => { isDragging = false; }); closeButton.addEventListener('click', () => { windowDiv.remove(); });
        document.querySelector("body > div.window.svelte-1hjm43z.window-selected > div.window-content.svelte-1hjm43z > form > textarea").value =
            `Thanks for using d0urce ${VERSION}!

Below is a guide to help you use d0urce
tab key bind open/close feature.

Note: You need to hold alt before using 
any of these keys!

        -------------------------
        | TAB NAME        | KEY |
        | -----------------------
        | Computer	  |  c  |
        | Inventory	  |  i  |
        | Target List	  |  t  |
        | Terminal	  |  T  |
        | Season Pass	  |  n  |
        | Friends	  |  F  |
        | Log		  |  l  |
        | Item Seller	  |  I  |
        | Premium	  |  P  |
        | Shop		  |  s  |
        | Leaderboard	  |  L  |
        | Country Wars	  |  w  |
        | Task Manager	  |  M  |
        | s0urce Browser  |  b  |
        | Upgrader	  |  u  |
        | Spotify	  |  S  |
        | VPN		  |  v  |
        | Filament	  |  f  |
        | 3D Printer	  |  p  |
        | Global Chat	  |  g  |
        | Agents	  |  a  |
        | Mail		  |  m  |
        -------------------------
        `
    }

    const openWindows = () => {
        document.querySelectorAll("#desktop-container > div").forEach(div => { divs[div.innerText] = div; });
        divs["Log"].click()
        divs["Inventory"].click()
    }

    const calculateNetworth = async () => {
        var total = 0.0
        for (var i = 0; i < document.querySelectorAll("#item-container > div").length; i++) {
            const sel = "#item-container > div:nth-child(" + i + ") > div > div > div > div";
            simulateMouseHover(sel)
            await sleep(1)
            try {
                const p = document.querySelector("#price").innerText;
                total += p.split("~").length > 1 ? (parseFloat(p.split("~")[0]) + parseFloat(p.split("~")[1])) / 2 : parseFloat(p.split("+")[0])
            }
            catch { }
            simulateMousePressDown(sel)
            await sleep(1)
        }
        sendLog(`<div style="color:rgb(110, 247, 82); text-shadow: 0 0 2px #0fa, 0 0 3px rgb(110, 247, 82); letter-spacing: 0.3px; font-weight: lighter">
            <img class="icon" src="https://www.svgrepo.com/show/308635/home-value-house-price-home-price-house-value.svg" style="filter: drop-shadow(50px 0px 100px) invert(50%) sepia(100%) saturate(7486%) hue-rotate(143deg) brightness(200%) contrast(94%);">
            According to dPS, your inventory is worth ~${total.toFixed(2)} BTC.
            </div>`)
    }

    function updateNetworth(data) { fetchNetworth(data); }
    window.updateNetworth = updateNetworth;

    function fetchNetworth(data) {
        var btcValue = 0;
        const rarities = ["D", "C", "B", "A", "S", "SS", "SSS"];
        const baseStat = (k) => k.stats[0].value - k.stats[0].increasePerLevel * (k.upgradeLevel - 1);
        for (var key in data["inventory"]) data[key] = data["inventory"][key];
        for (var key in data) {
            key = data[key]
            var rarity = rarities.indexOf(key?.rarity) || 0;
            var btc = 0;
            switch (key?.type) {
                case 'gpu':
                    btc = dPS(dPM(baseStat(key), rarity, key.type), key.upgradeLevel, rarity, key.type);
                    break;
                case 'cpu':
                    let hack = baseStat(key);
                    let chance, pen, trueDam, dam = 0;
                    for (let stat of key.stats.slice(1)) switch (stat.name) {
                        case 'Hack Critical Damage Chance': chance = stat.value; break;
                        case 'Hack Armor Penetration': pen = stat.value; break;
                        case 'True Damage': trueDam = stat.value; break;
                        case 'Hack Critical Damage Bonus': dam = stat.value; break;
                    }
                    if (chance === undefined) chance = 0; if (pen === undefined) pen = 0; if (trueDam === undefined) trueDam = 0; if (dam === undefined) dam = 0;
                    const [raw, penV, trueDamV] = hackPower(hack, trueDam, pen, chance, dam);
                    btc = dPS(dPM(dCI(raw, penV, trueDamV, 1, rarity), rarity, key.type), key.upgradeLevel, rarity, key.type);
                    break;
                case 'psu':
                    btc = dPS(dPM(dPI(baseStat(key), 1, rarity), rarity, key.type), key.upgradeLevel, rarity, key.type);
                    break;
                case 'firewall':
                    let hp = baseStat(key);
                    let rd, rg, ad, ms = 0;
                    for (let stat of key.stats.slice(1)) switch (stat.name) {
                        case 'Firewall Damage Reduction': rd = stat.value; break;
                        case 'Firewall Regeneration': rg = stat.value; break;
                        case 'Firewall Advanced Encryption': ad = stat.value; break;
                        case 'Firewall Master Encryption': ms = stat.value; break;
                    }
                    if (rd === undefined) rd = 0; if (rg === undefined) rg = 0; if (ad === undefined) ad = 0; if (ms === undefined) ms = 0;
                    const [hpP, rdP, rgP, encryption] = firewallEncryption(hp, rd, rg, ad, ms);
                    btc = dPS(dPM(dFI(hpP, rdP, rgP, encryption, 1, rarity), rarity, 'router'), key.upgradeLevel, rarity, 'router');
                    break;
                default:
                    if (key && key.name) btc = dCPS(key.name.toString().toLowerCase(), rarity, key.mint, key.premium);
                    break;
            }
            if (key && key.name && btc) {
                if (typeof btc === 'number') btcValue += btc
                else {
                    const p = btc.split("~");
                    btcValue += (p.length > 1 ? (rarity > 5) ? (parseFloat(p[0]) + parseFloat(p[1])) / 2 : parseFloat(p[0]) : parseFloat(btc.split("+")[0])) || 0
                }
            }
        }
        globalItemNetworth = btcValue;
        return btcValue;
    }

    function createNetworthDiv() {
        const targetLocation = document.querySelector('body > div:nth-child(1) > main > div:nth-child(1) > div:nth-child(2)');
        const observerTarget = document.querySelector('body > div > main > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)');
        const mkDiv = (css, ...children) => { const d = document.createElement('div'); d.style.cssText = css; d.append(...children); return d; };

        const newDiv = document.createElement('div');
        newDiv.classList.add('topbar-value', 'svelte-1azjldn');
        newDiv.style.cssText = 'min-width: 220px; background-color:rgb(63 0 78); color: blue;';
        const centerImg = document.createElement('img');
        centerImg.classList.add('icon', 'icon-in-text');
        centerImg.setAttribute('src', 'icons/btc.svg');
        centerImg.setAttribute('alt', 'Bitcoin Icon');
        centerImg.style.cssText = 'invert(100%); filter: hue-rotate(225deg);';
        const leftDiv = mkDiv('text-align: left; color: cyan;', 'X.xx');
        const middleDiv = mkDiv('flex: 1 1 0%; text-align: center; color: gold;', 'X.xx');
        const rightDiv = mkDiv('flex: 1 1 0%; text-align: right; color: hotpink;', 'X.xx');
        newDiv.append(mkDiv('text-align: center; color: mediumpurple;', centerImg, 'X BTC NETWORTH'), mkDiv('display: flex; gap: 10px; font-size: 12px;', leftDiv, middleDiv, rightDiv));

        if (!(targetLocation && targetLocation.firstChild)) return console.error('Target location not found or does not have the specified structure.');
        targetLocation.insertBefore(newDiv, targetLocation.firstChild.nextSibling);

        const networthDiv = document.querySelector('body > div:nth-child(1) > main > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)');
        const setIconValue = (div, src, value, filter) => {
            const img = document.createElement('img');
            img.classList.add('icon', 'icon-in-text');
            img.setAttribute('src', src);
            if (filter) img.style.filter = filter;
            div.textContent = '';
            div.appendChild(img);
            div.append(value);
        };
        const observer = new MutationObserver(() => {
            const btcText = networthDiv.querySelector('div:nth-child(1)').childNodes[1];
            const newValue = parseFloat(observerTarget.innerText.replace(/[^\d.]/g, '')) || 0;
            // Filament networth
            const [cf, uf, rf, ef, lf, mf, ethf] = Array.from(document.querySelectorAll(".filament-el")).map(e => parseInt(e.innerText.trim()));
            const filamentNetworth = (cf + 3 * uf + 9 * rf + 27 * ef + 135 * lf + 405 * mf + 2025 * ethf) * stats.cf_filament_value;

            if (btcText.nodeValue != `${(newValue + filamentNetworth + globalItemNetworth).toFixed(2)} BTC NETWORTH`) btcText.nodeValue = `${(newValue + globalItemNetworth).toFixed(2)} BTC NETWORTH`;
            if (leftDiv.textContent != filamentNetworth.toFixed(2)) setIconValue(leftDiv, 'icons/filament-mythic.svg', `${filamentNetworth.toFixed(2)}`);
            if (middleDiv.textContent != newValue.toFixed(2)) setIconValue(middleDiv, 'icons/btc.svg', `${newValue.toFixed(2)}`);
            if (rightDiv.textContent != globalItemNetworth.toFixed(2))
                setIconValue(rightDiv, 'icons/inventory.svg', `${globalItemNetworth.toFixed(2)}`, 'brightness(50%) sepia(100) saturate(100) hue-rotate(315deg)');
        });
        observer.observe(observerTarget, { childList: true, characterData: true, subtree: true });
    }

    function applyItemSwag() {
        const desc = document.querySelector("#desc");
        if (!desc) return;
        descriptionObserver.disconnect();
        const reobserve = () => descriptionObserver.observe(document.body, { childList: true, subtree: true });

        const typeCode = (desc.querySelector("div > div > img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, 3);
        const statKey = { cpu: "cputerm", rou: "fireterm", gpu: "gpu_term", psu: "psu_term" }[typeCode];
        if (!statKey) return reobserve();

        const rarityTag = desc.querySelector("div > div:nth-child(2)")?.textContent?.split("-")[0]?.split(" ")[1];
        const rarity = rarityTag?.substring(0, rarityTag.length - 1);
        const rarityIndex = stats.rarityMap[rarity];
        if (rarityIndex == null || stats[statKey] == null) return reobserve();

        const levelMatch = desc.querySelector(".level")?.innerText?.match(/Level (\d+)/);
        const level = levelMatch ? parseInt(levelMatch[1], 10) : null;
        if (!level || level <= 1) return reobserve(); // Level 1 or not found: don't change anything

        const bonusFormatted = `+${(stats[statKey][rarityIndex] * (level - 1)).toFixed(statKey === "gpu_term" ? 8 : 2)}`;
        const span = desc.querySelector("#desc > div:nth-child(2) > div:nth-child(5) > span");
        if (!span || span.innerHTML.includes(bonusFormatted)) return reobserve();

        const content = span.innerHTML;
        const match = content.match(/(.+?by )<span[^>]*>([\d.]+)<\/span>(%?)/) || content.match(/(Mines )<span[^>]*>([\d.]+)<\/span>( BTC per second.*)/);
        if (match) {
            const [, prefix, value, suffix] = match;
            span.innerHTML = `${prefix}<span style="font-weight: 500; padding: 0 2px; border-radius: 2px; color: #ffdd00;">${value}</span> (<span style="font-weight: 500; padding: 0 2px; border-radius: 2px; color: #c4ff8a;">${bonusFormatted}</span>)${suffix}`;
        }
        reobserve();
    }

    const descriptionObserver = new MutationObserver(applyItemSwag);
    descriptionObserver.observe(document.body, { childList: true, subtree: true });

    var divs = {};
    document.querySelectorAll("#desktop-container > div").forEach(div => divs[div.innerText] = div);

    // ======================================== 2spiCore Added Features ========================================

    function formatNumber(number) {
        return number > 1000 ? `${(number / 1000).toFixed(2)}k` : number;
    };

    // ======================================== Daily BTC Changes ========================================

    function createDailyChangeDiv() {
        const targetLocation = document.querySelector('body > div:nth-child(1) > main > div:nth-child(1) > div:nth-child(2)');
    
        const newDiv = document.createElement('div');
        newDiv.classList.add('topbar-value', 'svelte-1azjldn');
        newDiv.style.cssText = 'display: flex; flex-direction: column; justify-content: center; align-items: center';
        newDiv.innerHTML = `
                            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 0.125rem">
                                <img class="icon icon-in-text" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgoJPHBhdGggZD0iTTAgMGgxNnYxNkgweiIgZmlsbD0ibm9uZSIgLz4KCTxnIGZpbGw9IiNmNzkzMWEiPgoJCTxwYXRoIGQ9Ik0xLjUgMWEuNS41IDAgMCAxIC41LjVWMTRoMTIuNWEuNS41IDAgMCAxIDAgMWgtMTNhLjUuNSAwIDAgMS0uNS0uNXYtMTNhLjUuNSAwIDAgMSAuNS0uNSIgLz4KCQk8cGF0aCBkPSJNMTMuMDgxIDEuNjA2YTEgMSAwIDEgMSAxLjgzOC43ODhsLTMgN2ExIDEgMCAwIDEtMS40MzQuNDYzTDYuNTU0IDcuNDk4bC0xLjYwNiA0LjgxOGExIDEgMCAxIDEtMS44OTYtLjYzMmwyLTZsLjA0LS4xMDVhMSAxIDAgMCAxIDEuNDIzLS40MzZsNC4wMTcgMi40MXoiIC8+Cgk8L2c+Cjwvc3ZnPgo=">
                                Daily Earnings
                            </div>
                            <p id="daily-btc-diff" style="font-size: 0.875rem;">0.00000000 BTC</p>`;

        targetLocation.insertBefore(newDiv, targetLocation.firstChild.nextSibling);
    };
    
    const getFirstDailyBalance = () => {
        const container = document.querySelector('body > div > main > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)');
        const actualBalance = parseFloat(container.textContent.split(' BTC')[0]);
        let btcStats = player.btcDailyStats;
        const today = new Date().toLocaleDateString();
    
        if (btcStats.date !== today) {
            btcStats.date = today;
            btcStats.startBalance = actualBalance;
            save();
        };
        return btcStats.startBalance;
    };

    const updateDailyBalance = async () => {
        const changeCounter = document.getElementById('daily-btc-diff');
        let liveBtcCount = parseFloat(document.querySelector('img[src="icons/btc.svg"]').parentElement.textContent.trim(' BTC'));
        let btcDiff = (liveBtcCount - getFirstDailyBalance()).toFixed(8);

        while (!changeCounter) 
            await sleep(200);

        if (btcDiff > 0) {
            changeCounter.style.color = '#70cf18';
            changeCounter.textContent = `+${btcDiff} BTC`;
        } else {
            changeCounter.style.color = '#eb8282';
            changeCounter.textContent = `${btcDiff} BTC`;
        };
    };

    // ======================================== Version Checking ========================================

    const checkVersion = async () => {
        try {
          const response = await fetch("https://raw.githubusercontent.com/tijasp/2spiCore/refs/heads/main/VERSION");
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const actualVersion = await response.text();
          if (actualVersion !== VERSION) {
            sendLog(`
                <div style="color:rgb(247, 58, 58); font-size: 1.5rem; font-weight: 900; letter-spacing: 0.3px; margin-bottom: 8px; text-align: center">
                    OUTDATED VERSION ! <br>
                    <a style="font-size: 1.2rem; color: #52e7f7; text-shadow: 0 0 2px #0fa, 0 0 3px #52e7f7;" href="https://github.com/tijasp/2spiCore" target="_blank">Click here</a> <span style="font-size: 1.2rem; color:rgb(255, 255, 255)">  to Download last version</span>
                </div>
            `);
        };
        } catch (error) {
          console.error('Impossible to fetch last version: ', error);
        };
    };

    // ======================================== Statistics ========================================

    const createStatisticsWindow = () => {
        const desktopContainer = document.getElementById('desktop-container');
        const statsIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgoJPHBhdGggZD0iTTAgMGgxNnYxNkgweiIgZmlsbD0ibm9uZSIgLz4KCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xLjc1IDEzLjI1VjEuNUguNXYxMmExLjI0IDEuMjQgMCAwIDAgMS4yMiAxSDE1LjV2LTEuMjV6IiAvPgoJPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMuMTUgOEg0LjR2My45SDMuMTV6bTMuMjYtNGgxLjI2djcuOUg2LjQxem0zLjI3IDJoMS4yNXY1LjlIOS42OHptMy4yNy0zLjVoMS4yNXY5LjRoLTEuMjV6IiAvPgo8L3N2Zz4K';

        const statsDesktopIcon = document.createElement('div');
        statsDesktopIcon.id = 'stats-button';
        statsDesktopIcon.ondragover = 'return true';
        statsDesktopIcon.draggable = true;
        statsDesktopIcon.style.cssText = 'position: relative; width: 153px; height: 85px; font-size: 16px; float: left;';
        statsDesktopIcon.innerHTML = `
                                    <div class='wrapper svelte-1ye0fc6'>
                                        <div style='width: 100%; height: calc(100% - 20px); padding-bottom: 5px;'>
                                            <img draggable='false' src='${statsIcon}' alt='Statistic Desktop Icon' class='svelte-1ye0fc6' style='height: 100%;'>
                                        </div> 
                                        <div class='svelte-1ye0fc6' style='height: 20px; font-size: 16px;'>Statistics</div>
                                    </div>`;

        let statsWindow = document.createElement('div');
        statsWindow.id = 'stats-window';
        statsWindow.classList.add('window', 'svelte-1hjm43z');
        statsWindow.style.cssText = 'width: 28rem; display: none; z-index: 99; left: 714.5px; top: 356px;';
        statsWindow.innerHTML = `
                                <div class='window-title svelte-1hjm43z' style='user-select: none;'>
                                    <img draggable='false' class='icon icon-in-text' src='${statsIcon}' alt='Statistics'> Statistics 
                                    <button class='window-close svelte-1hjm43z' id='closeStats'>
                                        <img draggable='false' class='icon' src='https://s0urce.io/icons/close.svg' alt='Close Icon'>
                                    </button>
                                </div>
                                <div class='window-content svelte-1hjm43z'>
                                </div>`;
        
        const dropRateStats = document.createElement('div');
        dropRateStats.id = 'dropRates-tab'
        dropRateStats.innerHTML = `
            <div class='window-content svelte-1hjm43z' style='padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem'>
                <div style="background: #1a1a1a; border: 1px solid #2e2e2e; border-radius: 0.5rem; padding: 1rem; color: white">
                    <div style="font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 1rem">Drop Rates Statistics</div>
                    <div style="display: flex; background: #252525; border-radius: 0.5rem; padding: 0.250rem; margin-bottom: 1rem; gap: 0.25rem">
                        <button id="npc-stats-button" style="flex: 1; padding: 0.5rem; background: #454545; border: none; border-radius: 0.25rem; color: white; cursor: pointer; font-weight: 600; font-size: 1.125rem">NPC</button>
                        <button id="filaments-stats-button" style="flex: 1; padding: 0.5rem; background: transparent; border: none; border-radius: 0.25rem; color: #aaaaaa; cursor: pointer; font-weight: 600; font-size: 1.125rem">Filaments</button>
                        <button id="components-stats-button" style="flex: 1; padding: 0.5rem; background: transparent; border: none; border-radius: 0.25rem; color: #aaaaaa; cursor: pointer; font-weight: 600; font-size: 1.125rem">Components</button>
                    </div>
                    <div id="npc-stats-tab">
                        <div style="display: flex; justify-content: space-between; align-items: center">
                            <span style="font-size: 1rem; color: #aaaaaa">Rarity distribution</span>
                            <span style="font-size: 1rem; color: #aaaaaa">Total: <span id="npc-total-drops">${formatNumber(player.drops.npc['total'])}</span></span>
                        </div>
                        <div id="npc-distributionBar" style="display: flex; width: 100%; height: 10px; background: #303030; border-radius: 0.5rem; overflow: hidden; margin-top: 0.225rem">
                            ${insertDropRateStatsBar('npc')}
                        </div>
                        <div id="npc-statsRows" style="display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; column-gap: 0.5rem; row-gap: 0.5rem; margin-top: 1.25rem">
                            ${insertDropRateStatsRows('npc')}
                        </div>
                    </div>
                    <div id="filaments-stats-tab" style="display: none">
                        <div style="display: flex; justify-content: space-between; align-items: center">
                            <span style="font-size: 1rem; color: #aaaaaa">Rarity distribution</span>
                            <span style="font-size: 1rem; color: #aaaaaa">Total: <span id="filaments-total-drops">${formatNumber(player.drops.filaments['total'])}</span></span>
                        </div>
                        <div id="filaments-distributionBar" style="display: flex; width: 100%; height: 10px; background: #303030; border-radius: 0.5rem; overflow: hidden; margin-top: 0.225rem">
                            ${insertDropRateStatsBar('filaments')}
                        </div>
                        <div id="filaments-statsRows" style="display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; column-gap: 0.5rem; row-gap: 0.5rem; margin-top: 1.25rem">
                            ${insertDropRateStatsRows('filaments')}
                        </div>
                    </div>
                    <div id="components-stats-tab" style="display: none">
                        <div style="display: flex; justify-content: space-between; align-items: center">
                            <span style="font-size: 1rem; color: #aaaaaa">Rarity distribution</span>
                            <span style="font-size: 1rem; color: #aaaaaa">Total: <span id="components-total-drops">${formatNumber(player.drops.components['total'])}</span></span>
                        </div>
                        <div id="components-distributionBar" style="display: flex; width: 100%; height: 10px; background: #303030; border-radius: 0.5rem; overflow: hidden; margin-top: 0.225rem">
                            ${insertDropRateStatsBar('components')}
                        </div>
                        <div id="components-statsRows" style="display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; column-gap: 0.5rem; row-gap: 0.5rem; margin-top: 1.25rem">
                            ${insertDropRateStatsRows('components')}
                        </div>
                    </div>
                </div>
            </div>`;


        desktopContainer.appendChild(statsDesktopIcon);
        const statsWindowContent = statsWindow.querySelector('#stats-window > .window-content');
        statsWindowContent.appendChild(dropRateStats);
        document.querySelector('main').appendChild(statsWindow);
        statsWindowEventListeners();
    };

    const statsWindowEventListeners = () => {
        const statsWindow = document.getElementById('stats-window');
        const statsDesktopIcon = document.getElementById('stats-button');
        const statsTitleBar = statsWindow.querySelector('.window-title');
        let isDraggingStats = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;
    
        statsTitleBar.addEventListener('mousedown', (e) => {
            if (e.target.closest('#closeStats')) return;
            isDraggingStats = true;
            const rect = statsWindow.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
        });
    
        document.addEventListener('mousemove', (e) => {
            if (!isDraggingStats) return;
            statsWindow.style.left = `${e.clientX - dragOffsetX}px`;
            statsWindow.style.top = `${e.clientY - dragOffsetY}px`;
        });
    
        document.addEventListener('mouseup', () => {
            isDraggingStats = false;
        });
    
        statsDesktopIcon.addEventListener('click', () => {
            statsWindow.style.display = 'block';
        });
    
        document.getElementById('closeStats').addEventListener('click', () => {
            statsWindow.style.display = 'none';
        });

        document.getElementById('npc-stats-button').addEventListener('click', () => {
            updateDropRateStatsTab('npc');
        });

        document.getElementById('filaments-stats-button').addEventListener('click', () => {
            updateDropRateStatsTab('filaments');
        });
        
        document.getElementById('components-stats-button').addEventListener('click', () => {
            updateDropRateStatsTab('components');
        });
    };

    const calculateDropRates = (type, rarity) => {
        return player.drops[type]['total'] ? ((player.drops[type][rarity] / player.drops[type]['total']) * 100).toFixed(2) : '0.00';
    };

    const insertDropRateStatsRows = (type) => {
        return lootRarity.slice(0, -1).map(r => {
            const count = player.drops[type][r.name];
            const dropRate = calculateDropRates(type, r.name);
    
            return `
                    <div style="display: flex; align-items: center; gap: 0.5rem">
                        <div style="width: 0.750rem; height: 0.750rem; border-radius: 50%; background: ${r.color}"></div>
                        <span style="font-size: 1.25rem; font-weight: 600; color: white">${capitalize(r.name)}</span>
                    </div>
                    <span id="${r.name}-stats-rate" style="grid-column-start: 3; font-size: 1.25rem; font-weight: 600; color: white; min-width: 65px; text-align: right">${dropRate}%</span>
                    <span id="${r.name}-stats-count" style="grid-column-start: 4; font-size: 1.25rem; color: #aaaaaa; min-width: 30px; text-align: right">${formatNumber(count)}</span>
            `;
        }).join('');
    };

    const insertDropRateStatsBar = (type) => {    
        return lootRarity.slice(0, -1).map(r => {
            return `
                <div id="${r.name}-rarityDistribution" style="width: ${calculateDropRates(type, r.name)}%; height: 100%; background: ${r.color}; flex-shrink: 0"></div>
            `;
        }).join('');
    };

    const updateNpcDropRates = async () => {
        const item = document.querySelector('.window-loot > div > div > div > div > div > .item');
        let background = item.style.background;
        let rarity = raritiesVariables[background] || raritiesVariables[background + ")"];

        if (player.drops.npc[rarity] === undefined) return;

        player.drops.npc['total']++;
        player.drops.npc[rarity]++;
        updateDropRateStatsWindow('npc');
        save();
    };

    const updateAgentDropRates = (type) => {
        if (type === 'filaments') {
            const filaAgentDiv = document?.querySelector('img[src="icons/filament.svg"][alt="Agent"]')?.closest('div[style*="flex-direction: column"]');
            const filaContainers = filaAgentDiv?.querySelectorAll('div[style="display: flex; align-items: center; justify-content: center; gap: 5px;"] > div > div');
            filaContainers.forEach(container => {
                const rarity = container.parentElement.querySelector('img').src.replace('https://s0urce.io/icons/filament-', '').replace('.svg', '');
                const filaAmmount = parseInt(container.textContent);
    
                if (player.drops.filaments[rarity] === undefined) return;

                player.drops.filaments['total'] += filaAmmount;
                player.drops.filaments[rarity] += filaAmmount;
                updateDropRateStatsWindow('filaments');
            });
        } else if (type === 'components') {
            const compAgentDiv = document?.querySelector('img[src="icons/targetList.svg"][alt="Agent"]')?.closest('div[style*="flex-direction: column"]');
        const compContainers = compAgentDiv?.querySelectorAll('div[style="display: flex; align-items: center; justify-content: center; gap: 5px;"] > div > div');
            compContainers.forEach(item => {
                if (item.classList.contains('item-slot-hasitem')) {
                    let background = item.querySelector('.item').style.background;
                    let rarity = raritiesVariables[background] || raritiesVariables[background + ")"];
                    
                    if (player.drops.components[rarity] === undefined) return;

                    player.drops.components['total']++;
                    player.drops.components[rarity]++;
                    updateDropRateStatsWindow('components');
                };
            });
        };
        save();
    };

    const updateDropRateStatsWindow = (type) => {
        document.getElementById(`${type}-total-drops`).textContent = formatNumber(player.drops[type].total);
        document.getElementById(`${type}-statsRows`).innerHTML = insertDropRateStatsRows(type);
        document.getElementById(`${type}-distributionBar`).innerHTML = insertDropRateStatsBar(type);
    };

    const updateDropRateStatsTab = (type) => {
        const dropRatesTab = ['npc', 'filaments', 'components'];
        
        dropRatesTab.forEach(tab => {
            const statTab = document.getElementById(`${tab}-stats-tab`);
            const button = document.getElementById(`${tab}-stats-button`);
            const active = tab === type;
    
            button.style.background = active ? '#454545' : 'transparent';
            button.style.color = active ? 'white' : '#aaaaaa';
            statTab.style.display = active ? 'block' : 'none';
        });
    };

    const agentListener = () => {
        document.querySelector('main').addEventListener('click', (e) => {
            const filaAgentDiv = document?.querySelector('img[src="icons/filament.svg"][alt="Agent"]')?.closest('div[style*="flex-direction: column"]');
            const compAgentDiv = document?.querySelector('img[src="icons/targetList.svg"][alt="Agent"]')?.closest('div[style*="flex-direction: column"]');
            const agentButtons = e.target.classList.contains('green') && (e.target.textContent === 'Grab Loot' || e.target.textContent === 'Shred all');

            if (agentButtons && filaAgentDiv?.contains(e.target)) {
                updateAgentDropRates('filaments');
            };

            if (agentButtons && compAgentDiv?.contains(e.target)) {
                updateAgentDropRates('components');
            };
        });
    };

    /*  Feature registry: everything the startup sequence loads, in load order.
        To add a feature, write its function above and add an entry here. The loading screen count picks it up automatically.
          name      - text shown on the loading screen
          load      - function to run (only awaited if it returns a promise, so sync features stay sync)
          includes  - features that come along silently with it (each counts toward the total)
          preloaded - already running since the script was evaluated (no load function)   */
    const features = [
        { name: "Item description swag observer", preloaded: true },
        { name: "WebSocket message hook", preloaded: true, includes: ["Player data listener", "Port info listener", "Live networth updates"] },
        { name: "Filament total display", load: editFilaments, includes: ["Filament observer"] },
        { name: "Custom terminal bar", load: customTerminal },
        {
            name: "Observers", load: createObserver, includes: [
                "Log observer (hack alerts)", "Window close observer", "Item hover grading", "Drop rates overlay",
                "Window open observer", "Profile BTC display", "Padlet shop button", "Auto loot manager", "Inventory window",
                "BTC Observer", "BTC Balance changes",
                "Trade window", "Computer port info", "Filament \"Trade all\" button", "Terminal colorizer",
                "Settings: auto loot table", "Settings: trade pricing table", "Settings: item manager", "Settings: window colors",
                "Settings: desktop background", "Hacked window", "Log window", "Target window (copy ID)", "Counter-hack windows",
            ]
        },
        { name: "Progress bar resize", load: editProgressBar },
        { name: "Saved settings", load: loadLocalStorage },
        { name: "Theme style", load: updateThemeStyle },
        { name: "Custom style", load: loadStyle },
        { name: "Syntax highlighting scripts", load: loadScripts },
        { name: "Default windows", load: openWindows },
        // { name: "Networth calculation", load: calculateNetworth },
        { name: "Networth display", load: createNetworthDiv, includes: ["Networth observer"] },
        { name: "Agents looting listener", load: agentListener },
        { name: "Statistics display", load: createStatisticsWindow, includes: ["Loot observer", "Agents looting listener"] },
        { name: "Daily BTC Earnings display", load: createDailyChangeDiv, includes: ["BTC Balance observer"] },
        { name: "Item swag", load: applyItemSwag },
        { name: "Welcome message", load: async () => { divs["Log"].click(); await sleep(100); editWelcomeMessage(); } },
        { name: "Checking last version", load: checkVersion },
        { name: "Staff status check", load: () => tryCheckStaffStatus(document.querySelector("main")) },
        { name: "User input manager", load: loadUserInputManager, includes: ["Context menus", "Multi-select", "Window snapping", "Alt hotkeys"] },
        { name: "Inventory window", load: editInventoryWindow, includes: ["Inventory sorting"] },
        { name: "Pretty ports", load: () => prettyPorts() },
        // { name: "Note", load: async () => { await sleep(Math.random() * 2000 + 500); loadNote(); } },
    ];

    // White feature log in the top left of the loading screen. Its lines live in a shadow root so the document observers never see them.
    const loadingLog = () => {
        const host = new Component("div", { style: { position: "absolute", top: "10px", left: "10px" } }).element;
        document.getElementById("display-delete")?.append(host);
        const root = host.attachShadow({ mode: "open" });
        let queue = Promise.resolve();
        const log = (text) => queue = queue.then(() => sleep(Math.random() * 19 + 1)).then(() => root.append(new Component("div", { innerText: text, style: { color: "gray", fontFamily: "monospace", fontSize: "8px", whiteSpace: "pre" } }).element));
        log.done = () => queue;
        return log;
    }

    (async () => {
        while (document.querySelector("#login-top") || window.location.href !== "https://s0urce.io/")
            await sleep(500);
        loadingScreen("create", "2spiCore");
        const log = loadingLog();
        const total = features.reduce((sum, feature) => sum + 1 + (feature.includes?.length || 0), 0);
        log(`Loading ${total} features...`);
        let count = 0;
        for (const feature of features) {
            log(`[${++count}/${total}] ${feature.preloaded ? "Loaded" : "Loading"} ${feature.name}`);
            const result = feature.load?.();
            if (result instanceof Promise)
                await result;
            feature.includes?.forEach(name => log(`[${++count}/${total}]   + ${name}`));
        }
        await log.done();
        loadingScreen("delete");
    })();
})();

// Padlet handler:

async function openPadlet() {
    document.querySelector('#desktop-container > div:nth-child(14)').click();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const submitSel = "body > div > main > div.window.svelte-1hjm43z.window-selected > div.window-content.svelte-1hjm43z > div > form > a > button";
    await sleep(300)
    var inputField = null
    for (const f of document.querySelectorAll('#wrapper > input')) inputField = f.placeholder == "" ? f : inputField;
    inputField.value = "https://padlet.com/" + document.querySelector("#description").innerHTML.split("id=\"")[1].split("\"")[0];
    inputField.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector(submitSel).click();
    await sleep(1000)
    document.querySelector(submitSel).click();
}

// Page Break

let globalItemNetworth = 0;

// Helper to extract firewall stats from 3 slots
const extractPortStats = (portIndex, info, statKeys) => {
    const sums = Object.fromEntries(Object.keys(statKeys).map(k => [k, 0]));
    for (let i = 0; i < 3; i++) {
        const item = info[`firewall_${portIndex}_${i}`];
        if (item?.stats) Object.entries(statKeys).forEach(([sumKey, statKey]) => { sums[sumKey] += item.stats.find(s => s.key === statKey)?.value || 0; });
    }
    return sums;
};

// Update port detail view with CPW and HRPM
function updatePortDetails(computerWindow, info) {
    if (typeof stats === 'undefined' || !info) return;
    let portIndex = parseInt(computerWindow.dataset.selectedPortIndex);
    // If portIndex not stored, extract from h2 (Port 21 = index 0, Port 22 = index 1, Port 23 = index 2)
    if (isNaN(portIndex)) portIndex = parseInt(computerWindow.querySelector("div:nth-child(2) > div > div.section:nth-child(3) > div:nth-child(2) > div > div > h2")?.textContent.match(/\d+/)?.[0]) - 21;
    if (isNaN(portIndex)) return;

    const statKeys = { sumHP: "firewallHealth", sumRegen: "firewallRegeneration", sumReduction: "firewallDamageReduction", sumMasterEnc: "firewallMasterEncryption", sumAdvEnc: "firewallAdvancedEncryption" };
    const { sumHP, sumRegen, sumReduction, sumMasterEnc, sumAdvEnc } = extractPortStats(portIndex, info, statKeys);
    const totalScore = 100 + sumAdvEnc + sumMasterEnc;
    const cpwNumeric = ((100 / totalScore) * 3.7 + (sumAdvEnc / totalScore) * 8.6 + (sumMasterEnc / totalScore) * 13.6);
    const [displayHP, displayRD, displayRegen] = window.firewallEncryption(sumHP / 3, sumReduction / 3, sumRegen / 3, sumAdvEnc, sumMasterEnc);
    const hrpm = Math.round((displayRegen * 60) / (1 - displayRD));
    const trueHP = displayHP / (1 - displayRD);

    const targetDiv = computerWindow.querySelector("div:nth-child(2) > div > div.section:nth-child(3) > div:nth-child(2) > div > div:nth-child(2)");
    if (!targetDiv) return;
    // Find or create a div with class cls, inserted before ref (or after it if next)
    const getOrCreate = (cls, css, ref, next) => {
        let el = computerWindow.querySelector("." + cls);
        if (!el) {
            el = document.createElement("div");
            el.className = cls;
            el.style.cssText = css;
            ref.parentElement.insertBefore(el, next ? ref.nextSibling : ref);
        }
        return el;
    };

    // Add true HP line before the HP/reduction line
    const trueHPLine = getOrCreate("prettyPorts-detailTrueHP", "display: flex; align-items: center; gap: 8px; height: 18px; margin: 8px 0px; filter: invert(.5) sepia(1) saturate(3) hue-rotate(306deg);", targetDiv);
    trueHPLine.innerHTML = `<img src="https://www.svgrepo.com/show/354993/firewall.svg" style="width: 16px; height: 16px;" alt="firewall" />${trueHP.toFixed(0)}`;
    const cpwLine = getOrCreate("prettyPorts-cpw", "display: flex; align-items: center; justify-content: space-between; height: 18px; margin: 8px 0px;", targetDiv, true);
    cpwLine.innerHTML = `<div style="display: flex; align-items: center; font-weight: 600; filter: invert(.5) sepia(1) saturate(5) hue-rotate(248deg);"><img src="https://www.svgrepo.com/show/532323/lock-alt.svg" style="width: 16px; height: 16px; margin-right: 4px;"/>${cpwNumeric.toFixed(2)}</div><div style="display: flex; align-items: center; font-weight: 600; filter: invert(.5) sepia(1) saturate(5) hue-rotate(10deg);">${hrpm}<img src="https://www.svgrepo.com/show/322503/healing.svg" style="width: 16px; height: 16px; margin-right: 4px;"/></div>`;
    const progressBar = getOrCreate("prettyPorts-progressBar", "position: relative; width: 100%; height: 24px; background: black; border-radius: 4px; margin: 8px 0px; overflow: hidden;", cpwLine, true);

    // Calculate actual port holdout using best CPU (cps average 5)
    let holdoutPercentage = 50; // fallback if calculation throws
    try {
        const bestCpuStats = stats.cpu[6];
        const bestCpuPower = window.hackPower(bestCpuStats.hack[1] + stats.cputerm[6] * (10 - 1), bestCpuStats.trueDam[1], bestCpuStats.pen[1], bestCpuStats.chance[1], bestCpuStats.dam[1]);
        holdoutPercentage = window.calculateHoldoutPercentage(window.penTest([displayHP, displayRD, displayRegen, cpwNumeric], bestCpuPower, cpwNumeric / 5 + 0.3));
    } catch (e) {}

    const rootStyle = getComputedStyle(document.documentElement);
    const colors = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'].map(r => (rootStyle.getPropertyValue(`--color-${r}`) || '').trim().match(/#[0-9a-fA-F]{6}/)?.[0] || '#ffffff');
    progressBar.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-family: Consolas, monospace; font-weight: 600; font-size: 12px; text-shadow: 0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6);">${holdoutPercentage.toFixed(3)}%</div>`;

    // Gradient stops (each color's end point; CSS blends between them), then black from holdoutPercentage to 100
    const gradientStops = [];
    for (const [i, [start, end]] of [[0, 3.3], [3.4, 12], [12.1, 25.2], [25.3, 37], [37.1, 50.6], [50.7, 70.3], [70.4, 100]].entries()) {
        if (start >= holdoutPercentage) break;
        gradientStops.push(`${colors[i]} ${Math.min(end, holdoutPercentage)}%`);
    }
    gradientStops.push(`black ${holdoutPercentage}%`, `black 100%`);
    progressBar.style.background = `linear-gradient(to right, ${gradientStops.join(', ')})`;
}

// prettyPorts: display true HP for the user's ports in the Computer window
let portInfo = null;
window.prettyPorts = (computerWindow = null, info = portInfo) => {
    if (!info || !computerWindow) return;

    // Port detail view
    if (computerWindow.querySelector("button:has(img[src='icons/back.svg'])")) {
        updatePortDetails(computerWindow, info);
        if (computerWindow.dataset.prettyPortsDetailObserverAttached !== "true") {
            computerWindow.dataset.prettyPortsDetailObserverAttached = "true";
            const detailObserver = new MutationObserver(() => {
                const backBtnCheck = computerWindow.querySelector("button:has(img[src='icons/back.svg'])");
                detailObserver.disconnect();
                if (backBtnCheck) {
                    updatePortDetails(computerWindow, info);
                    setTimeout(() => detailObserver.observe(computerWindow, { childList: true, subtree: true }), 100);
                } else {
                    computerWindow.dataset.prettyPortsDetailObserverAttached = "false";
                    window.prettyPorts(computerWindow, info);
                }
            });
            detailObserver.observe(computerWindow, { childList: true, subtree: true });
        }
        return;
    }

    const portsContainer = computerWindow.querySelector("div:nth-child(3) > div.section-content > div > div");
    if (!portsContainer) return;
    portsContainer.querySelectorAll("button.slot-firewall").forEach((portButton, portIndex) => {
        // Track which port was selected for the detail view
        portButton.dataset.portIndex = portIndex;
        portButton.addEventListener("click", () => { computerWindow.dataset.selectedPortIndex = portIndex; });

        const { sumHP, sumReduction } = extractPortStats(portIndex, info, { sumHP: "firewallHealth", sumReduction: "firewallDamageReduction" });
        const trueHP = (1000 + sumHP) / (1 - sumReduction / 100);
        let trueHPDiv = portButton.querySelector(".prettyPorts-trueHP");
        if (!trueHPDiv) {
            trueHPDiv = document.createElement("div");
            trueHPDiv.className = "prettyPorts-trueHP";
            trueHPDiv.style.cssText = "color: black; display: flex; align-items: center; gap: 8px; justify-content: center; filter: invert(.5) sepia(1) saturate(3) hue-rotate(306deg); margin-bottom: -10px;";
            const indicatorsSection = portButton.querySelector("div:has(.slot-item-indicator)");
            if (indicatorsSection?.parentNode) indicatorsSection.parentNode.insertBefore(trueHPDiv, indicatorsSection.nextSibling);
        }
        trueHPDiv.innerHTML = `<img src="https://www.svgrepo.com/show/354993/firewall.svg" style="width: 16px; height: 16px; filter: invert(.5) sepia(1) saturate(3) hue-rotate(306deg);" alt="firewall" />${trueHP.toFixed(0)}`;
    });

    // Watch for ports container visibility changes, until the window closes
    if (!computerWindow.dataset.prettyPortsObserverAttached) {
        computerWindow.dataset.prettyPortsObserverAttached = "true";
        const observer = new MutationObserver(() => {
            const ports = computerWindow.querySelectorAll("button.slot-firewall");
            const backBtn = computerWindow.querySelector("button:has(img[src='icons/back.svg'])");
            if (ports.length > 0 && !backBtn && !ports[0].querySelector(".prettyPorts-trueHP")) {
                window.prettyPorts(computerWindow, info);
            } else if (backBtn) {
                observer.disconnect();
                window.prettyPorts(computerWindow, info);
                setTimeout(() => observer.observe(computerWindow, { childList: true, subtree: true }), 100);
            }
        });
        observer.observe(computerWindow, { childList: true, subtree: true });
        const checkWindowClosed = setInterval(() => {
            if (!document.contains(computerWindow)) {
                observer.disconnect();
                clearInterval(checkWindowClosed);
            }
        }, 500);
    }
}

// Backup original WebSocket send method; log settings
var originalSend = WebSocket.prototype.send;
var inboundLog = true;
var outboundLog = true;

// Helper function to traverse and modify an object
function traverse(obj, fn) {
    for (const key of Object.keys(obj)) {
        let part = obj[key];
        if (part && typeof part === "object") traverse(part, fn);
        fn(part);
    }
}

// Override WebSocket send method (errors ignored silently)
WebSocket.prototype.send = function (data) {
    try {
        let index = data.indexOf('[');
        let payload = JSON.parse(data.substring(index));
        if (!payload || typeof payload !== "object") throw "skip";
        traverse(payload, function (item) { if (item && item.username) item.username = item.username.split(' ')[0]; });
        data = data.substring(0, index) + JSON.stringify(payload);
    } catch (e) {}
    if (outboundLog) console.warn(data);
    return originalSend.call(this, data);
}

const playerData = []

// Listen for WebSocket messages
function listen(fn = console.log) {
    let property = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "data");
    const originalGet = property.get;
    property.get = function wrappedGetter() {
        if (!(this.currentTarget instanceof WebSocket)) return originalGet.call(this);
        let msg = originalGet.call(this);
        Object.defineProperty(this, "data", { value: msg, writable: true });
        fn({ data: msg, socket: this.currentTarget, event: this });
        return this.data;
    };
    Object.defineProperty(MessageEvent.prototype, "data", property);
}

listen(({ data, socket, event }) => {
    window.SOCK = socket;
    let index = data.indexOf('[');
    try {
        var payload = JSON.parse(data.substring(index));
    } catch (e) {
        return data;
    }
    if (typeof payload !== "object") return console.log(data);
    traverse(payload, function (item) { if (item && item.btc) playerData.push(item) });

    if (payload[1]?.event === "gotGlobalRoomLogs") {
        payload[1].arguments[0] = payload[1].arguments[0].map(log => {
            let logObject = JSON.parse(log);
            let sender = logObject.sender;
            if (sender.btc) sender.username += ` (₿${parseFloat(sender.btc).toFixed(2)})`;
            return JSON.stringify(logObject);
        });
    }

    data = data.substring(0, index) + JSON.stringify(payload);
    event.data = data;
    if (inboundLog) {
        item_info = payload[0]?.data || null
        if (item_info && item_info.hasOwnProperty('inventory')) {
            portInfo = item_info;
            window.updateNetworth(item_info);
            // Update the Computer window if it is already open
            const openComputerWindow = document.querySelector(".window-title > img[src='icons/computer.svg']")?.closest(".window");
            if (openComputerWindow) window.prettyPorts(openComputerWindow, item_info);
        }
    }
});